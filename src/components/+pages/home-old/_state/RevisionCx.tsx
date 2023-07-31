import { createContext, useContext, type ReactNode, useState } from "react";
import { useMutation } from "react-query";

import {
  UserEditableDataCx,
  type UserEditableDbData,
} from "./user-editable-data";
import { myDb } from "~/my-firebase/firestore";
import { generateUid } from "~/lib/external-packages-rename";
import { useDocRevisionData, useDocsRevisionData, useToast } from "~/hooks";

// TODO: seperate stores for each data type?

type ContextValue = {
  data: {
    isChange: boolean;
    undoKey: string;
  };
  actions: {
    save: () => void;
    undo: () => void;
  };
};

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  initDbData,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  initDbData: UserEditableDbData;
}) {
  const [currentDbData, setCurrentDbData] = useState(initDbData);
  const [undoKey, setUndoKey] = useState(generateUid());

  const userEditableData = UserEditableDataCx.useAllData();

  const pageRevisionData = useDocRevisionData({
    dbData: currentDbData.page,
    userEditedData: userEditableData.page,
  });
  const orgDetailsRevisionData = useDocRevisionData({
    dbData: currentDbData.orgDetails,
    userEditedData: userEditableData.orgDetails,
  });
  const linkLabelsRevisionData = useDocRevisionData({
    dbData: currentDbData.linkLabels,
    userEditedData: userEditableData.linkLabels,
  });
  const headerRevisionData = useDocRevisionData({
    dbData: currentDbData.header,
    userEditedData: userEditableData.header,
  });
  const footerRevisionData = useDocRevisionData({
    dbData: currentDbData.footer,
    userEditedData: userEditableData.footer,
  });
  const testimonialsRevisionData = useDocsRevisionData({
    initData: currentDbData.testimonials,
    updatedData: userEditableData.testimonials,
  });
  const programmesRevisionData = useDocsRevisionData({
    initData: currentDbData.programmes,
    updatedData: userEditableData.programmes,
  });
  const supportersRevisionData = useDocsRevisionData({
    initData: currentDbData.supporters,
    updatedData: userEditableData.supporters,
  });

  const isChange =
    pageRevisionData.isChange ||
    orgDetailsRevisionData.isChange ||
    testimonialsRevisionData.isChange ||
    programmesRevisionData.isChange ||
    linkLabelsRevisionData.isChange ||
    supportersRevisionData.isChange ||
    footerRevisionData.isChange ||
    headerRevisionData.isChange;

  const ifChange = (arg0: () => void) => {
    if (!isChange) {
      return;
    }
    arg0();
  };

  const landingSaveMutation = useMutation(myDb.transactions.pages.landing);

  const toast = useToast();

  const save = () =>
    ifChange(() =>
      toast.promise(
        () =>
          landingSaveMutation.mutateAsync(
            {
              page: pageRevisionData.saveData,
              orgDetails: orgDetailsRevisionData.saveData,
              testimonials: testimonialsRevisionData.saveData,
              programmes: programmesRevisionData.saveData,
              supporters: supportersRevisionData.saveData,
              linkLabels: linkLabelsRevisionData.saveData,
              header: headerRevisionData.saveData,
              footer: footerRevisionData.saveData,
            },
            {
              onSuccess() {
                setCurrentDbData(userEditableData);
              },
            },
          ),
        {
          pending: "saving",
          error: "save error",
          success: "saved",
        },
      ),
    );

  const userAction = UserEditableDataCx.useAction();

  const undo = () =>
    ifChange(() => {
      userAction.undo(currentDbData);

      setUndoKey(generateUid());

      toast.neutral("undone");
    });

  const value: ContextValue = {
    actions: { undo, save },
    data: {
      isChange,
      undoKey,
    },
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

// should use zod for instead of checkObjectHasField?
const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("RevisionContext.use must be used within its provider!");
  }

  return context;
};

function RevisionCx() {
  throw new Error(
    "RevisionContext exists for naming purposes only and should not be used as a component",
  );
}

export { RevisionCx };

RevisionCx.Provider = Provider;
RevisionCx.use = useThisContext;

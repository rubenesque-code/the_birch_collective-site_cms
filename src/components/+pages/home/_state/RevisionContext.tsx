import { createContext, useContext, type ReactNode, useState } from "react";
import { useDocSaveData, useToast } from "~/hooks";
// import { CurrentDbData } from "./CurrentDbData";
import {
  UserEditableDataCx,
  type UserEditableDbData,
} from "./user-editable-data";
import { useMutation } from "react-query";
import { myDb } from "~/my-firebase/firestore";
import { generateUid } from "~/lib/external-packages-rename";
import { useDocsSaveData } from "~/hooks/useDocsSaveData";

type ContextValue = {
  data: {
    isChange: boolean;
    isTestimonialsChange: boolean;
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

  const pageSave = useDocSaveData({
    dbData: currentDbData.page,
    userEditedData: userEditableData.page,
  });
  const testimonialsSave = useDocsSaveData({
    dbData: currentDbData.testimonials,
    userEditedData: userEditableData.testimonials,
  });

  const isChange = pageSave.isChange || testimonialsSave.isChange;

  const ifChange = (arg0: () => void) => {
    if (!isChange) {
      return;
    }
    arg0();
  };

  const toast = useToast();

  const landingSaveMutation = useMutation(
    (input: Parameters<(typeof myDb)["transactions"]["pages"]["landing"]>[0]) =>
      myDb.transactions.pages.landing(input),
  );

  const save = () =>
    ifChange(() =>
      toast.promise(
        () =>
          landingSaveMutation.mutateAsync(
            {
              page: pageSave.saveData,
              testimonials: testimonialsSave.saveData,
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
    });

  const value: ContextValue = {
    actions: { undo, save },
    data: {
      isChange,
      undoKey,
      isTestimonialsChange: testimonialsSave.isChange,
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

function RevisionContext() {
  throw new Error(
    "RevisionContext exists for naming purposes only and should not be used as a component",
  );
}

export { RevisionContext };

RevisionContext.Provider = Provider;
RevisionContext.use = useThisContext;

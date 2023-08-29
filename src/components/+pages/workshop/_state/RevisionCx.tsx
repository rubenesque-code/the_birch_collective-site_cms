import { createContext, useContext, type ReactNode } from "react";
import { useMutation } from "react-query";

import { UedCx } from "~/context/user-editable-data";
import { useLeavePageConfirm, useToast } from "~/hooks";
import { myDb } from "~/my-firebase/firestore";

type ContextValue = {
  data: {
    isChange: boolean;
  };
  actions: {
    save: () => void;
    undo: () => void;
  };
};

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
}) {
  const footer = UedCx.Footer.useRevision();
  const header = UedCx.Header.useRevision();
  const linkLabels = UedCx.LinkLabels.useRevision();
  const orgDetails = UedCx.OrgDetails.useRevision();

  const { revision: keywords } = UedCx.Keywords.use();

  const {
    store: {
      data: { id },
    },
    revision: workshop,
  } = UedCx.Pages.Workshop.use();

  const revisionDataArr = [footer, header, linkLabels, orgDetails, workshop];

  const isChange = Boolean(revisionDataArr.find((data) => data.isChange));

  useLeavePageConfirm({ runConfirmationOn: isChange });

  const ifChange = (arg0: () => void) => {
    if (!isChange) {
      return;
    }
    arg0();
  };

  const saveMutation = useMutation(myDb.transactions.pages.workshop);

  const toast = useToast();

  const save = () =>
    ifChange(() =>
      toast.promise(
        () =>
          saveMutation.mutateAsync(
            {
              orgDetails: orgDetails.saveData,
              linkLabels: linkLabels.saveData,
              header: header.saveData,
              footer: footer.saveData,

              keywords: keywords.saveData,

              workshop: { id, ...workshop.saveData },
            },
            {
              onSuccess() {
                revisionDataArr.forEach((data) => data.onSaveSuccess());
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

  const undo = () =>
    ifChange(() => {
      revisionDataArr.forEach((data) => data.handleUndo());

      toast.neutral("undone");
    });

  const value: ContextValue = {
    actions: { undo, save },
    data: {
      isChange,
    },
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("RevisionContext.use must be used within its provider!");
  }

  return context;
};

function RevisionCx() {
  throw new Error(
    "RevisionCx exists for naming purposes only and should not be used as a component",
  );
}

export { RevisionCx };

RevisionCx.Provider = Provider;
RevisionCx.use = useThisContext;

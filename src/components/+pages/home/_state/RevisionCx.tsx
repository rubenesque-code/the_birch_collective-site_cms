import { createContext, useContext, type ReactNode } from "react";
import { useMutation } from "react-query";

import { UedCx } from "~/context/user-editable-data";
import { useToast } from "~/hooks";
import { myDb } from "~/my-firebase/firestore";

// TODO: seperate stores for each data type?

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
  const page = UedCx.Pages.Landing.useRevision();
  const footer = UedCx.Footer.useRevision();
  const orgDetails = UedCx.OrgDetails.useRevision();
  const linkLabels = UedCx.LinkLabels.useRevision();
  const programmes = UedCx.Programmes.useRevision();
  const { revision: testimonials } = UedCx.Testimonials.use();
  const { revision: supporters } = UedCx.Supporters.use();

  const revisionDataArr = [
    page,
    footer,
    orgDetails,
    linkLabels,
    programmes,
    testimonials,
    supporters,
  ];

  const isChange = Boolean(revisionDataArr.find((data) => data.isChange));

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
              page: page.saveData,
              orgDetails: orgDetails.saveData,
              testimonials: testimonials.saveData,
              programmes: programmes.saveData,
              supporters: supporters.saveData,
              linkLabels: linkLabels.saveData,
              header: null,
              footer: footer.saveData,
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
    "RevisionCx exists for naming purposes only and should not be used as a component",
  );
}

export { RevisionCx };

RevisionCx.Provider = Provider;
RevisionCx.use = useThisContext;

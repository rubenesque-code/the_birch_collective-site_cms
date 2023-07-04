import { createContext, useContext, type ReactNode, useState } from "react";
import { useSaveData, useToast } from "~/hooks";
import { CurrentDbData } from "./CurrentDbData";
import { UserEditableData } from "./user-editable-data";
import { useMutation } from "react-query";
import { myDb } from "~/my-firebase/firestore";
import { generateUid } from "~/lib/external-packages-rename";

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
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
}) {
  const [undoKey, setUndoKey] = useState(generateUid());

  const currentDbData = CurrentDbData.use();
  const localData = UserEditableData.useAllData();

  const { saveData, isChange } = useSaveData({
    dbData: currentDbData.data,
    localData,
  });

  const ifChange = (arg0: () => void) => {
    if (!isChange) {
      return;
    }
    arg0();
  };

  const toast = useToast();

  const saveMutation = useMutation(
    (input: Parameters<typeof myDb.pages.landing.update>[0]) =>
      myDb.pages.landing.update(input),
  );

  const save = () =>
    ifChange(() =>
      toast.promise(
        () =>
          saveMutation.mutateAsync(saveData, {
            onSuccess() {
              currentDbData.overwrite(localData);
            },
          }),
        {
          pending: "saving",
          error: "save error",
          success: "saved",
        },
      ),
    );

  const userAction = UserEditableData.useAction();

  const undo = () =>
    ifChange(() => {
      userAction.undo(currentDbData.data);
      setUndoKey(generateUid());
    });

  const value: ContextValue = {
    actions: { undo, save },
    data: { isChange, undoKey },
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

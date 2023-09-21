import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useStore } from "zustand";

import { createStore, type Store } from "./store";

import { useDocRevisionData } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

type ContextValue = { store: Store } & {
  revision: {
    isChange: boolean;
    undoKey: string;
    saveData: Partial<MyDb["pages"]["donate-success"]>;
    handleUndo: () => void;
    onSaveSuccess: () => void;
  };
};

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  ...props
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  initData: MyDb["pages"]["donate-success"];
}) {
  const [initData, setInitData] = useState(props.initData);
  const [undoKey, setUndoKey] = useState(generateUid());

  const storeRef = useRef<ReturnType<typeof createStore>>();

  if (!storeRef.current) {
    storeRef.current = createStore({ initData: props.initData });
  }

  const store = useStore(storeRef.current, (store) => store);

  const { isChange, saveData } = useDocRevisionData({
    dbData: initData,
    userEditedData: store.data,
  });

  const handleUndo = () => {
    if (!isChange) {
      return;
    }

    store.actions.overWrite(initData);

    setUndoKey(generateUid());
  };

  const value: ContextValue = {
    store,
    revision: {
      isChange,
      undoKey,
      saveData: { id: "donate-success-page", ...saveData },
      handleUndo,
      onSaveSuccess: () => {
        setInitData(store.data);
      },
    },
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

function useThisContext() {
  const context = useContext(Context);
  if (!context)
    throw new Error("Missing DonatePageDataCx.Provider in the tree");

  return context;
}

function DonateSuccessPageDataCx() {
  throw new Error(
    "DonatePageDataCx exists for naming purposes only and should not be used as a component",
  );
}

export { DonateSuccessPageDataCx };

DonateSuccessPageDataCx.Provider = Provider;
DonateSuccessPageDataCx.use = useThisContext;

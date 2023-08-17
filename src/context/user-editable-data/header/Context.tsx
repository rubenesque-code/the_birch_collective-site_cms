import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useStore } from "zustand";

import { createStore } from "./createStore";
import type { Store } from "./types";

import { useDocRevisionData } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

type ContextValue = { store: ReturnType<typeof createStore> } & {
  revision: {
    isChange: boolean;
    undoKey: string;
    saveData: Partial<MyDb["singles"]["header"]> | null;
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
  initData: Store["data"];
}) {
  const [initData, setInitData] = useState(props.initData);
  const [undoKey, setUndoKey] = useState(generateUid());

  const storeRef = useRef<ContextValue["store"]>();

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
    store: storeRef.current,
    revision: {
      isChange,
      undoKey,
      saveData,
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

function useData() {
  const context = useContext(Context);
  if (!context) throw new Error("Missing HeaderDataCx.Provider in the tree");

  return useStore(context.store, (state) => state.data);
}

function useAction() {
  const context = useContext(Context);
  if (!context) throw new Error("Missing HeaderDataCx.Provider in the tree");

  return useStore(context.store, (state) => state.actions);
}

function useRevision() {
  const context = useContext(Context);
  if (!context) throw new Error("Missing HeaderDataCx.Provider in the tree");

  return context.revision;
}

function HeaderDataCx() {
  throw new Error(
    "HeaderDataCx exists for naming purposes only and should not be used as a component",
  );
}

export { HeaderDataCx };

HeaderDataCx.Provider = Provider;
HeaderDataCx.useData = useData;
HeaderDataCx.useAction = useAction;
HeaderDataCx.useRevision = useRevision;

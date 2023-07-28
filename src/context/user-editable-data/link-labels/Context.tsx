import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  useState,
} from "react";
import { useStore } from "zustand";

import type { Store } from "./types";
import type { MyDb } from "~/types/database";

import { createStore } from "./createStore";
import { generateUid } from "~/lib/external-packages-rename";
import { useDocRevisionData } from "~/hooks";

type ContextValue = { store: ReturnType<typeof createStore> } & {
  revision: {
    isChange: boolean;
    undoKey: string;
    saveData: Partial<MyDb["singles"]["linkLabels"]>;
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
  if (!context)
    throw new Error("Missing LinkLabelsDataCx.Provider in the tree");

  return useStore(context.store, (state) => state.data);
}

function useAction() {
  const context = useContext(Context);
  if (!context)
    throw new Error("Missing LinkLabelsDataCx.Provider in the tree");

  return useStore(context.store, (state) => state.actions);
}

function useRevision() {
  const context = useContext(Context);
  if (!context)
    throw new Error("Missing LinkLabelsDataCx.Provider in the tree");

  return context.revision;
}

function LinkLabelsDataCx() {
  throw new Error(
    "LinkLabelsDataCx exists for naming purposes only and should not be used as a component",
  );
}

export { LinkLabelsDataCx };

LinkLabelsDataCx.Provider = Provider;
LinkLabelsDataCx.useData = useData;
LinkLabelsDataCx.useAction = useAction;
LinkLabelsDataCx.useRevision = useRevision;

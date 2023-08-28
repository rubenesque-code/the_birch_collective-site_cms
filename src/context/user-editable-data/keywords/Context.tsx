import React from "react";
import * as z from "zustand";

import type { Store } from "./store";
import { createStore } from "./store/createStore";

import { useDocsRevisionData } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";

type ContextValue = { store: Store } & {
  revision: {
    isChange: boolean;
    undoKey: string;
    saveData: {
      created: MyDb["keyword"][];
      deleted: string[];
      updated: DocPartialWithId<MyDb["keyword"]>[];
    };
    handleUndo: () => void;
    onSaveSuccess: () => void;
  };
};

const Context = React.createContext<ContextValue | null>(null);

function Provider({
  children,
  ...props
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
  initData: MyDb["keyword"][];
}) {
  const [initData, setInitData] = React.useState(props.initData);
  const [undoKey, setUndoKey] = React.useState(generateUid());

  const storeRef = React.useRef<ReturnType<typeof createStore>>();

  if (!storeRef.current) {
    storeRef.current = createStore({ initData: props.initData });
  }

  const store = z.useStore(storeRef.current, (store) => store);

  const { isChange, saveData } = useDocsRevisionData({
    initData: initData,
    updatedData: store.data,
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

function useContext() {
  const context = React.useContext(Context);
  if (!context) throw new Error("Missing KeywordDataCx.Provider in the tree");

  return context;
}

function KeywordDataCx() {
  throw new Error(
    "KeywordDataCx exists for naming purposes only and should not be used as a component",
  );
}

export { KeywordDataCx };

KeywordDataCx.Provider = Provider;
KeywordDataCx.use = useContext;

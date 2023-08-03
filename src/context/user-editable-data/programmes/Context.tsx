import React from "react";
import * as z from "zustand";

import type { MyDb } from "~/types/database";
import type { Store } from "./types";

import { useDocsRevisionData } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";
import { createStore } from "./createStore";
import type { DocPartialWithId } from "~/types/database/_helpers";

type ContextValue = { store: Store } & {
  revision: {
    isChange: boolean;
    undoKey: string;
    saveData: {
      created: MyDb["programme"][];
      deleted: string[];
      updated: DocPartialWithId<MyDb["programme"]>[];
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
  initData: Store["data"];
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
  if (!context)
    throw new Error("Missing ProgrammesDataCx.Provider in the tree");

  return context;
}

function ProgrammesDataCx() {
  throw new Error(
    "ProgrammesDataCx exists for naming purposes only and should not be used as a component",
  );
}

export { ProgrammesDataCx };

ProgrammesDataCx.Provider = Provider;
ProgrammesDataCx.use = useContext;

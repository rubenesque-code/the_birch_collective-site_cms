import React from "react";
import * as z from "zustand";

import type { MyDb } from "~/types/database";
import type { Store } from "./store";

import { useDocsRevisionData } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";
import { createStore } from "./store/createStore";
import type { DocPartialWithId } from "~/types/database/_helpers";

type ContextValue = { store: Store } & {
  revision: {
    isChange: boolean;
    undoKey: string;
    saveData: {
      created: MyDb["workshop"][];
      deleted: string[];
      updated: DocPartialWithId<MyDb["workshop"]>[];
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
  initData: MyDb["workshop"][];
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
  if (!context) throw new Error("Missing WorkshopsDataCx.Provider in the tree");

  return context;
}

function WorkshopsDataCx() {
  throw new Error(
    "WorkshopsDataCx exists for naming purposes only and should not be used as a component",
  );
}

export { WorkshopsDataCx };

WorkshopsDataCx.Provider = Provider;
WorkshopsDataCx.use = useContext;

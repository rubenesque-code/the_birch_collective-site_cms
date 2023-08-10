import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

import { UedCx } from "~/context/user-editable-data";
import { createStore, type Store } from "./store";
import { createInitData } from "./_helpers";

type ContextValue = { store: Store } & {
  revision: {
    isUserEntry: boolean;
    areRequiredFields: boolean;
  };
};

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
}) {
  const {
    store: {
      data: { sections },
    },
  } = UedCx.Programme.use();

  const storeRef = useRef<ReturnType<typeof createStore>>();

  if (!storeRef.current) {
    storeRef.current = createStore({
      initData: createInitData({ index: sections.length }),
    });
  }

  const store = useStore(storeRef.current, (store) => store);

  const areRequiredFields = Boolean(store.data.title.length);

  const isUserEntry = Boolean(store.data.title || store.data.description);

  const value: ContextValue = {
    store,
    revision: {
      areRequiredFields,
      isUserEntry,
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
  if (!context) throw new Error("Missing NewSectionCx.Provider in the tree");

  return context;
}

function NewSectionCx() {
  throw new Error(
    "NewSectionCx exists for naming purposes only and should not be used as a component",
  );
}

export { NewSectionCx };

NewSectionCx.Provider = Provider;
NewSectionCx.use = useThisContext;

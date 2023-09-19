import { createContext, useContext, useRef, type ReactNode } from "react";
import { produce } from "immer";
import _ from "lodash";
import * as z from "zustand";

import type { MyDb } from "~/types/database";
import type {
  GenerateNonArrActions,
  GetObjValue,
  ObjFieldsToStr,
} from "~/types/helpers";
import type { MyPick } from "~/types/utilities";

type Keyword = MyDb["image"]["keywords"][number];

type Data = {
  file: File | null;
  dimensions: {
    naturalHeight: number | null;
    naturalWidth: number | null;
  };
  keywords: Keyword[];
};

type StandardActions = GenerateNonArrActions<Data>;

type Actions = {
  resetData: (input: Data) => void;

  keywords: {
    add: (arg0: Keyword) => void;
    remove: (arg0: { findBy: { id: string } }) => void;
  };

  file: (arg0: File) => void;
} & StandardActions;

interface Store {
  data: Data;

  actions: Actions;
}

export const initData: Store["data"] = {
  dimensions: {
    naturalHeight: null,
    naturalWidth: null,
  },
  file: null,
  keywords: [],
};

type NonArrActionFields = MyPick<Data, "dimensions" | "file">;

const createStore = () => {
  return z.createStore<Store>()((set) => {
    function nonArrAction<TKeyStr extends ObjFieldsToStr<NonArrActionFields>>(
      keys: TKeyStr,
    ) {
      return (newValue: GetObjValue<NonArrActionFields, TKeyStr>) =>
        set(
          produce((store: Store) => {
            _.set(store.data, keys, newValue);
          }),
        );
    }

    return {
      data: initData,

      actions: {
        resetData: (input) =>
          set(
            produce((state: Store) => {
              state.data = input;
            }),
          ),

        dimensions: {
          naturalHeight: nonArrAction("dimensions.naturalHeight"),
          naturalWidth: nonArrAction("dimensions.naturalWidth"),
        },

        file: (input) =>
          set(
            produce((store: Store) => {
              store.data.file = input;
            }),
          ),

        keywords: {
          add: (input) =>
            set(
              produce((store: Store) => {
                store.data.keywords.push(input);
              }),
            ),

          remove: (input) =>
            set(
              produce((store: Store) => {
                const index = store.data.keywords.findIndex(
                  (entry) => entry.id === input.findBy.id,
                );

                if (index === -1) {
                  return;
                }

                store.data.keywords.splice(index, 1);
              }),
            ),
        },
      },
    };
  });
};

type NewImageCx = ReturnType<typeof createStore>;
type ContextValue = Store;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
}) {
  const storeRef = useRef<NewImageCx>();

  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  const store = z.useStore(storeRef.current, (state) => state);

  const value: ContextValue = {
    ...store,
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

function useCx() {
  const store = useContext(Context);
  if (!store) throw new Error("Missing NewImageCx.Provider in the tree");

  return store;
}

function NewImageCx() {
  throw new Error(
    "NewImageCx exists for naming purposes only and should not be used as a component",
  );
}

export { NewImageCx };

NewImageCx.Provider = Provider;
NewImageCx.use = useCx;

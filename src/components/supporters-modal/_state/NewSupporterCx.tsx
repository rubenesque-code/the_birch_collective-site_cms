import { produce } from "immer";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { createStore, useStore } from "zustand";

import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

interface NewSupporterStore {
  data: MyDb["supporter"];
  actions: {
    resetData: (data: MyDb["supporter"]) => void;
    url: {
      update: (newVal: string) => void;
    };
    title: {
      update: (newVal: string) => void;
    };
    index: {
      update: (newVal: number) => void;
    };
    image: {
      dbConnect: {
        imageId: { update: (newVal: string) => void };
      };
    };
  };
}

export const createInitData = (input: { index: number }) => ({
  image: {
    dbConnections: {
      imageId: null,
    },
  },
  url: "",
  id: generateUid(),
  index: input.index,
  name: "",
});

const createNewSupporterStore = (input: { index: number }) => {
  return createStore<NewSupporterStore>()((set) => ({
    data: createInitData({ index: input.index }),
    actions: {
      resetData: (input) =>
        set(
          produce((state: NewSupporterStore) => {
            state.data = input;
          }),
          true,
        ),
      title: {
        update: (newVal) =>
          set(
            produce((state: NewSupporterStore) => {
              state.data.name = newVal;
            }),
          ),
      },
      index: {
        update: (newVal) =>
          set(
            produce((state: NewSupporterStore) => {
              state.data.index = newVal;
            }),
          ),
      },
      url: {
        update: (newVal) =>
          set(
            produce((state: NewSupporterStore) => {
              state.data.url = newVal;
            }),
          ),
      },
      image: {
        dbConnect: {
          imageId: {
            update: (newVal) =>
              set(
                produce((state: NewSupporterStore) => {
                  state.data.image.dbConnections.imageId = newVal;
                }),
              ),
          },
        },
      },
    },
  }));
};

type NewSupporterCx = ReturnType<typeof createNewSupporterStore>;
type ContextValue = NewSupporterStore & {
  isUserEntry: boolean;
};

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  newSupporter,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  newSupporter: {
    index: number;
  };
}) {
  const storeRef = useRef<NewSupporterCx>();

  if (!storeRef.current) {
    storeRef.current = createNewSupporterStore({
      index: newSupporter.index,
    });
  }

  const store = useStore(storeRef.current, (state) => state);

  const isUserEntry = Boolean(
    store.data.name.length ||
      store.data.image.dbConnections.imageId ||
      store.data.url.length,
  );

  const value: ContextValue = {
    ...store,
    isUserEntry,
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

function useCx() {
  const store = useContext(Context);
  if (!store) throw new Error("Missing NewTestimonialCx.Provider in the tree");

  return store;
}

function NewSupporterCx() {
  throw new Error(
    "UserEditableStore exists for naming purposes only and should not be used as a component",
  );
}

export { NewSupporterCx };

NewSupporterCx.Provider = Provider;
NewSupporterCx.use = useCx;

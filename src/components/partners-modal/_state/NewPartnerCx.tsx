import { produce } from "immer";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { createStore, useStore } from "zustand";

import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

interface NewPartnerStore {
  data: MyDb["partner"];
  actions: {
    resetData: (data: MyDb["partner"]) => void;
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

const createNewPartnerStore = (input: { index: number }) => {
  return createStore<NewPartnerStore>()((set) => ({
    data: createInitData({ index: input.index }),
    actions: {
      resetData: (input) =>
        set(
          produce((state: NewPartnerStore) => {
            state.data = input;
          }),
          true,
        ),
      title: {
        update: (newVal) =>
          set(
            produce((state: NewPartnerStore) => {
              state.data.name = newVal;
            }),
          ),
      },
      index: {
        update: (newVal) =>
          set(
            produce((state: NewPartnerStore) => {
              state.data.index = newVal;
            }),
          ),
      },
      url: {
        update: (newVal) =>
          set(
            produce((state: NewPartnerStore) => {
              state.data.url = newVal;
            }),
          ),
      },
      image: {
        dbConnect: {
          imageId: {
            update: (newVal) =>
              set(
                produce((state: NewPartnerStore) => {
                  state.data.image.dbConnections.imageId = newVal;
                }),
              ),
          },
        },
      },
    },
  }));
};

type NewPartnerCx = ReturnType<typeof createNewPartnerStore>;
type ContextValue = NewPartnerStore & {
  isUserEntry: boolean;
};

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  newPartner,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  newPartner: {
    index: number;
  };
}) {
  const storeRef = useRef<NewPartnerCx>();

  if (!storeRef.current) {
    storeRef.current = createNewPartnerStore({
      index: newPartner.index,
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

function NewPartnerCx() {
  throw new Error(
    "UserEditableStore exists for naming purposes only and should not be used as a component",
  );
}

export { NewPartnerCx };

NewPartnerCx.Provider = Provider;
NewPartnerCx.use = useCx;

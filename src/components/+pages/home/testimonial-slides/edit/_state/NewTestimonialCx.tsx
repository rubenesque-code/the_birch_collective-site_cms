import { produce } from "immer";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { createStore, useStore } from "zustand";

import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

interface NewTestimonialStore {
  data: MyDb["testimonial"];
  actions: {
    resetData: (data: MyDb["testimonial"]) => void;
    text: {
      update: (newVal: string) => void;
    };
    endorserName: {
      update: (newVal: string) => void;
    };
    index: {
      update: (newVal: number) => void;
    };
    image: {
      dbConnect: {
        imageId: { update: (newVal: string) => void };
      };
      position: {
        x: { update: (newVal: number) => void };
        y: { update: (newVal: number) => void };
      };
    };
  };
}

export const createInitData = (input: { index: number }) => ({
  image: {
    dbConnect: {
      imageId: null,
    },
    position: {
      x: 50,
      y: 50,
    },
  },
  endorserName: "",
  id: generateUid(),
  index: input.index,
  text: "",
});

const createNewTestimonialStore = (input: { index: number }) => {
  return createStore<NewTestimonialStore>()((set) => ({
    data: createInitData({ index: input.index }),
    actions: {
      resetData: (input) =>
        set(
          produce((state: NewTestimonialStore) => {
            state.data = input;
          }),
          true,
        ),
      endorserName: {
        update: (newVal) =>
          set(
            produce((state: NewTestimonialStore) => {
              state.data.endorserName = newVal;
            }),
          ),
      },
      index: {
        update: (newVal) =>
          set(
            produce((state: NewTestimonialStore) => {
              state.data.index = newVal;
            }),
          ),
      },
      text: {
        update: (newVal) =>
          set(
            produce((state: NewTestimonialStore) => {
              state.data.text = newVal;
            }),
          ),
      },
      image: {
        dbConnect: {
          imageId: {
            update: (newVal) =>
              set(
                produce((state: NewTestimonialStore) => {
                  state.data.image.dbConnect.imageId = newVal;
                }),
              ),
          },
        },
        position: {
          x: {
            update: (newVal) =>
              set(
                produce((state: NewTestimonialStore) => {
                  state.data.image.position.x = newVal;
                }),
              ),
          },
          y: {
            update: (newVal) =>
              set(
                produce((state: NewTestimonialStore) => {
                  state.data.image.position.y = newVal;
                }),
              ),
          },
        },
      },
    },
  }));
};

type NewTestimonialCx = ReturnType<typeof createNewTestimonialStore>;
type ContextValue = NewTestimonialStore & {
  isUserEntry: boolean;
};

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  newTestimonial,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  newTestimonial: {
    index: number;
  };
}) {
  const storeRef = useRef<NewTestimonialCx>();

  if (!storeRef.current) {
    storeRef.current = createNewTestimonialStore({
      index: newTestimonial.index,
    });
  }

  const store = useStore(storeRef.current, (state) => state);
  console.log("store:", store.data);

  const isUserEntry = Boolean(
    store.data.endorserName.length ||
      store.data.image.dbConnect.imageId ||
      store.data.text.length,
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

function NewTestimonialCx() {
  throw new Error(
    "UserEditableStore exists for naming purposes only and should not be used as a component",
  );
}

export { NewTestimonialCx };

NewTestimonialCx.Provider = Provider;
NewTestimonialCx.use = useCx;

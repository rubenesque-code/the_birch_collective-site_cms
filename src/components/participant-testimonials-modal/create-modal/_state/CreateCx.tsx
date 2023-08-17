import { createContext, useContext, useRef, type ReactNode } from "react";
import { produce } from "immer";
import _ from "lodash";
import * as z from "zustand";

import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";
import type {
  GenerateNonArrActions,
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "~/types/helpers";
import type { MyPick } from "~/types/utilities";

type Testimonial = MyDb["participant-testimonial"];

type ActionFields = MyPick<Testimonial, "endorserName" | "image" | "text">;

type Actions = GenerateNonArrActions<ActionFields>;

interface Store {
  data: Testimonial;
  actions: {
    resetData: (data: Testimonial) => void;
  } & Actions;
}

export const createInitData = (input: { index: number }): Testimonial => ({
  id: generateUid(),
  index: input.index,
  endorserName: "",
  image: {
    dbConnect: {
      imageId: null,
    },
    position: {
      x: 50,
      y: 50,
    },
  },
  text: "",
});

const createStore = (input: { index: number }) => {
  return z.createStore<Store>()((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<OmitObjArrProps<ActionFields>>,
    >(keys: TKeyStr) {
      return (newValue: GetObjValue<ActionFields, TKeyStr>) =>
        set(
          produce((store: Store) => {
            _.set(store.data, keys, newValue);
          }),
        );
    }

    return {
      data: createInitData({ index: input.index }),
      actions: {
        resetData: (input) =>
          set(
            produce((state: Store) => {
              state.data = input;
            }),
          ),

        endorserName: nonArrAction("endorserName"),

        image: {
          dbConnect: {
            imageId: nonArrAction("image.dbConnect.imageId"),
          },
          position: {
            x: nonArrAction("image.position.x"),
            y: nonArrAction("image.position.y"),
          },
        },

        text: nonArrAction("text"),
      },
    };
  });
};

type CreateCx = ReturnType<typeof createStore>;
type ContextValue = Store & {
  revision: {
    isUserEntry: boolean;
    areRequiredFields: boolean;
  };
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
  const storeRef = useRef<CreateCx>();

  if (!storeRef.current) {
    storeRef.current = createStore({
      index: newTestimonial.index,
    });
  }

  const store = z.useStore(storeRef.current, (state) => state);

  const isUserEntry = Boolean(
    store.data.endorserName.length ||
      store.data.image.dbConnect.imageId ||
      store.data.text.length,
  );

  const areRequiredFields = Boolean(
    store.data.endorserName.length && store.data.text.length,
  );

  const value: ContextValue = {
    ...store,

    revision: {
      isUserEntry,
      areRequiredFields,
    },
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

function useCx() {
  const store = useContext(Context);
  if (!store) throw new Error("Missing CreateCx.Provider in the tree");

  return store;
}

function CreateCx() {
  throw new Error(
    "CreateCx exists for naming purposes only and should not be used as a component",
  );
}

export { CreateCx };

CreateCx.Provider = Provider;
CreateCx.use = useCx;

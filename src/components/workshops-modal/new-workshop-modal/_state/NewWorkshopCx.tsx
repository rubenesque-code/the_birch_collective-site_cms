import { produce } from "immer";
import { createContext, useContext, useRef, type ReactNode } from "react";
import * as z from "zustand";
import _ from "lodash";

import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";
import type {
  GenerateNonArrActions,
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "~/types/helpers";
import type { MyOmit, MyPick } from "~/types/utilities";

type Workshop = MyDb["workshop"];

type ActionFields = MyPick<Workshop, "subtitle" | "summary" | "title">;

type Actions = GenerateNonArrActions<ActionFields>;

interface Store {
  data: Workshop;
  actions: {
    resetData: (data: Workshop) => void;
  } & Actions;
}

export const createInitData = (input: { index: number }): Workshop => ({
  id: generateUid(),
  index: input.index,
  bannerImage: {
    dbConnections: {
      imageId: null,
    },
    position: { x: 50, y: 50 },
    use: false,
  },
  info: [],
  mainText: "",
  photoAlbum: { entries: [], heading: "" },
  sections: [],
  signUpLink: {
    heading: "",
    link: "",
    text: "",
  },
  subtitle: "",
  summary: {
    image: {
      dbConnections: {
        imageId: null,
      },
      position: {
        x: 50,
        y: 50,
      },
    },
    mainText: "",
  },
  title: "",
});

const createStore = (input: { index: number }) => {
  return z.createStore<Store>()((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<
        OmitObjArrProps<MyOmit<Store["data"], "id" | "index">>
      >,
    >(keys: TKeyStr) {
      return (
        newValue: GetObjValue<MyOmit<Store["data"], "id" | "index">, TKeyStr>,
      ) =>
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
        subtitle: nonArrAction("subtitle"),
        summary: {
          image: {
            dbConnections: {
              imageId: nonArrAction("summary.image.dbConnections.imageId"),
            },
            position: {
              x: nonArrAction("summary.image.position.x"),
              y: nonArrAction("summary.image.position.y"),
            },
          },
          bullets: {},
          mainText: nonArrAction("summary.mainText"),
        },
        title: nonArrAction("title"),
      },
    };
  });
};

type NewWorkshopCx = ReturnType<typeof createStore>;
type ContextValue = Store & {
  revision: {
    isUserEntry: boolean;
    areRequiredFields: boolean;
  };
};

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  newWorkshop,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  newWorkshop: {
    index: number;
  };
}) {
  const storeRef = useRef<NewWorkshopCx>();

  if (!storeRef.current) {
    storeRef.current = createStore({
      index: newWorkshop.index,
    });
  }

  const store = z.useStore(storeRef.current, (state) => state);

  const isUserEntry = Boolean(
    store.data.subtitle ||
      store.data.summary.image.dbConnections.imageId ||
      store.data.summary.mainText ||
      store.data.title,
  );

  const areRequiredFields = Boolean(
    store.data.title &&
      store.data.summary.image.dbConnections.imageId &&
      store.data.summary.mainText,
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
  if (!store) throw new Error("Missing NewWorkshopCx.Provider in the tree");

  return store;
}

function NewWorkshopCx() {
  throw new Error(
    "NewWorkshopCx exists for naming purposes only and should not be used as a component",
  );
}

export { NewWorkshopCx };

NewWorkshopCx.Provider = Provider;
NewWorkshopCx.use = useCx;

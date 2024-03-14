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
import type { MyOmit, MyPick } from "~/types/utilities";

type Programme = MyDb["programme"];

type Actions = GenerateNonArrActions<
  MyPick<Programme, "subtitle" | "summary" | "title">
>;

interface Store {
  data: Programme;
  actions: {
    resetData: (data: Programme) => void;
  } & Actions;
}

export const createInitData = (input: { index: number }): Programme => ({
  id: generateUid(),
  index: input.index,
  bannerImage: {
    dbConnections: {
      imageId: null,
    },
    position: { x: 50, y: 50 },
  },
  info: [],
  mainText: "",
  posters: [],
  sections: [],
  subtitle: "",
  summary: {
    bullets: [],
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
  photoAlbum: {
    entries: [],
    heading: "",
    use: true,
  },
  signUp: {
    buttonText: "",
    heading: "",
    text: "",
    notifyEmails: [],
    downloadLink: null,
    type: "online-form",
  },
  usePosters: true,
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

type NewProgrammeCx = ReturnType<typeof createStore>;
type ContextValue = Store & {
  isUserEntry: boolean;
};

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  newProgramme,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  newProgramme: {
    index: number;
  };
}) {
  const storeRef = useRef<NewProgrammeCx>();

  if (!storeRef.current) {
    storeRef.current = createStore({
      index: newProgramme.index,
    });
  }

  const store = z.useStore(storeRef.current, (state) => state);

  const isUserEntry = Boolean(
    store.data.subtitle ||
      store.data.summary.image.dbConnections.imageId ||
      store.data.summary.mainText ||
      store.data.title,
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
  if (!store) throw new Error("Missing NewProgrammeCx.Provider in the tree");

  return store;
}

function NewProgrammeCx() {
  throw new Error(
    "NewProgrammeCx exists for naming purposes only and should not be used as a component",
  );
}

export { NewProgrammeCx };

NewProgrammeCx.Provider = Provider;
NewProgrammeCx.use = useCx;

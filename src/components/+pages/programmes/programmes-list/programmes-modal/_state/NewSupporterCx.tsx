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
import type { MyOmit } from "~/types/utilities";

type TeamMember = MyDb["pages"]["aboutUs"]["theTeam"]["members"][number];

type Actions = GenerateNonArrActions<MyOmit<TeamMember, "id">>;

interface Store {
  data: TeamMember;
  actions: {
    resetData: (data: TeamMember) => void;
  } & Actions;
}

export const createInitData = (input: { index: number }): TeamMember => ({
  id: generateUid(),
  index: input.index,
  name: "",
  role: "",
  bio: "",
  image: {
    dbConnections: {
      imageId: null,
    },
    position: {
      x: 50,
      y: 50,
    },
  },
});

const createStore = (input: { index: number }) => {
  return z.createStore<Store>()((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<OmitObjArrProps<Store["data"]>>,
    >(keys: TKeyStr) {
      return (newValue: GetObjValue<Store["data"], TKeyStr>) =>
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
        bio: nonArrAction("bio"),
        image: {
          dbConnections: {
            imageId: nonArrAction("image.dbConnections.imageId"),
          },
          position: {
            x: nonArrAction("image.position.x"),
            y: nonArrAction("image.position.y"),
          },
        },
        index: nonArrAction("index"),
        name: nonArrAction("name"),
        role: nonArrAction("role"),
      },
    };
  });
};

type NewMemberCx = ReturnType<typeof createStore>;
type ContextValue = Store & {
  isUserEntry: boolean;
};

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  newMember,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  newMember: {
    index: number;
  };
}) {
  const storeRef = useRef<NewMemberCx>();

  if (!storeRef.current) {
    storeRef.current = createStore({
      index: newMember.index,
    });
  }

  const store = z.useStore(storeRef.current, (state) => state);

  const isUserEntry = Boolean(
    store.data.name.length ||
      store.data.image.dbConnections.imageId ||
      store.data.bio.length ||
      store.data.role.length,
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
  if (!store) throw new Error("Missing NewMemberCx.Provider in the tree");

  return store;
}

function NewMemberCx() {
  throw new Error(
    "NewMemberCx exists for naming purposes only and should not be used as a component",
  );
}

export { NewMemberCx };

NewMemberCx.Provider = Provider;
NewMemberCx.use = useCx;

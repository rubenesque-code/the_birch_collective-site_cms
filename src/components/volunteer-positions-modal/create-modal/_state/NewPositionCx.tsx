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

type VolunteerPosition = MyDb["volunteer-position"];

type Actions = GenerateNonArrActions<MyOmit<VolunteerPosition, "id">>;

interface Store {
  data: VolunteerPosition;
  actions: {
    resetData: (data: VolunteerPosition) => void;
  } & Actions;
}

export const createInitData = (): VolunteerPosition => ({
  id: generateUid(),
  name: "",
  text: "",
});

const createStore = () => {
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
      data: createInitData(),

      actions: {
        resetData: (input) =>
          set(
            produce((state: Store) => {
              state.data = input;
            }),
          ),

        name: nonArrAction("name"),

        text: nonArrAction("text"),
      },
    };
  });
};

type NewPositionCx = ReturnType<typeof createStore>;
type ContextValue = Store & {
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
  const storeRef = useRef<NewPositionCx>();

  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  const store = z.useStore(storeRef.current, (state) => state);

  const isUserEntry = Boolean(store.data.name.length || store.data.text.length);

  const areRequiredFields = Boolean(
    store.data.name.length || store.data.text.length,
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
  if (!store) throw new Error("Missing NewPositionCx.Provider in the tree");

  return store;
}

function NewPositionCx() {
  throw new Error(
    "NewPositionCx exists for naming purposes only and should not be used as a component",
  );
}

export { NewPositionCx };

NewPositionCx.Provider = Provider;
NewPositionCx.use = useCx;

import { produce } from "immer";
import _ from "lodash";
import { createContext, useContext, useRef, type ReactNode } from "react";
import * as z from "zustand";
import { UedCx } from "~/context/user-editable-data";

import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";
import type {
  GenerateNonArrActions,
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "~/types/helpers";
import type { MyPick } from "~/types/utilities";

type Career = MyDb["career"];

type ActionFields = MyPick<Career, "closingDate" | "description" | "title">;

type Actions = GenerateNonArrActions<ActionFields>;

interface Store {
  data: Career;
  actions: {
    resetData: (data: Career) => void;
  } & Actions;
}

export const createInitData = (input: { index: number }): Career => ({
  id: generateUid(),
  closingDate: "",
  description: "",
  docLinkButtons: [],
  docLinksText: "",
  index: input.index,
  title: "",
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
      data: createInitData(input),

      actions: {
        resetData: (input) =>
          set(
            produce((state: Store) => {
              state.data = input;
            }),
          ),

        closingDate: nonArrAction("closingDate"),

        description: nonArrAction("description"),

        title: nonArrAction("title"),
      },
    };
  });
};

type NewCareerCx = ReturnType<typeof createStore>;
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
  const storeRef = useRef<NewCareerCx>();

  const {
    store: { data: careers },
  } = UedCx.Careers.use();

  if (!storeRef.current) {
    storeRef.current = createStore({ index: careers.length });
  }

  const store = z.useStore(storeRef.current, (state) => state);

  const isUserEntry = Boolean(
    store.data.closingDate.length ||
      store.data.description.length ||
      store.data.title.length,
  );

  const areRequiredFields = Boolean(
    store.data.description.length && store.data.title.length,
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
  if (!store) throw new Error("Missing NewCareerCx.Provider in the tree");

  return store;
}

function NewCareerCx() {
  throw new Error(
    "NewCareerCx exists for naming purposes only and should not be used as a component",
  );
}

export { NewCareerCx };

NewCareerCx.Provider = Provider;
NewCareerCx.use = useCx;

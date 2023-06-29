import { createStore, useStore } from "zustand";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { type MyDb } from "~/types/database";
import { produce } from "immer";

// □ Create type for action. {[dataName]: {[mutationType]: () => ...}}
// □ Sure it's okay to create multiple hooks returning different instances of useStore?
// □ what is equalityFn for?

type DbData = MyDb["pages"]["landing"];
type Actions = {
  orgName: { update: (newValue: string) => void };
};
type UserEditableDataState = { data: DbData; actions: Actions };

const createUserEditableDataStore = (input: { dbData: DbData }) => {
  return createStore<UserEditableDataState>()((set) => ({
    data: input.dbData,
    actions: {
      orgName: {
        update(newValue) {
          return set(
            produce((state: UserEditableDataState) => {
              state.data.orgNameAndByline.name = newValue;
            }),
          );
        },
      },
    },
  }));
};

type UserEditableDataStore = ReturnType<typeof createUserEditableDataStore>;
type ContextValue = UserEditableDataStore & { initDbData: DbData };

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  dbData: initDbData,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  dbData: DbData;
}) {
  const storeRef = useRef<UserEditableDataStore>();

  if (!storeRef.current) {
    storeRef.current = createUserEditableDataStore({ dbData: initDbData });
  }

  const value: ContextValue = { ...storeRef.current, initDbData: initDbData };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

function useData<TDataKey extends keyof UserEditableDataState["data"]>(
  key: TDataKey,
  // equalityFn?: (left: T, right: T) => boolean,
): UserEditableDataState["data"][TDataKey] {
  const store = useContext(Context);
  if (!store)
    throw new Error("Missing UserEditableDataStore.Provider in the tree");

  return useStore(store, (state) => state.data[key]);
  // return useStore(store, selector, equalityFn);
}

function useAllData() {
  const store = useContext(Context);
  if (!store)
    throw new Error("Missing UserEditableDataStore.Provider in the tree");

  return useStore(store, (state) => state.data);
}

function useAction<
  TDataName extends keyof UserEditableDataState["actions"],
  TMutationType extends "update",
>(
  dataName: TDataName,
  mutationType: TMutationType,
): UserEditableDataState["actions"][TDataName][TMutationType] {
  const store = useContext(Context);
  if (!store)
    throw new Error("Missing UserEditableDataStore.Provider in the tree");
  return useStore(store, (state) => state.actions[dataName][mutationType]);
}

function useInitDbData() {
  const store = useContext(Context);
  if (!store)
    throw new Error("Missing UserEditableDataStore.Provider in the tree");
  return store.initDbData;
}

function UserEditableDataStore() {
  throw new Error(
    "UserEditableStore exists for naming purposes only and should not be used as a component",
  );
}

export { UserEditableDataStore };

UserEditableDataStore.Provider = Provider;
UserEditableDataStore.useData = useData;
UserEditableDataStore.useAllData = useAllData;
UserEditableDataStore.useAction = useAction;
UserEditableDataStore.useInitDbData = useInitDbData;

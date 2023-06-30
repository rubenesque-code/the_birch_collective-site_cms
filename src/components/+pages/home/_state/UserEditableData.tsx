import { createStore, useStore } from "zustand";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { type MyDb } from "~/types/database";
import { produce } from "immer";

// □ Create type for action. {[dataName]: {[mutationType]: () => ...}}
// □ Sure it's okay to create multiple hooks returning different instances of useStore?
// □ what is equalityFn for?

type DbData = MyDb["pages"]["landing"];

// □ will probably need to update the below since update isn't the only type of mutation

type GenerateLandingDbActions<TData extends DbData> = {
  [k in keyof TData]: TData[k] extends Record<string, unknown>
    ? {
        [k2 in keyof TData[k]]: TData[k][k2] extends Record<string, unknown>
          ? {
              [k3 in keyof TData[k][k2]]: TData[k][k2][k3] extends Record<
                string,
                unknown
              >
                ? never
                : (updatedVal: NonNullable<TData[k][k2][k3]>) => void;
            }
          : (updatedVal: NonNullable<TData[k][k2]>) => void;
      }
    : (updatedVal: TData[k]) => void;
};

type DbActions = GenerateLandingDbActions<DbData>;

type Actions = {
  allData: { overwrite: (updatedData: DbData) => void };
} & DbActions;
type UserEditableDataState = { data: DbData; actions: Actions };

const createUserEditableDataStore = (input: { dbData: DbData }) => {
  return createStore<UserEditableDataState>()((set) => ({
    data: input.dbData,
    actions: {
      allData: {
        overwrite: (updatedData) =>
          set(
            produce((state: UserEditableDataState) => {
              state.data = updatedData;
            }),
          ),
      },
      bannerImage: {
        firestoreImageId: (newValue) =>
          set(
            produce((state: UserEditableDataState) => {
              state.data.bannerImage.firestoreImageId = newValue;
            }),
          ),
      },
      orgNameAndByline: {
        name: (updatedValue) =>
          set(
            produce((state: UserEditableDataState) => {
              state.data.orgNameAndByline.name = updatedValue;
            }),
          ),
        byline: (updatedValue) =>
          set(
            produce((state: UserEditableDataState) => {
              state.data.orgNameAndByline.byline = updatedValue;
            }),
          ),
      },
    },
  }));
};

type UserEditableData = ReturnType<typeof createUserEditableDataStore>;
type ContextValue = UserEditableData;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  initDbData,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  initDbData: DbData;
}) {
  const storeRef = useRef<UserEditableData>();

  if (!storeRef.current) {
    storeRef.current = createUserEditableDataStore({ dbData: initDbData });
  }

  const value: ContextValue = {
    ...storeRef.current,
  };

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

function useAction() {
  const store = useContext(Context);
  if (!store)
    throw new Error("Missing UserEditableDataStore.Provider in the tree");
  return useStore(store, (state) => state.actions);
}
/* function useAction<
  TDataName extends keyof UserEditableDataState["actions"],
  TMutationType extends keyof UserEditableDataState["actions"][TDataName],
>(
  dataName: TDataName,
  mutationType: TMutationType,
): UserEditableDataState["actions"][TDataName][TMutationType] {
  const store = useContext(Context);
  if (!store)
    throw new Error("Missing UserEditableDataStore.Provider in the tree");
  return useStore(store, (state) => state.actions[dataName][mutationType]);
}

function UserEditableData() {
  throw new Error(
    "UserEditableStore exists for naming purposes only and should not be used as a component",
  );
 */

function UserEditableData() {
  throw new Error(
    "UserEditableStore exists for naming purposes only and should not be used as a component",
  );
}

export { UserEditableData };

UserEditableData.Provider = Provider;
UserEditableData.useData = useData;
UserEditableData.useAllData = useAllData;
UserEditableData.useAction = useAction;

/* type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type A = { a: { a: string }; b: { b: string; c: string } };

type First = keyof A;
type FE = Expand<First>;

// type Second = keyof First
type Second<TFirst extends keyof A> = keyof A[TFirst];
type SE = Expand<Second<"b">>;

function Test<TFirstLevelProp extends keyof A>(
  firstLevelProp: TFirstLevelProp,
  secondLevelProp: keyof A[TFirstLevelProp],
) {
  console.log("hello");
}
 */

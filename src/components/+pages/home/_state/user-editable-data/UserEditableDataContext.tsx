import { produce } from "immer";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { createStore, useStore } from "zustand";
import type { UserEditableDbData, UserEditableDataStore } from "./store-types";

// □ Create type for action. {[dataName]: {[mutationType]: () => ...}}
// □ Sure it's okay to create multiple hooks returning different instances of useStore?
// □ what is equalityFn for?

const createUserEditableDataStore = (input: { dbData: UserEditableDbData }) => {
  return createStore<UserEditableDataStore>()((set) => ({
    data: input.dbData,
    actions: {
      undo: (updatedData) =>
        set(
          produce((state: UserEditableDataStore) => {
            state.data = updatedData;
          }),
        ),
      page: {
        bannerImage: {
          dbConnections: {
            imageId: {
              update: (newValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.bannerImage.dbConnections.imageId =
                      newValue;
                  }),
                ),
            },
          },
          position: {
            x: {
              update: (newValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.bannerImage.position.x = newValue;
                  }),
                ),
            },
            y: {
              update: (newValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.bannerImage.position.y = newValue;
                  }),
                ),
            },
          },
        },
        orgHeadings: {
          name: {
            update: (updatedValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.orgHeadings.name = updatedValue;
                }),
              ),
          },
          byline: {
            update: (updatedValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.orgHeadings.byline = updatedValue;
                }),
              ),
          },
        },
        testimonials: {
          order: { update: () => null },
        },
      },
    },
  }));
};

type UserEditableDataCx = ReturnType<typeof createUserEditableDataStore>;
type ContextValue = UserEditableDataCx;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  initDbData,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  initDbData: UserEditableDbData;
}) {
  const storeRef = useRef<UserEditableDataCx>();

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

function useData<TDataKey extends keyof UserEditableDataStore["data"]>(
  key: TDataKey,
  // equalityFn?: (left: T, right: T) => boolean,
): UserEditableDataStore["data"][TDataKey] {
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

function UserEditableDataCx() {
  throw new Error(
    "UserEditableStore exists for naming purposes only and should not be used as a component",
  );
}

export { UserEditableDataCx };

UserEditableDataCx.Provider = Provider;
UserEditableDataCx.useData = useData;
UserEditableDataCx.useAllData = useAllData;
UserEditableDataCx.useAction = useAction;

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

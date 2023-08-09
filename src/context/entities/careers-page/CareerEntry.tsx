import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type Entry = MyDb["pages"]["careers"]["careers"]["entries"][number];

type ContextValue = Entry;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  entry,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  entry: Entry;
}) {
  const value: ContextValue = entry;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("CareerEntryCx.use must be used within its provider!");
  }

  return context;
};

function CareerEntryCx() {
  throw new Error(
    "CareerEntryCx exists for naming purposes only and should not be used as a component",
  );
}

export { CareerEntryCx };

CareerEntryCx.Provider = Provider;
CareerEntryCx.use = useThisContext;

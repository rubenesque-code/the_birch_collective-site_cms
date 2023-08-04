import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type InfoEntry = MyDb["programme"]["info"][number];

type ContextValue = InfoEntry;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  infoEntry,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  infoEntry: InfoEntry;
}) {
  const value: ContextValue = infoEntry;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("InfoEntryCx.use must be used within its provider!");
  }

  return context;
};

function InfoEntryCx() {
  throw new Error(
    "InfoEntryCx exists for naming purposes only and should not be used as a component",
  );
}

export { InfoEntryCx };

InfoEntryCx.Provider = Provider;
InfoEntryCx.use = useThisContext;

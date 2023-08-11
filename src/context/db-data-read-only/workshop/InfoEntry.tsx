import React from "react";
import type { MyDb } from "~/types/database";

type Entity = MyDb["workshop"]["info"][number];

type ContextValue = Entity;

const Context = React.createContext<ContextValue | null>(null);

function Provider({
  children,
  infoEntry,
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
  infoEntry: Entity;
}) {
  const value: ContextValue = infoEntry;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("InfoEntryCX.use must be used within its provider!");
  }

  return context;
};

function InfoEntry() {
  throw new Error(
    "InfoEntryCx exists for naming purposes only and should not be used as a component",
  );
}

export { InfoEntry };

InfoEntry.Provider = Provider;
InfoEntry.use = useContext;

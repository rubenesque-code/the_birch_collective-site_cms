import React from "react";
import type { MyDb } from "~/types/database";

type Entity = MyDb["workshop"]["sections"][number];

type ContextValue = Entity;

const Context = React.createContext<ContextValue | null>(null);

function Provider({
  children,
  section,
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
  section: Entity;
}) {
  const value: ContextValue = section;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("Section.use must be used within its provider!");
  }

  return context;
};

function Section() {
  throw new Error(
    "Section exists for naming purposes only and should not be used as a component",
  );
}

export { Section };

Section.Provider = Provider;
Section.use = useContext;

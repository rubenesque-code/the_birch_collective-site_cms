import React from "react";
import type { MyDb } from "~/types/database";

type Entity =
  MyDb["workshop"]["sections"][number]["bullets"]["entries"][number];

type ContextValue = Entity;

const Context = React.createContext<ContextValue | null>(null);

function Provider({
  children,
  bullet,
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
  bullet: Entity;
}) {
  const value: ContextValue = bullet;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("SectionBullet.use must be used within its provider!");
  }

  return context;
};

function SectionBullet() {
  throw new Error(
    "SectionBullet exists for naming purposes only and should not be used as a component",
  );
}

export { SectionBullet };

SectionBullet.Provider = Provider;
SectionBullet.use = useContext;

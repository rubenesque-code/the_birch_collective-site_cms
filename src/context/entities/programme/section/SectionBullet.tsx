import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type Bullet =
  MyDb["programme"]["sections"][number]["bullets"]["entries"][number];

type ContextValue = Bullet;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  bullet,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  bullet: Bullet;
}) {
  const value: ContextValue = bullet;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("SectionBulletCx.use must be used within its provider!");
  }

  return context;
};

function SectionBulletCx() {
  throw new Error(
    "SectionBulletCx exists for naming purposes only and should not be used as a component",
  );
}

export { SectionBulletCx };

SectionBulletCx.Provider = Provider;
SectionBulletCx.use = useThisContext;

import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type InfoEntry = MyDb["programme"]["posters"][number];

type ContextValue = InfoEntry;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  poster,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  poster: InfoEntry;
}) {
  const value: ContextValue = poster;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("PosterCx.use must be used within its provider!");
  }

  return context;
};

function PosterCx() {
  throw new Error(
    "PosterCx exists for naming purposes only and should not be used as a component",
  );
}

export { PosterCx };

PosterCx.Provider = Provider;
PosterCx.use = useThisContext;

import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type ContextValue = MyDb["career"];

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  career,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  career: MyDb["career"];
}) {
  const value: ContextValue = career;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("CareerCx.use must be used within its provider!");
  }

  return context;
};

function CareerCx() {
  throw new Error(
    "CareerCx exists for naming purposes only and should not be used as a component",
  );
}

export { CareerCx };

CareerCx.Provider = Provider;
CareerCx.use = useThisContext;

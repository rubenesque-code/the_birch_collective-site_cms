import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type Supporter = MyDb["supporter"];

type ContextValue = Supporter;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  supporter,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  supporter: Supporter;
}) {
  const value: ContextValue = supporter;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("SupporterCx.use must be used within its provider!");
  }

  return context;
};

function SupporterCx() {
  throw new Error(
    "SupporterCx exists for naming purposes only and should not be used as a component",
  );
}

export { SupporterCx };

SupporterCx.Provider = Provider;
SupporterCx.use = useThisContext;

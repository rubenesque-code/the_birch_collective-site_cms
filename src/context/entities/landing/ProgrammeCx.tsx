import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type Programme = MyDb["pages"]["landing"]["programmes"]["entries"][number];

type ContextValue = Programme;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  programme,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  programme: Programme;
}) {
  const value: ContextValue = programme;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("ProgrammeCx.use must be used within its provider!");
  }

  return context;
};

function ProgrammeCx() {
  throw new Error(
    "ProgrammeCx exists for naming purposes only and should not be used as a component",
  );
}

export { ProgrammeCx };

ProgrammeCx.Provider = Provider;
ProgrammeCx.use = useThisContext;

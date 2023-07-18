import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type ContextValue = MyDb["pages"]["landing"]["aboutUs"]["entries"][number];

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  aboutUsEntry,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  aboutUsEntry: MyDb["pages"]["landing"]["aboutUs"]["entries"][number];
}) {
  const value: ContextValue = aboutUsEntry;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("RevisionContext.use must be used within its provider!");
  }

  return context;
};

function AboutUsEntryCx() {
  throw new Error(
    "AboutUsEntryCx exists for naming purposes only and should not be used as a component",
  );
}

export { AboutUsEntryCx };

AboutUsEntryCx.Provider = Provider;
AboutUsEntryCx.use = useThisContext;

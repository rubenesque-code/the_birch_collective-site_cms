import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type ContextValue = MyDb["career"]["docLinkButtons"][number];

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  docLinkButton,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  docLinkButton: MyDb["career"]["docLinkButtons"][number];
}) {
  const value: ContextValue = docLinkButton;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("DocLinkButtonCx.use must be used within its provider!");
  }

  return context;
};

function DocLinkButtonCx() {
  throw new Error(
    "DocLinkButtonCx exists for naming purposes only and should not be used as a component",
  );
}

export { DocLinkButtonCx };

DocLinkButtonCx.Provider = Provider;
DocLinkButtonCx.use = useThisContext;

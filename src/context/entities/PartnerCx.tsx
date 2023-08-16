import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type Partner = MyDb["partner"];

type ContextValue = Partner;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  partner,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  partner: Partner;
}) {
  const value: ContextValue = partner;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("PartnerCx.use must be used within its provider!");
  }

  return context;
};

function PartnerCx() {
  throw new Error(
    "PartnerCx exists for naming purposes only and should not be used as a component",
  );
}

export { PartnerCx };

PartnerCx.Provider = Provider;
PartnerCx.use = useThisContext;

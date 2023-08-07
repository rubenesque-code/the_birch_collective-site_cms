import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type Section = MyDb["programme"]["sections"][number];

type ContextValue = Section;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  section,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  section: Section;
}) {
  const value: ContextValue = section;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Section.use must be used within its provider!");
  }

  return context;
};

function SectionCx() {
  throw new Error(
    "SectionCx exists for naming purposes only and should not be used as a component",
  );
}

export { SectionCx };

SectionCx.Provider = Provider;
SectionCx.use = useThisContext;

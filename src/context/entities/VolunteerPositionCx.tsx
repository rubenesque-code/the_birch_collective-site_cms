import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type ContextValue = MyDb["volunteer-position"];

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  volunteerPosition,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  volunteerPosition: MyDb["volunteer-position"];
}) {
  const value: ContextValue = volunteerPosition;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "VolunteerPositionCx.use must be used within its provider!",
    );
  }

  return context;
};

function VolunteerPositionCx() {
  throw new Error(
    "VolunteerPositionCx exists for naming purposes only and should not be used as a component",
  );
}

export { VolunteerPositionCx };

VolunteerPositionCx.Provider = Provider;
VolunteerPositionCx.use = useThisContext;

import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type TeamMember = MyDb["pages"]["aboutUs"]["theTeam"]["members"][number];

type ContextValue = TeamMember;

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  teamMember,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  teamMember: TeamMember;
}) {
  const value: ContextValue = teamMember;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("TeamMemberCx.use must be used within its provider!");
  }

  return context;
};

function TeamMemberCx() {
  throw new Error(
    "TeamMemberCx exists for naming purposes only and should not be used as a component",
  );
}

export { TeamMemberCx };

TeamMemberCx.Provider = Provider;
TeamMemberCx.use = useThisContext;

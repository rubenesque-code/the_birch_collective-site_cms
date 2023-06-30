import { createContext, useContext, type ReactNode, useState } from "react";
import type { MyDb } from "~/types/database";

type DbData = MyDb["pages"]["landing"];

type ContextValue = {
  data: DbData;
  overwrite: (updatedData: MyDb["pages"]["landing"]) => void;
};

const Context = createContext<ContextValue | null>(null);

const Provider = ({
  children,
  initDbData,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  initDbData: DbData;
}) => {
  const [currentDbData, setCurrentDbData] = useState(initDbData);

  const overwrite = (updatedData: MyDb["pages"]["landing"]) =>
    setCurrentDbData(updatedData);

  const value: ContextValue = { data: currentDbData, overwrite };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
};

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("CurrentDbData.use must be used within its provider!");
  }

  return context;
};

function CurrentDbData() {
  throw new Error(
    "CurrentDbData exists for naming purposes only and should not be used as a component",
  );
}

export { CurrentDbData };

CurrentDbData.Provider = Provider;
CurrentDbData.use = useThisContext;

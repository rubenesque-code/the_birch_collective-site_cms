import { createContext, useContext, type ReactNode } from "react";

type ContextValue = {
  data: {
    isChange: boolean;
  };
  actions: {
    save: () => void;
    undo: () => void;
  };
};

const Context = createContext<ContextValue | null>(null);

const Provider = ({
  children,
  ...props
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
} & ContextValue) => {
  const value: ContextValue = props;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
};

// should use zod for instead of checkObjectHasField?
const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useSaveContext must be used within its provider!");
  }

  return context;
};

function ComponentApiCx() {
  throw new Error(
    "SaveContext exists for naming purposes only and should not be used as a component",
  );
}

export { ComponentApiCx, type ContextValue as ContextApiCxProps };

ComponentApiCx.Provider = Provider;
ComponentApiCx.use = useThisContext;

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
    throw new Error("useEntityIdContext must be used within its provider!");
  }

  return context;
};

function SaveContext() {
  throw new Error(
    "SaveContext exists for naming purposes only and should not be used as a component",
  );
}

export { SaveContext };

SaveContext.Provider = Provider;
SaveContext.use = useThisContext;

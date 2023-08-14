import { createContext, useContext, type ReactNode } from "react";

type ContextValue = {
  hello?: string;
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

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("ComponentApiCx.use must be used within its provider!");
  }

  return context;
};

function ComponentApiCx() {
  throw new Error(
    "ComponentApiCx exists for naming purposes only and should not be used as a component",
  );
}

export { ComponentApiCx, type ContextValue as ContextApiCxProps };

ComponentApiCx.Provider = Provider;
ComponentApiCx.use = useThisContext;

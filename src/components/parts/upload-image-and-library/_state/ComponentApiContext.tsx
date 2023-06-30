import { createContext, useContext, type ReactElement } from "react";

export type ComponentAPIContextValue = {
  styles?: { menu?: { itemsWrapper?: string } };
  onUpload: (arg0: { firestoreImageId: string }) => void;
};

const Context = createContext<ComponentAPIContextValue | null>(null);

const Provider = ({
  children,
  ...props
}: {
  children: ReactElement | ((args: ComponentAPIContextValue) => ReactElement);
} & ComponentAPIContextValue) => {
  const value: ComponentAPIContextValue = props;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
};

const useThisContext = () => {
  const value = useContext(Context);
  if (!value) {
    throw new Error("Missing ComponentAPI Provider");
  }
  return value;
};

export const ComponentAPI = () => {
  throw new Error(
    "ComponentAPI exists for naming purposes only and should not be used as a component",
  );
};

ComponentAPI.Provider = Provider;
ComponentAPI.use = useThisContext;

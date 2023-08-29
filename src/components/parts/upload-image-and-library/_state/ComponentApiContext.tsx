import { createContext, useContext, type ReactElement } from "react";

type ComponentAPIContextValue = {
  styles?: { menu?: { itemsWrapper?: string } };
  onUploadOrSelect: (arg0: { dbImageId: string }) => void;
  menuButton: ReactElement;
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

const ComponentApi = () => {
  throw new Error(
    "ComponentAPI exists for naming purposes only and should not be used as a component",
  );
};

export {
  ComponentApi as ComponentApi,
  type ComponentAPIContextValue as ComponentAPIProps,
};

ComponentApi.Provider = Provider;
ComponentApi.use = useThisContext;

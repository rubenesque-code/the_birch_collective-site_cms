import { createContext, useContext, type ReactElement } from "react";
import type { MyDb } from "~/types/database";

type ImagesContextValue = {
  images: MyDb["image"][];
};

const Context = createContext<ImagesContextValue | null>(null);

const Provider = ({
  children,
  ...props
}: {
  children: ReactElement | ((args: ImagesContextValue) => ReactElement);
} & ImagesContextValue) => {
  const value: ImagesContextValue = props;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
};

const useThisContext = () => {
  const value = useContext(Context);
  if (!value) {
    throw new Error("Missing Images Provider");
  }
  return value;
};

const ImagesContext = () => {
  throw new Error(
    "ComponentAPI exists for naming purposes only and should not be used as a component",
  );
};

export { ImagesContext };

ImagesContext.Provider = Provider;
ImagesContext.use = useThisContext;

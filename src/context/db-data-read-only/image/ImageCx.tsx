import { createContext, useContext, type ReactNode } from "react";

import type { MyDb } from "~/types/database";

type ContextValue = MyDb["image"];

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  image,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  image: MyDb["image"];
}) {
  const value: ContextValue = image;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("ImageCx.use must be used within its provider!");
  }

  return context;
};

function Image() {
  throw new Error(
    "ImageCx exists for naming purposes only and should not be used as a component",
  );
}

export { Image };

Image.Provider = Provider;
Image.use = useThisContext;

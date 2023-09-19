import React from "react";

type ImageType = "all" | "used" | "unused";

type ContextValue = {
  query: string;
  setQuery: (value: string) => void;
  imageType: ImageType;
  setImageType: (type: ImageType) => void;
};

const Context = React.createContext<ContextValue | null>(null);

const Provider = ({
  children,
}: {
  children: React.ReactElement | ((args: ContextValue) => React.ReactElement);
}) => {
  const [query, setQuery] = React.useState("");
  const [imageType, setImageType] = React.useState<ImageType>("all");

  const contextValue: ContextValue = {
    query,
    setQuery,
    imageType,
    setImageType,
  };

  return (
    <Context.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
    </Context.Provider>
  );
};

const useContext = () => {
  const value = React.useContext(Context);
  if (!value) {
    throw new Error("Missing Search Provider");
  }
  return value;
};

const FiltersCx = () => {
  throw new Error(
    "SearhContext exists for naming purposes only and should not be used as a component",
  );
};

export { FiltersCx };

FiltersCx.Provider = Provider;
FiltersCx.use = useContext;

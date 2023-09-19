import React from "react";

type ContextValue = {
  query: string;
  setQuery: (value: string) => void;
};

const Context = React.createContext<ContextValue | null>(null);

const Provider = ({
  children,
}: {
  children: React.ReactElement | ((args: ContextValue) => React.ReactElement);
}) => {
  const [query, setQuery] = React.useState("");

  const contextValue: ContextValue = {
    query,
    setQuery,
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

const SearchContext = () => {
  throw new Error(
    "SearhContext exists for naming purposes only and should not be used as a component",
  );
};

export { SearchContext };

SearchContext.Provider = Provider;
SearchContext.use = useContext;

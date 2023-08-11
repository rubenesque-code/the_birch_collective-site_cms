import React from "react";
import type { MyDb } from "~/types/database";

type Entity = MyDb["workshop"]["photoAlbum"]["entries"][number];

type ContextValue = Entity;

const Context = React.createContext<ContextValue | null>(null);

function Provider({
  children,
  infoEntry,
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
  infoEntry: Entity;
}) {
  const value: ContextValue = infoEntry;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("PhotoAlbumEntry.use must be used within its provider!");
  }

  return context;
};

function PhotoAlbumEntry() {
  throw new Error(
    "PhotoAlbumEntry exists for naming purposes only and should not be used as a component",
  );
}

export { PhotoAlbumEntry };

PhotoAlbumEntry.Provider = Provider;
PhotoAlbumEntry.use = useContext;

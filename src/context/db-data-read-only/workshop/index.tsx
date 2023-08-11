import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";
import { InfoEntry } from "./InfoEntry";
import { PhotoAlbumEntry } from "./PhotoAlbumEntry";
import { Section } from "./section";

type ContextValue = MyDb["workshop"];

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  workshop,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  workshop: MyDb["workshop"];
}) {
  const value: ContextValue = workshop;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("WorkshopCx.use must be used within its provider!");
  }

  return context;
};

function Workshop() {
  throw new Error(
    "Workshop exists for naming purposes only and should not be used as a component",
  );
}

export { Workshop as Workshop };

Workshop.Provider = Provider;
Workshop.use = useThisContext;

Workshop.InfoEntry = InfoEntry;
Workshop.PhotoAlbumEntry = PhotoAlbumEntry;
Workshop.Section = Section;

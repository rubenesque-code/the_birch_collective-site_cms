import { type ReactElement, createContext, useContext, useState } from "react";

export type VisibilityState = {
  imageLibrary: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  uploadModal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
};

const Context = createContext<VisibilityState | null>(null);

const Provider = ({
  children,
}: {
  children: ReactElement | ((args: VisibilityState) => ReactElement);
}) => {
  const [imageLibraryIsOpen, setImageLibraryIsOpen] = useState(false);
  const [uploadIsOpen, setUploadIsOpen] = useState(false);

  const value: VisibilityState = {
    imageLibrary: {
      isOpen: imageLibraryIsOpen,
      close() {
        setImageLibraryIsOpen(false);
      },
      open() {
        setImageLibraryIsOpen(true);
      },
    },
    uploadModal: {
      isOpen: uploadIsOpen,
      close() {
        setUploadIsOpen(false);
      },
      open() {
        setUploadIsOpen(true);
      },
    },
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
};

const useThisContext = () => {
  const value = useContext(Context);
  if (!value) {
    throw new Error("Missing Image Modals Visibility Provider");
  }
  return value;
};

export const ModalsVisibilityContext = () => {
  throw new Error(
    "ModalsVisibility exists for naming purposes only and should not be used as a component",
  );
};

ModalsVisibilityContext.Provider = Provider;
ModalsVisibilityContext.use = useThisContext;

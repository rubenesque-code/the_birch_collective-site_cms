import { type ReactElement, createContext, useContext, useState } from "react";

export type VisibilityState = {
  uploadedModal: {
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
  const [uploadedIsOpen, setUploadedIsOpen] = useState(false);
  const [uploadIsOpen, setUploadIsOpen] = useState(false);

  const value: VisibilityState = {
    uploadedModal: {
      isOpen: uploadedIsOpen,
      close() {
        setUploadedIsOpen(false);
      },
      open() {
        setUploadedIsOpen(true);
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

export const ModalsVisibility = () => {
  throw new Error(
    "ModalsVisibility exists for naming purposes only and should not be used as a component",
  );
};

ModalsVisibility.Provider = Provider;
ModalsVisibility.use = useThisContext;

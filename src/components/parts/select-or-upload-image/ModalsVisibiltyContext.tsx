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

const MyContext = createContext<VisibilityState | null>(null);

const ModalsVisibilityProvider = ({
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
    <MyContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </MyContext.Provider>
  );
};

const useModalsVisibilityContext = () => {
  const value = useContext(MyContext);
  if (!value) {
    throw new Error("Missing Image Modals Visibility Provider");
  }
  return value;
};

export const ModalsVisibilityContext = () => {
  throw new Error(
    "ModalsVisibilityContext exists for naming purposes only and should not be used as a component",
  );
};

ModalsVisibilityContext.Provider = ModalsVisibilityProvider;
ModalsVisibilityContext.use = useModalsVisibilityContext;

import { createContext, useContext, useState, type ReactElement } from "react";

type VisibilityState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const MyContext = createContext<VisibilityState | null>(null);

const Provider = ({
  children,
}: {
  children: ReactElement | ((args: VisibilityState) => ReactElement);
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const value: VisibilityState = {
    isOpen,
    closeModal() {
      setIsOpen(false);
    },
    openModal() {
      setIsOpen(true);
    },
  };

  return (
    <MyContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </MyContext.Provider>
  );
};

const useCx = () => {
  const value = useContext(MyContext);
  if (!value) {
    throw new Error("Missing Modal.Visibility Provider");
  }
  return value;
};

function VisibilityCx() {
  throw new Error(
    "UserEditableStore exists for naming purposes only and should not be used as a component",
  );
}

export { VisibilityCx };

VisibilityCx.Provider = Provider;
VisibilityCx.use = useCx;

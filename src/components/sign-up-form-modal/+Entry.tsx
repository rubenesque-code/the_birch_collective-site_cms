import { type ReactElement } from "react";

import { Modal } from "../styled-bases";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import Slides from "./Slides";

const SignUpFormModal = ({
  button,
  ...contextProps
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
} & ContextApiCxProps) => {
  return (
    <ComponentApiCx.Provider {...contextProps}>
      <Modal.WithVisibilityProvider
        button={button}
        panelContent={
          <div className="relative grid max-h-[70vh] w-[90vw] max-w-[1200px] place-items-center rounded-2xl border-4  border-orange bg-white p-xl text-left shadow-xl">
            <Slides />
          </div>
        }
      />
    </ComponentApiCx.Provider>
  );
};

export default SignUpFormModal;

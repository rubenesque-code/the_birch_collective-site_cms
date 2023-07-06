import { type ReactElement } from "react";

import OverlayAndPanelWrapper from "./OvelayAndPanel";
import { VisibilityCx } from "./VisibiltyContext";

export const Modal = () => {
  throw new Error(
    "Modal exists for naming purposes only and should not be used as a component",
  );
};

Modal.VisibilityCx = VisibilityCx;
Modal.OverlayAndPanelWrapper = OverlayAndPanelWrapper;

const WithVisibilityProvider = ({
  button,
  panelContent,
  styles,
}: {
  button: ((arg0: { openModal: () => void }) => ReactElement) | ReactElement;
  panelContent:
    | ReactElement
    | ((arg0: { closeModal: () => void }) => ReactElement);
  styles?: { panelWrapper?: string };
}) => (
  <Modal.VisibilityCx.Provider>
    {({ openModal, closeModal, isOpen }) => (
      <>
        {typeof button === "function" ? button({ openModal }) : button}
        <Modal.OverlayAndPanelWrapper
          isOpen={isOpen}
          onClickOutside={closeModal}
          styles={styles}
          panelContent={
            typeof panelContent === "function"
              ? panelContent({ closeModal })
              : panelContent
          }
        />
      </>
    )}
  </Modal.VisibilityCx.Provider>
);

Modal.WithVisibilityProvider = WithVisibilityProvider;

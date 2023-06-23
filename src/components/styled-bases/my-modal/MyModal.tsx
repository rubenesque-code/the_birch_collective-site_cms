import { Fragment, type ReactElement } from "react";

import { MyTransition } from "../MyTransition";
import { Dialog, Transition } from "@headlessui/react";
import { createPortal } from "react-dom";

export type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactElement;
  styles?: { parentPanel?: string };
  appear?: boolean;
};

const MyModal = ({
  closeModal,
  isOpen,
  children: panelContent,
  styles,
  appear,
}: Props) => {
  if (typeof window !== "object") {
    return null;
  }

  return createPortal(
    <Transition show={isOpen} as={Fragment} appear={appear}>
      <Dialog as="div" onClose={closeModal} className="relative z-50">
        <MyTransition.Child.Opacity>
          <div className="fixed inset-0 bg-gray-50/70" aria-hidden="true" />
        </MyTransition.Child.Opacity>

        <div className="fixed inset-0 grid place-items-center p-4">
          <MyTransition.Child.ScaleAndOpacity>
            <Dialog.Panel className={`${styles?.parentPanel || ""}`}>
              {panelContent}
            </Dialog.Panel>
          </MyTransition.Child.ScaleAndOpacity>
        </div>
      </Dialog>
    </Transition>,
    document.body,
  );
};

export default MyModal;

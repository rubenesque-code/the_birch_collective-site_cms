import { Fragment, type ReactElement } from "react";

import { MyTransition } from "../MyTransition";
import { Dialog, Transition } from "@headlessui/react";
import { createPortal } from "react-dom";

export type Props = {
  isOpen: boolean;
  onClickOutside: () => void;
  panelContent: ReactElement;
  styles?: { panelWrapper?: string };
  showOnInitMount?: boolean;
};

const OverlayAndPanelWrapper = ({
  onClickOutside,
  isOpen,
  panelContent,
  styles,
  showOnInitMount,
}: Props) => {
  if (typeof window !== "object") {
    return null;
  }

  return createPortal(
    <Transition show={isOpen} as={Fragment} appear={showOnInitMount}>
      <Dialog as="div" onClose={onClickOutside} className="relative z-50">
        <MyTransition.Child.Opacity>
          <div className="fixed inset-0 bg-gray-50/70" aria-hidden="true" />
        </MyTransition.Child.Opacity>

        <div className="fixed inset-0 grid place-items-center p-4">
          <MyTransition.Child.ScaleAndOpacity>
            <Dialog.Panel className={`${styles?.panelWrapper || ""}`}>
              {panelContent}
            </Dialog.Panel>
          </MyTransition.Child.ScaleAndOpacity>
        </div>
      </Dialog>
    </Transition>,
    document.body,
  );
};

export default OverlayAndPanelWrapper;

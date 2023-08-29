import type { ReactElement } from "react";

import ModalLayout from "~/components/layouts/Modal";
import { Modal } from "~/components/styled-bases";
import { WithTooltip } from "~/components/WithTooltip";

type Colour = "orange" | "brown" | "green";

type Props = {
  currentColour: Colour;
  onSelect: (colour: Colour) => void;
  button: (arg0: { openModal: () => void }) => ReactElement;
};

const ColourModal = ({ button, currentColour, onSelect }: Props) => (
  <Modal.WithVisibilityProvider
    button={button}
    panelContent={({ closeModal }) => (
      <ModalLayout.Standard
        body={
          <div className="flex items-center gap-lg">
            <WithTooltip text="click to make brown">
              <div
                className={`aspect-square w-[25px] cursor-pointer bg-brandBrown`}
                onClick={() => {
                  if (currentColour === "brown") {
                    return;
                  }

                  onSelect("brown");

                  closeModal();
                }}
              />
            </WithTooltip>
            <WithTooltip text="click to make orange">
              <div
                className={`aspect-square w-[25px] cursor-pointer bg-brandOrange`}
                onClick={() => {
                  if (currentColour === "orange") {
                    return;
                  }

                  onSelect("orange");

                  closeModal();
                }}
              />
            </WithTooltip>
            <WithTooltip text="click to make green">
              <div
                className={`aspect-square w-[25px] cursor-pointer bg-brandGreen`}
                onClick={() => {
                  if (currentColour === "green") {
                    return;
                  }

                  onSelect("green");

                  closeModal();
                }}
              />
            </WithTooltip>
          </div>
        }
        showCloseSection={false}
        styles={{ outerWrapper: "h-[140px]" }}
        header={
          <ModalLayout.Standard.Header>
            <ModalLayout.Standard.Header.Title>
              Choose colour
            </ModalLayout.Standard.Header.Title>
          </ModalLayout.Standard.Header>
        }
      />
    )}
  />
);

export default ColourModal;

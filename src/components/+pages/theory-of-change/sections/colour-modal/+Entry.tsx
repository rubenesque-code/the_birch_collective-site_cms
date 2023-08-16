import type { ReactElement } from "react";
import { WithTooltip } from "~/components/WithTooltip";
import ModalLayout from "~/components/layouts/Modal";
import { Modal } from "~/components/styled-bases";

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
      <ModalLayout.UserEdit
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
          <ModalLayout.UserEdit.Header>
            <ModalLayout.UserEdit.Header.Title>
              Choose colour
            </ModalLayout.UserEdit.Header.Title>
          </ModalLayout.UserEdit.Header>
        }
      />
    )}
  />
);

export default ColourModal;

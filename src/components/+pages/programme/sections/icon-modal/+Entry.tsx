import type { ReactElement } from "react";
import { IconSwith } from "~/components/IconSwitch";
import { WithTooltip } from "~/components/WithTooltip";
import ModalLayout from "~/components/layouts/Modal";
import { Modal } from "~/components/styled-bases";
import { textColourSwith } from "~/helpers/data/switch-to-styles";
import type { MyDb } from "~/types/database";
import type { MyOmit } from "~/types/utilities";

const iconNames = [
  "leaf",
  "tree",
  "orange",
  "potted-plant",
  "plant",
  "flower-tulip",
  "flower-lotus",
  "feather",
  "flame",
  "fish-simple",
  "mountains",
  "moon",
  "grains",
  "star",
  "tipi",
  "sun",
] as const;

type IconName = MyDb["programme"]["sections"][number]["bullets"]["icon"];

type Props = {
  currentColour: "orange" | "brown" | "green";
  currentIconName: IconName;
  onSelect: (iconName: IconName) => void;
  button: (arg0: { openModal: () => void }) => ReactElement;
};

const IconModal = ({
  button,
  currentColour,
  currentIconName,
  onSelect,
}: Props) => {
  return (
    <Modal.WithVisibilityProvider
      button={button}
      panelContent={({ closeModal }) => (
        <ModalLayout.UserEdit
          body={
            <div className="mt-xs flex flex-wrap items-center gap-lg">
              {iconNames.map((iconName, i) => (
                <IconModalIcon
                  closeModal={closeModal}
                  currentIconName={currentIconName}
                  currentColour={currentColour}
                  iconName={iconName}
                  onSelect={onSelect}
                  key={i}
                />
              ))}
            </div>
          }
          showCloseSection={false}
          styles={{ outerWrapper: "h-[240px]" }}
          header={
            <ModalLayout.UserEdit.Header>
              <ModalLayout.UserEdit.Header.Title>
                Choose icon
              </ModalLayout.UserEdit.Header.Title>
              <ModalLayout.UserEdit.Header.Info>
                The icon is the bullet point within the section
              </ModalLayout.UserEdit.Header.Info>
            </ModalLayout.UserEdit.Header>
          }
        />
      )}
    />
  );
};

export default IconModal;

const IconModalIcon = ({
  closeModal,
  currentColour,
  currentIconName,
  iconName,
  onSelect,
}: {
  closeModal: () => void;
  iconName: IconName;
} & MyOmit<Props, "button">) => {
  return (
    <WithTooltip text="click to select icon">
      <div
        className={`cursor-pointer rounded-full p-xs text-2xl transition-all ease-in-out hover:bg-gray-100 ${textColourSwith(
          currentColour,
        )}`}
        onClick={() => {
          if (currentIconName === iconName) {
            return;
          }

          onSelect(iconName);

          closeModal();
        }}
      >
        {<IconSwith iconName={iconName} />}
      </div>
    </WithTooltip>
  );
};

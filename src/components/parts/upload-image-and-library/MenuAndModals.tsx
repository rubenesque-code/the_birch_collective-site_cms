import { type ReactElement } from "react";

import { ComponentAPI, ModalsVisibility } from "./_state";
import { UploadImage } from "./UploadImage";
// import { UploadedPanelContent } from "./ImageLibrary";
import { WithTooltip } from "~/components/WithTooltip";
import { Icon } from "~/components/icons";
import { MyMenu, MyModal } from "~/components/styled-bases";

export const MenuAndModals = () => {
  const { styles } = ComponentAPI.use();
  const { uploadModal } = ModalsVisibility.use();

  return (
    <>
      <MyMenu button={MenuButton} styles={styles?.menu}>
        {/*       <ImageModalButton
        icon={<Icon.Image />}
        onClick={visibilityState.uploadedModal.open}
        text="Use uploaded"
      /> */}
        <ImageModalButton
          icon={<Icon.Upload />}
          onClick={uploadModal.open}
          text="Upload new"
        />
      </MyMenu>

      <MyModal.Default
        isOpen={uploadModal.isOpen}
        closeModal={uploadModal.close}
      >
        <UploadImage />
      </MyModal.Default>

      {/* <MyModal.Default
      isOpen={visibilityState.uploadedModal.isOpen}
      closeModal={visibilityState.uploadedModal.close}
    >
      <UploadedPanelContent closeModal={visibilityState.uploadedModal.close} />
    </MyModal.Default> */}
    </>
  );
};

const MenuButton = () => (
  <WithTooltip text="Update image" yOffset={15}>
    <div className="cursor-pointer rounded-md px-2 py-2 text-sm transition-all duration-75 ease-in-out hover:bg-gray-100 hover:opacity-100">
      <span className="">
        <Icon.Image />
      </span>
    </div>
  </WithTooltip>
);

const ImageModalButton = ({
  onClick,
  icon,
  text,
}: {
  icon: ReactElement;
  text: string;
  onClick: () => void;
}) => (
  <MyMenu.Item>
    <div
      className={`group flex w-full cursor-pointer items-center gap-4 rounded-md px-2 py-2 pr-md text-sm hover:bg-gray-100`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <span>{icon}</span>
        <span className="whitespace-nowrap">{text}</span>
      </div>
    </div>
  </MyMenu.Item>
);

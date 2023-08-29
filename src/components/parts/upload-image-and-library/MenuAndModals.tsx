import { type ReactElement } from "react";

import { Icon } from "~/components/icons";
import { Modal, MyMenu } from "~/components/styled-bases";

import { ComponentApi, ModalsVisibilityContext } from "./_state";
import { ImageLibrary } from "./image-library";
import { UploadImage } from "./upload-image/+Entry";

export const MenuAndModals = () => {
  const { styles, menuButton } = ComponentApi.use();

  const { uploadModal, imageLibrary: imageLibraryModal } =
    ModalsVisibilityContext.use();

  return (
    <>
      <MyMenu button={menuButton} styles={styles?.menu}>
        <ImageModalButton
          icon={<Icon.Image />}
          onClick={imageLibraryModal.open}
          text="Image library"
        />
        <ImageModalButton
          icon={<Icon.Upload />}
          onClick={uploadModal.open}
          text="Upload new"
        />
      </MyMenu>

      <Modal.OverlayAndPanelWrapper
        isOpen={uploadModal.isOpen}
        onClickOutside={uploadModal.close}
        panelContent={<UploadImage />}
      />

      <Modal.OverlayAndPanelWrapper
        isOpen={imageLibraryModal.isOpen}
        onClickOutside={imageLibraryModal.close}
        panelContent={<ImageLibrary closeModal={imageLibraryModal.close} />}
      />
    </>
  );
};

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

import { type ReactElement } from "react";

import { ComponentAPI, ModalsVisibilityContext } from "./_state";
import { UploadImage } from "./UploadImage";
import { ImageLibrary } from "./image-library";
import { Icon } from "~/components/icons";
import { MyMenu, MyModal } from "~/components/styled-bases";

export const MenuAndModals = () => {
  const { styles, menuButton } = ComponentAPI.use();
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

      <MyModal.Default
        isOpen={uploadModal.isOpen}
        closeModal={uploadModal.close}
      >
        <UploadImage />
      </MyModal.Default>

      <MyModal.Default
        isOpen={imageLibraryModal.isOpen}
        closeModal={imageLibraryModal.close}
      >
        <ImageLibrary closeModal={imageLibraryModal.close} />
      </MyModal.Default>
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

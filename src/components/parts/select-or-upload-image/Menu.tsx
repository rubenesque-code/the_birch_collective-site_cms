import { type ReactElement } from "react";

import { ImageModalsVisibilityProvider } from "./ImageModalsVisibiltyContext";
import { UploadPanelContent } from "./UploadPanelContent";
import { UploadedPanelContent } from "./UploadedPanelContent";
import { Icon } from "~/components/icons";
import { MyMenu, MyModal } from "~/components/styled-bases";

export const SelectOrUploadImageMenu = ({
  button,
  styles,
}: {
  button: ReactElement | ((arg0: { isOpen: boolean }) => ReactElement);
  styles?: { buttonWrapper?: string; itemsWrapper?: string };
}) => (
  <ImageModalsVisibilityProvider>
    {({ uploadModal, uploadedModal }) => (
      <>
        <MyMenu button={button} styles={styles}>
          <ImageModalButton
            icon={<Icon.Image />}
            onClick={uploadedModal.open}
            text="Use uploaded"
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
          <UploadPanelContent closeModal={uploadModal.close} />
        </MyModal.Default>

        <MyModal.Default
          isOpen={uploadedModal.isOpen}
          closeModal={uploadedModal.close}
        >
          <UploadedPanelContent closeModal={uploadedModal.close} />
        </MyModal.Default>
      </>
    )}
  </ImageModalsVisibilityProvider>
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
      className={`pr-md hover:bg-base-200 group flex w-full cursor-pointer items-center gap-4 rounded-md px-2 py-2 text-sm`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <span>{icon}</span>
        <span className="whitespace-nowrap">{text}</span>
      </div>
    </div>
  </MyMenu.Item>
);

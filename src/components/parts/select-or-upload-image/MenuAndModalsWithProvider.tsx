import { type ReactElement } from "react";

import { ModalsVisibilityContext } from "./ModalsVisibiltyContext";
import { UploadPanelContent } from "./UploadPanelContent";
import { UploadedPanelContent } from "./UploadedPanelContent";
import { WithTooltip } from "~/components/WithTooltip";
import { Icon } from "~/components/icons";
import { MyMenu, MyModal } from "~/components/styled-bases";

export const MenuAndModalsWithProvider = ({
  // button,
  styles,
}: {
  // button: ReactElement | ((arg0: { isOpen: boolean }) => ReactElement);
  styles?: { itemsWrapper?: string };
  // styles?: { buttonWrapper?: string; itemsWrapper?: string };
}) => (
  <ModalsVisibilityContext.Provider>
    {({ uploadModal, uploadedModal }) => (
      <>
        <MyMenu button={MenuButton} styles={styles}>
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
  </ModalsVisibilityContext.Provider>
);

const MenuButton = () => (
  <div className="cursor-pointer rounded-md px-2 py-2 text-sm transition-all duration-75 ease-in-out hover:bg-gray-100 hover:opacity-100">
    <WithTooltip text="Update image" yOffset={15}>
      <span className="">
        <Icon.Image />
      </span>
    </WithTooltip>
  </div>
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

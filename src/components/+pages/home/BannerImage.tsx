import { Popover } from "@headlessui/react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { ComponentMenu } from "~/components/menus";
import { Icon } from "~/components/icons";
import { TextInputForm } from "~/components/forms";
import { UedCx } from "~/context/user-editable-data";

const BannerImage = () => {
  const {
    bannerImage: { dbConnections, position },
  } = UedCx.Pages.Landing.useData();
  /*   const {
    bannerImage: { dbConnections, position },
  } = UserEditableDataCx.useData("page"); */

  return (
    <div className="group/bannerImage relative aspect-[21/9]">
      <Menu />
      <UserSelectedImageWrapper
        dbImageId={dbConnections.imageId}
        placeholderText="banner image"
      >
        {({ dbImageId }) => (
          <DbImageWrapper dbImageId={dbImageId}>
            {({ urls }) => (
              <CustomisableImage urls={urls} position={position} />
            )}
          </DbImageWrapper>
        )}
      </UserSelectedImageWrapper>
      <ImageInfo />
    </div>
  );
};

export default BannerImage;

const Menu = () => {
  const { bannerImage: bannerImageAction } = UedCx.Pages.Landing.useAction();

  const {
    bannerImage: { position, dbConnections },
  } = UedCx.Pages.Landing.useData();

  return (
    <ComponentMenu styles="left-1 top-1 group-hover/bannerImage:opacity-40">
      {dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={position}
            updateX={bannerImageAction.position.x}
            updateY={bannerImageAction.position.y}
            styles={{ wrapper: "left-0 top-0" }}
          />

          <ComponentMenu.Divider />
        </>
      ) : null}

      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          bannerImageAction.dbConnections.imageId(dbImageId);
          bannerImageAction.position.x(50);
          bannerImageAction.position.y(50);
        }}
        styles={{
          menu: { itemsWrapper: "left-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

const ImageInfo = () => {
  const {
    bannerImage: {
      infoPopover: { text },
    },
  } = UedCx.Pages.Landing.useData();

  const {
    bannerImage: { infoPopover: infoPopoverAction },
  } = UedCx.Pages.Landing.useAction();

  return (
    <Popover className="absolute right-sm top-sm z-10">
      <Popover.Button>
        <div className="rounded-full bg-black">
          <Icon.Info size={22} weight="fill" color="white" />
        </div>
      </Popover.Button>

      <Popover.Panel
        className={`absolute -left-xs top-0 z-10 -translate-x-full px-xs text-white ${
          text.length ? "bg-black" : "border"
        }`}
      >
        <TextInputForm
          localStateValue={text}
          onSubmit={infoPopoverAction.text}
          input={{ placeholder: "Enter image info" }}
          tooltip="image info"
        />
      </Popover.Panel>
    </Popover>
  );
};

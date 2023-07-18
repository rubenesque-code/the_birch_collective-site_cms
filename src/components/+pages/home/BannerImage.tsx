import { Popover } from "@headlessui/react";

import { UserEditableDataCx } from "./_state";

import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { ComponentMenu } from "~/components/menus";
import { Icon } from "~/components/icons";

const BannerImage = () => {
  const {
    bannerImage: { dbConnections, position },
  } = UserEditableDataCx.useData("page");

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
  const userAction = UserEditableDataCx.useAction();

  const {
    bannerImage: { position },
  } = UserEditableDataCx.useData("page");

  return (
    <ComponentMenu styles="left-1 top-1 group-hover/bannerImage:opacity-40">
      <ComponentMenu.Image.PositionMenu
        position={position}
        updateX={(newValue) =>
          userAction.page.bannerImage.position.x.update(newValue)
        }
        updateY={(newValue) =>
          userAction.page.bannerImage.position.y.update(newValue)
        }
        styles={{ wrapper: "left-0 top-0" }}
      />

      <ComponentMenu.Divider />

      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          userAction.page.bannerImage.dbConnections.imageId.update(dbImageId);
          userAction.page.bannerImage.position.x.update(50);
          userAction.page.bannerImage.position.y.update(50);
        }}
        styles={{
          menu: { itemsWrapper: "left-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

const ImageInfo = () => {
  return (
    <Popover className="absolute right-sm top-sm z-10">
      <Popover.Button>
        <div className="rounded-full bg-black">
          <Icon.Info size={22} weight="fill" color="white" />
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute -left-xs top-0 z-10 -translate-x-full border">
        <div className="">TEHEHototeuoehtu</div>
      </Popover.Panel>
    </Popover>
  );
};

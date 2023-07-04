import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { UserEditableData } from "./_state";
import { useState } from "react";

const BannerImage = () => {
  const { dbConnections, position } = UserEditableData.useData("bannerImage");

  return (
    <div className="group/bannerImage relative aspect-[21/9]">
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
      <BannerImageMenu />
    </div>
  );
};

export default BannerImage;

const BannerImageMenu = () => {
  const {
    bannerImage: { dbConnections, position },
  } = UserEditableData.useAction();

  return (
    <div className="absolute right-1 top-1 z-20 flex items-center gap-sm rounded-md bg-white px-xs py-xxs opacity-0 shadow-lg transition-opacity duration-75 ease-in-out group-hover/bannerImage:opacity-40 hover:!opacity-100 ">
      <PositionButtons />

      <ComponentMenu.Divider />

      <ComponentMenu.Image
        onUploadOrSelect={({ dbImageId }) => {
          dbConnections.imageId.update(dbImageId);
          position.x.update(50);
          position.y.update(50);
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </div>
  );
};

const PositionButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const userAction = UserEditableData.useAction();
  const { position } = UserEditableData.useData("bannerImage");

  return (
    <div className="flex items-center gap-sm">
      {!isOpen ? (
        <ComponentMenu.Button
          onClick={() => setIsOpen(true)}
          tooltip="show position controls"
        >
          <Icon.ChangePos />
        </ComponentMenu.Button>
      ) : (
        <>
          <ComponentMenu.Button
            onClick={() => {
              if (position.x === 0) {
                return;
              }
              const newPosition = position.x - 10;
              userAction.bannerImage.position.x.update(newPosition);
            }}
            tooltip="move image focus to the left"
            isDisabled={position.x === 0}
          >
            <Icon.PosLeft />
          </ComponentMenu.Button>
          <ComponentMenu.Button
            onClick={() => {
              if (position.x === 100) {
                return;
              }
              const newPosition = position.x + 10;
              userAction.bannerImage.position.x.update(newPosition);
            }}
            tooltip="move image focus to the right"
            isDisabled={position.x === 100}
          >
            <Icon.PosRight />
          </ComponentMenu.Button>

          <ComponentMenu.Button
            onClick={() => {
              if (position.y === 0) {
                return;
              }
              const newPosition = position.y - 10;
              userAction.bannerImage.position.y.update(newPosition);
            }}
            tooltip="show higher part of the image"
            isDisabled={position.y === 0}
          >
            <Icon.PosDown />
          </ComponentMenu.Button>
          <ComponentMenu.Button
            onClick={() => {
              if (position.y === 100) {
                return;
              }
              const newPosition = position.y + 10;
              userAction.bannerImage.position.y.update(newPosition);
            }}
            tooltip="show lower part of the image"
            isDisabled={position.y === 100}
          >
            <Icon.PosUp />
          </ComponentMenu.Button>

          <ComponentMenu.Button
            onClick={() => setIsOpen(false)}
            tooltip="hide position controls"
            styles={{ button: "text-xs p-1 text-blue-300" }}
          >
            <Icon.HideExpandable />
          </ComponentMenu.Button>
        </>
      )}
    </div>
  );
};

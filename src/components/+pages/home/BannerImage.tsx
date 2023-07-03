import { CustomisableImage } from "~/components/CustomisableImage";
import { FirestoreImageWrapper } from "~/components/FirestoreImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { UserEditableData } from "./_state";
import { useState } from "react";

// Todo: lazy fetch images - matters? Images lazy loaded anyway?

const BannerImage = () => {
  const { firestoreImageId, position } =
    UserEditableData.useData("bannerImage");

  return (
    <div className="group/bannerImage relative aspect-[21/9]">
      <UserSelectedImageWrapper
        firestoreImageId={firestoreImageId}
        placeholderText="banner image"
      >
        {({ storageId }) => (
          <FirestoreImageWrapper firestoreId={storageId}>
            {({ urls }) => (
              <CustomisableImage urls={urls} position={position} />
            )}
          </FirestoreImageWrapper>
        )}
      </UserSelectedImageWrapper>
      <BannerImageMenu />
    </div>
  );
};

export default BannerImage;

const BannerImageMenu = () => {
  const userAction = UserEditableData.useAction();

  return (
    <div className="absolute right-1 top-1 z-20 flex items-center gap-sm rounded-md bg-white px-xs py-xxs opacity-0 shadow-lg transition-opacity duration-75 ease-in-out hover:!opacity-100 group-hover/bannerImage:opacity-40 ">
      <PositionButtons />

      <ComponentMenu.Divider />

      <ComponentMenu.Image
        onUploadOrSelect={({ firestoreImageId }) => {
          userAction.bannerImage.firestoreImageId(firestoreImageId);
          userAction.bannerImage.position.x(50);
          userAction.bannerImage.position.y(50);
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
              userAction.bannerImage.position.x(newPosition);
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
              userAction.bannerImage.position.x(newPosition);
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
              userAction.bannerImage.position.y(newPosition);
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
              userAction.bannerImage.position.y(newPosition);
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

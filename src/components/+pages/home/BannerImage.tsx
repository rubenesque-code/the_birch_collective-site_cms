import { CustomisableImage } from "~/components/CustomisableImage";
import { FirestoreImageWrapper } from "~/components/FirestoreImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { UserEditableData } from "./_state";

// Todo: should reset banner image position when change image
// Todo: image library

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
  const { position } = UserEditableData.useData("bannerImage");

  return (
    <div className="absolute right-1 top-1 z-20 flex items-center gap-sm rounded-md bg-white px-xs py-xxs opacity-0 shadow-lg transition-opacity duration-75 ease-in-out hover:!opacity-100 group-hover/bannerImage:opacity-40 ">
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
      <ComponentMenu.Divider />
      <ComponentMenu.Image
        onUpload={({ firestoreImageId }) => {
          userAction.bannerImage.firestoreImageId(firestoreImageId);
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </div>
  );
};

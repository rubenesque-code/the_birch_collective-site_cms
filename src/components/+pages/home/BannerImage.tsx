import { CustomisableImage } from "~/components/CustomisableImage";
import { StorageImageWrapper } from "~/components/StorageImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { ImageUploadAndLibrary } from "~/components/parts/upload-image-and-library";
import { UserEditableData } from "./_state";

const BannerImage = () => {
  const { firestoreImageId } = UserEditableData.useData("bannerImage");

  return (
    <div className="group/bannerImage relative aspect-[21/9]">
      <UserSelectedImageWrapper
        firestoreImageId={firestoreImageId}
        placeholderText="banner image"
      >
        {({ storageId }) => (
          <StorageImageWrapper firestoreId={storageId}>
            {({ urls }) => (
              <CustomisableImage blur={urls.blur} large={urls.large} />
            )}
          </StorageImageWrapper>
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
      <ImageUploadAndLibrary.Complete
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

import { CustomisableImage } from "~/components/CustomisableImage";
import { StorageImageWrapper } from "~/components/StorageImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { ImageUploadAndLibrary } from "~/components/parts/upload-image-and-library";

const BannerImage = () => (
  <div className="group/bannerImage relative aspect-[21/9]">
    <UserSelectedImageWrapper storageId={""} placeholderText="banner image">
      {({ storageId }) => (
        <StorageImageWrapper storageId={storageId}>
          {({ imgUrl }) => <CustomisableImage src={imgUrl} />}
        </StorageImageWrapper>
      )}
    </UserSelectedImageWrapper>
    <BannerImageMenu />
  </div>
);

export default BannerImage;

const BannerImageMenu = () => (
  <div className="absolute right-1 top-1 z-20 flex items-center gap-sm rounded-md bg-white px-xs py-xxs opacity-0 shadow-lg transition-opacity duration-75 ease-in-out hover:!opacity-100 group-hover/bannerImage:opacity-40 ">
    <ImageUploadAndLibrary.Complete
      styles={{
        itemsWrapper: "right-0 -bottom-1 translate-y-full",
      }}
    />
  </div>
);

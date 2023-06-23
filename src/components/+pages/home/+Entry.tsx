// logo, org name - not editable
// banner image + title needn't be movable
import { CustomisableImage } from "~/components/CustomisableImage";
import { StorageImageWrapper } from "~/components/StorageImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WithTooltip } from "~/components/WithTooltip";
import { Icon } from "~/components/icons";
import { SelectOrUploadImageMenu } from "~/components/parts/select-or-upload-image";

const HomePage = () => {
  return (
    <div>
      <BannerImage />
    </div>
  );
};

export default HomePage;

const BannerImage = () => {
  return (
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
};

const BannerImageMenu = () => {
  return (
    <div className="gap-sm py-xxs px-xs absolute right-1 top-1 z-20 flex items-center rounded-md bg-white opacity-0 shadow-lg transition-opacity duration-75 ease-in-out hover:!opacity-100 group-hover/bannerImage:opacity-50">
      <SelectOrUploadImageMenu
        button={
          <div className="text-base-300 group-hover/bannerImage:text-base-content cursor-pointer rounded-md px-2 py-2 text-sm transition-all duration-75 ease-in-out hover:bg-gray-100 hover:brightness-90">
            <WithTooltip text="Update image" yOffset={15}>
              <span className="">
                <Icon.Image />
              </span>
            </WithTooltip>
          </div>
        }
      />
    </div>
  );
};

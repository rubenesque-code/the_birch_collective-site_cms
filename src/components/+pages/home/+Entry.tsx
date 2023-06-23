// logo, org name - not editable
// banner image + title needn't be movable
import { CustomisableImage } from "~/components/CustomisableImage";
import { StorageImageWrapper } from "~/components/StorageImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";

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
    <div className="relative aspect-[21/9]">
      <UserSelectedImageWrapper storageId={""} placeholderText="banner image">
        {({ storageId }) => (
          <StorageImageWrapper storageId={storageId}>
            {({ imgUrl }) => <CustomisableImage src={imgUrl} />}
          </StorageImageWrapper>
        )}
      </UserSelectedImageWrapper>
    </div>
  );
};

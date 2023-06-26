// logo, org name - not editable
// banner image + title needn't be movable
import BannerImage from "./BannerImage";
import OrgNameAndMotto from "./OrgNameAndMotto";

// □ need to have production values in env.local?

const HomePage = () => {
  return (
    <div>
      <BannerImage />
      <OrgNameAndMotto />
    </div>
  );
};

export default HomePage;

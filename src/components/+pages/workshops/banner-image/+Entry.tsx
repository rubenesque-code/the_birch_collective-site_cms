import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { ComponentMenu } from "~/components/menus";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";

import { UedCx } from "~/context/user-editable-data";

const BannerImage = () => {
  const {
    store: {
      data: {
        bannerImage: { dbConnections, position },
      },
    },
  } = UedCx.Pages.Workshops.use();

  return (
    <div className="group/bannerImage relative aspect-[21/9]">
      <Menu />
      <UserSelectedImageWrapper
        dbImageId={dbConnections.imageId}
        placeholderText="banner image"
      >
        {({ dbImageId }) => (
          <ConnectImage connectedImageId={dbImageId}>
            {({ urls }) => (
              <CustomisableImage urls={urls} position={position} />
            )}
          </ConnectImage>
        )}
      </UserSelectedImageWrapper>
    </div>
  );
};

export default BannerImage;

const Menu = () => {
  const {
    store: {
      data: { bannerImage },
      actions: { bannerImage: bannerImageAction },
    },
  } = UedCx.Pages.Workshops.use();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/bannerImage:opacity-40">
      {bannerImage.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={bannerImage.position}
            updateX={bannerImageAction.position.x}
            updateY={bannerImageAction.position.y}
            styles={{ wrapper: "right-0 top-0", menuItemsWrapper: "right-0" }}
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
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

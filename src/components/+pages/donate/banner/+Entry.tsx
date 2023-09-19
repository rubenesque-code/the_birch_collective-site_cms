/* eslint-disable jsx-a11y/alt-text */
import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import SiteLayout from "~/components/layouts/Site";
import { ComponentMenu } from "~/components/menus";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";

import { UedCx } from "~/context/user-editable-data";

const Banner = () => {
  return (
    <div className="relative">
      <Headings />
      <Image />
    </div>
  );
};

export default Banner;

const Image = () => {
  const {
    store: {
      data: {
        bannerImage: { dbConnections, position },
      },
    },
  } = UedCx.Pages.Donate.use();

  return (
    <div className="group/bannerImage relative aspect-[21/9]">
      <ImageMenu />
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

const ImageMenu = () => {
  const {
    store: {
      data: { bannerImage },
      actions: { bannerImage: bannerImageAction },
    },
  } = UedCx.Pages.Donate.use();

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

const Headings = () => {
  const {
    store: {
      data: { heading, subheading },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Donate.use();

  return (
    <div className="absolute top-1/2 z-10 -translate-y-1/2">
      <SiteLayout.Section.Spacing>
        <div className="text-2xl  text-white">
          <TextAreaForm
            localStateValue={subheading}
            textArea={{
              placeholder: "Subheading",
              styles: "font-semibold",
            }}
            onSubmit={actions.subheading}
            tooltip="Click to edit subheading"
            key={undoKey}
          />
        </div>
        <div className="mt-sm text-6xl font-bold text-white">
          <TextInputForm
            localStateValue={heading}
            input={{
              placeholder: "Heading",
            }}
            onSubmit={actions.heading}
            tooltip="Click to edit heading"
            key={undoKey}
          />
        </div>
      </SiteLayout.Section.Spacing>
    </div>
  );
};

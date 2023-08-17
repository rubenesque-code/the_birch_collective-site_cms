import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";

import { UedCx } from "~/context/user-editable-data";

const Workshops = () => {
  const {
    workshops: { image },
  } = UedCx.Pages.Landing.useData();

  return (
    <div className="flex justify-end">
      <div className="w-11/12">
        <div className="group/workshops-image relative aspect-[8/5]">
          <ImageMenu />
          <UserSelectedImageWrapper
            dbImageId={image.dbConnections.imageId}
            placeholderText="banner image"
          >
            {({ dbImageId }) => (
              <ConnectImage dbImageId={dbImageId}>
                {({ urls }) => (
                  <CustomisableImage urls={urls} position={image.position} />
                )}
              </ConnectImage>
            )}
          </UserSelectedImageWrapper>
          <TextOverlay />
        </div>
      </div>
    </div>
  );
};

export default Workshops;

const ImageMenu = () => {
  const {
    workshops: { image },
  } = UedCx.Pages.Landing.useData();

  const { workshops: workshopsAction } = UedCx.Pages.Landing.useAction();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/workshops-image:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(newValue) => workshopsAction.image.position.x(newValue)}
            updateY={(newValue) => workshopsAction.image.position.y(newValue)}
            styles={{
              wrapper: "right-0 top-0",
              menuItemsWrapper: "right-0",
            }}
          />

          <ComponentMenu.Divider />
        </>
      ) : null}

      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          workshopsAction.image.dbConnections.imageId(dbImageId);
          workshopsAction.image.position.x(50);
          workshopsAction.image.position.y(50);
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

const TextOverlay = () => {
  const {
    workshops: { textOverlay },
  } = UedCx.Pages.Landing.useData();

  const {
    workshops: { textOverlay: textOverlayAction },
  } = UedCx.Pages.Landing.useAction();

  return (
    <div className="absolute bottom-0 right-0 min-w-fit translate-y-xl bg-brandRed p-6 pr-12 text-white md:-bottom-10 md:w-1/3 md:translate-y-0 md:p-12">
      <div className="text-left font-display text-6xl font-bold tracking-wide text-white">
        <TextInputForm
          localStateValue={textOverlay.heading}
          onSubmit={textOverlayAction.heading}
          input={{
            styles: "tracking-wide font-bold",
            placeholder: "workshops banner heading",
          }}
          tooltip="click to edit heading"
        />
      </div>
      <div className="mt-3 hidden w-[300px] text-xl md:block ">
        <TextAreaForm
          localStateValue={textOverlay.body}
          onSubmit={textOverlayAction.body}
          tooltip="click to edit text"
          textArea={{
            placeholder: "workshops banner body",
          }}
        />
      </div>
      <div className="absolute bottom-4 right-1 md:right-5">
        <Icon.CaretRight weight="bold" size={40} />
      </div>
    </div>
  );
};

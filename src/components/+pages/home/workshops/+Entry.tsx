import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { UserEditableDataCx } from "../_state";
import { ComponentMenu } from "~/components/menus";
import { Icon } from "~/components/icons";
import { TextAreaForm, TextInputForm } from "~/components/forms";

const Workshops = () => {
  const {
    page: {
      workshops: { image },
    },
  } = UserEditableDataCx.useAllData();

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
              <DbImageWrapper dbImageId={dbImageId}>
                {({ urls }) => (
                  <CustomisableImage urls={urls} position={image.position} />
                )}
              </DbImageWrapper>
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
    page: { workshops: workshopsAction },
  } = UserEditableDataCx.useAction();

  const {
    page: {
      workshops: { image },
    },
  } = UserEditableDataCx.useAllData();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/workshops-image:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(newValue) =>
              workshopsAction.image.position.x.update(newValue)
            }
            updateY={(newValue) =>
              workshopsAction.image.position.y.update(newValue)
            }
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
          workshopsAction.image.dbConnections.imageId.update(dbImageId);
          workshopsAction.image.position.x.update(50);
          workshopsAction.image.position.y.update(50);
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
    page: {
      workshops: { textOverlay },
    },
  } = UserEditableDataCx.useAllData();

  const {
    page: {
      workshops: { textOverlay: textOverlayAction },
    },
  } = UserEditableDataCx.useAction();

  return (
    <div className="absolute bottom-0 right-0 min-w-fit translate-y-xl bg-brandRed p-6 pr-12 text-white md:-bottom-10 md:w-1/3 md:translate-y-0 md:p-12">
      <div className="text-left font-display text-6xl font-bold tracking-wide text-white">
        <TextInputForm
          localStateValue={textOverlay.heading}
          onSubmit={({ inputValue }) =>
            textOverlayAction.heading.update(inputValue)
          }
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
          onSubmit={({ inputValue }) =>
            textOverlayAction.body.update(inputValue)
          }
          tooltip="click to edit body"
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

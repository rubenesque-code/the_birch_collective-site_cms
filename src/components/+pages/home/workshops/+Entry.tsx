import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { UserEditableDataCx } from "../_state";
import { ComponentMenu } from "~/components/menus";

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

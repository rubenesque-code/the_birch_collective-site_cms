/* eslint-disable jsx-a11y/alt-text */
import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { TextAreaForm } from "~/components/forms";
import { ComponentMenu } from "~/components/menus";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";

import { UedCx } from "~/context/user-editable-data";

const Body = () => {
  return (
    <div className="relative">
      <Heading />
      <div className="mt-xl grid grid-cols-2 gap-lg">
        <Image />
        <Text />
      </div>
    </div>
  );
};

export default Body;

const Heading = () => {
  const {
    store: {
      data: {
        body: { heading },
      },

      actions,
    },

    revision: { undoKey },
  } = UedCx.Pages.Donate.use();

  return (
    <div className="text-4xl">
      <TextAreaForm
        localStateValue={heading}
        textArea={{
          placeholder: "heading",
          styles: "text-center",
        }}
        onSubmit={actions.body.heading}
        tooltip="Click to edit heading"
        key={undoKey}
      />
    </div>
  );
};

const Image = () => {
  const {
    store: {
      data: {
        body: {
          image: { dbConnections, position },
        },
      },
    },
  } = UedCx.Pages.Donate.use();

  return (
    <div className="group/image relative aspect-square">
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
      data: {
        body: {
          image: { dbConnections, position },
        },
      },
      actions: {
        body: { image: imageAction },
      },
    },
  } = UedCx.Pages.Donate.use();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/image:opacity-40">
      {dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={position}
            updateX={imageAction.position.x}
            updateY={imageAction.position.y}
            styles={{ wrapper: "right-0 top-0", menuItemsWrapper: "right-0" }}
          />

          <ComponentMenu.Divider />
        </>
      ) : null}

      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          imageAction.dbConnections.imageId(dbImageId);
          imageAction.position.x(50);
          imageAction.position.y(50);
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

const Text = () => {
  const {
    store: {
      data: {
        body: { text },
      },

      actions,
    },

    revision: { undoKey },
  } = UedCx.Pages.Donate.use();

  return (
    <div className="custom-prose prose w-full max-w-full">
      <TextAreaForm
        localStateValue={text}
        textArea={{
          placeholder: "body text",
        }}
        onSubmit={actions.body.text}
        tooltip="Click to edit text"
        key={undoKey}
      />
    </div>
  );
};

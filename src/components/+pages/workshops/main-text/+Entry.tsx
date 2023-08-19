import { Popover } from "@headlessui/react";
import Markdown from "markdown-to-jsx";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import TextInputPopoverPanel from "~/components/TextInputPopoverPanel";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WithTooltip } from "~/components/WithTooltip";

import { UedCx } from "~/context/user-editable-data";

const MainText = () => {
  const {
    store: {
      data: { mainText },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Workshops.use();

  return (
    <div className="group/main">
      <CmsLayout.EditBar className="opacity-60 group-hover/main:opacity-90 hover:!opacity-100">
        <PreviewModal />
        <CmsLayout.EditBar.Info
          infoText="The text below is approximate. See preview left."
          gap="xs"
        />
      </CmsLayout.EditBar>
      <div className="custom-prose prose mt-sm w-full max-w-full">
        <TextAreaForm
          localStateValue={mainText}
          textArea={{
            placeholder: "Workshops page main text",
          }}
          onSubmit={actions.mainText}
          tooltip="Click to edit main text"
          key={undoKey}
        />
      </div>
      <div className="mt-lg">
        <AboutAmy />
      </div>
    </div>
  );
};

export default MainText;

const AboutAmy = () => {
  const {
    store: {
      data: { aboutAmy },
      actions: { aboutAmy: aboutAmyAction },
    },
    revision: { undoKey },
  } = UedCx.Pages.Workshops.use();

  return (
    <div>
      <h3 className="font-display text-2xl text-brandGreen">
        <TextInputForm
          localStateValue={aboutAmy.heading}
          input={{
            placeholder: "Meet Amy heading",
            styles: "tracking-wide font-bold",
          }}
          onSubmit={aboutAmyAction.heading}
          tooltip="Click to edit amy heading"
          key={undoKey}
        />
      </h3>
      <div className="mt-xxs flex justify-between gap-md">
        <div className="w-full">
          <div className="custom-prose prose mt-sm w-full max-w-full">
            <TextAreaForm
              localStateValue={aboutAmy.text}
              textArea={{
                placeholder: "About amy main text",
              }}
              onSubmit={aboutAmyAction.text}
              tooltip="Click to about amy main text"
              key={undoKey}
            />
          </div>
          <div className="mt-sm flex items-center gap-md">
            <div className="custom-prose prose max-w-full">
              <TextInputForm
                localStateValue={aboutAmy.followOnInstaText}
                input={{
                  placeholder: "Meet Amy follow on insta text",
                }}
                onSubmit={aboutAmyAction.followOnInstaText}
                tooltip="Click to edit amy follow insta text"
                key={undoKey}
              />
            </div>
            <AmyInstaLinkModal />
          </div>
        </div>
        <AmyImage />
      </div>
    </div>
  );
};

const AmyInstaLinkModal = () => {
  const {
    store: {
      data: { aboutAmy },
      actions: { aboutAmy: aboutAmyAction },
    },
  } = UedCx.Pages.Workshops.use();

  return (
    <Popover className="relative z-20 grid place-items-center">
      <Popover.Button>
        <WithTooltip text="Click to edit link">
          <div className="text-xl">
            <Icon.Instagram color="#833AB4" />
          </div>
        </WithTooltip>
      </Popover.Button>

      <Popover.Panel className={`absolute -top-xs left-0 -translate-y-full`}>
        <TextInputPopoverPanel
          input={
            <TextInputForm
              localStateValue={aboutAmy.instaLink}
              onSubmit={aboutAmyAction.instaLink}
              input={{ placeholder: "Enter instagram link" }}
              tooltip="Click to update instagram link"
            />
          }
          title="Amy instagram link"
        />
      </Popover.Panel>
    </Popover>
  );
};

const AmyImage = () => {
  const {
    store: {
      data: { aboutAmy },
    },
  } = UedCx.Pages.Workshops.use();

  return (
    <div className="group/amy-image relative h-[120px] w-[120px] shrink-0 rounded-full">
      <AmyImageMenu />
      <UserSelectedImageWrapper
        dbImageId={aboutAmy.image.dbConnections.imageId}
        placeholderText="amy image"
        isCircle
      >
        {({ dbImageId }) => (
          <ConnectImage dbImageId={dbImageId}>
            {({ urls }) => (
              <CustomisableImage
                urls={urls}
                position={aboutAmy.image.position}
                objectFit="cover"
                isCircle
              />
            )}
          </ConnectImage>
        )}
      </UserSelectedImageWrapper>
    </div>
  );
};

const AmyImageMenu = () => {
  const {
    store: {
      data: {
        aboutAmy: { image },
      },
      actions: {
        aboutAmy: { image: imageAction },
      },
    },
  } = UedCx.Pages.Workshops.use();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/amy-image:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
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
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

const PreviewModal = () => {
  const {
    store: {
      data: { mainText },
    },
  } = UedCx.Pages.Workshops.use();

  return (
    <Modal.WithVisibilityProvider
      button={({ openModal }) => (
        <CmsLayout.EditBar.Button
          icon={<Icon.SitePreview />}
          onClick={openModal}
          text="preview text"
        />
      )}
      panelContent={({ closeModal }) => (
        <div className="rounded-lg bg-white p-lg shadow-xl">
          <div className="flex justify-end">
            <h2 className="flex items-center gap-xs  text-gray-400">
              <span>
                <Icon.SitePreview />
              </span>
              <span>preview</span>
            </h2>
          </div>
          {mainText.length ? (
            <div className="custom-prose prose mt-lg max-w-full gap-10 md:columns-2">
              <Markdown>{mainText}</Markdown>
            </div>
          ) : (
            <p className="mt-md italic text-gray-400">No text yet.</p>
          )}
          <div className="mt-xl flex justify-end">
            <button
              className="my-btn my-btn-neutral"
              type="button"
              onClick={closeModal}
            >
              close
            </button>
          </div>
        </div>
      )}
    />
  );
};

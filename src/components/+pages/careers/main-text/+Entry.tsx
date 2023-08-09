import { Popover } from "@headlessui/react";
import Markdown from "markdown-to-jsx";
import { type ReactElement } from "react";
import TextInputPopoverPanel from "~/components/TextInputPopoverPanel";
import { WithTooltip } from "~/components/WithTooltip";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import SiteLayout from "~/components/layouts/Site";
import { Modal } from "~/components/styled-bases";
import { UedCx } from "~/context/user-editable-data";

const MainText = () => {
  const {
    store: {
      data: { mainText, followOnSocialMediaText },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Careers.use();

  return (
    <div className="group/main">
      <CmsLayout.EditBar className="opacity-60 group-hover/main:opacity-90 hover:!opacity-100">
        <PreviewModal />
        <CmsLayout.EditBar.Info
          infoText="The text below is approximate. See preview left. Leave main text empty if unwanted."
          gap="xs"
        />
      </CmsLayout.EditBar>
      <div className="custom-prose prose mt-sm w-full max-w-full">
        <TextAreaForm
          localStateValue={mainText}
          textArea={{
            placeholder: "Careers page main text (optional)",
          }}
          onSubmit={actions.mainText}
          tooltip="Click to edit main text"
          key={undoKey}
        />
        <div className="mt-md">
          <div>
            <TextAreaForm
              localStateValue={followOnSocialMediaText}
              textArea={{
                placeholder: "Follow us on social media text",
              }}
              onSubmit={actions.followOnSocialMediaText}
              tooltip="Click to follow us on social media text"
              key={undoKey}
            />
          </div>
          <div className="mt-sm">
            <SocialMediaLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainText;

const SocialMediaLinks = () => {
  const { socialMediaLinks } = UedCx.OrgDetails.useData();

  const { socialMediaLinks: socialMediaLinksAction } =
    UedCx.OrgDetails.useAction();

  return (
    <div className="flex items-center gap-lg">
      <SocialMediaLink
        icon={<Icon.Facebook color="#3b5998" />}
        panelContent={
          <TextInputPopoverPanel
            input={
              <TextInputForm
                localStateValue={socialMediaLinks.facebook}
                onSubmit={socialMediaLinksAction.facebook}
                input={{ placeholder: "Enter facebook link" }}
                tooltip="Click to update facebook link"
              />
            }
            title="Facebook link"
          />
        }
      />

      <SocialMediaLink
        icon={<Icon.Instagram color="#833AB4" />}
        panelContent={
          <TextInputPopoverPanel
            input={
              <TextInputForm
                localStateValue={socialMediaLinks.instagram}
                onSubmit={socialMediaLinksAction.instagram}
                input={{ placeholder: "Enter instagram link" }}
                tooltip="Click to update instagram link"
              />
            }
            title="Instagram link"
          />
        }
      />

      <SocialMediaLink
        icon={<Icon.Linkedin color="#0e76a8" />}
        panelContent={
          <TextInputPopoverPanel
            input={
              <TextInputForm
                localStateValue={socialMediaLinks.linkedIn}
                onSubmit={socialMediaLinksAction.linkedIn}
                input={{ placeholder: "Enter linkedIn link" }}
                tooltip="Click to update linkedIn link"
              />
            }
            title="LinkedIn link"
          />
        }
      />
    </div>
  );
};

const SocialMediaLink = ({
  icon,
  panelContent,
}: {
  icon: ReactElement;
  panelContent: ReactElement;
}) => (
  <Popover className="relative">
    <Popover.Button>
      <WithTooltip text="Click to edit link">
        <div className="text-3xl">{icon}</div>
      </WithTooltip>
    </Popover.Button>

    <Popover.Panel className={`absolute -top-xs left-0 -translate-y-full`}>
      {panelContent}
    </Popover.Panel>
  </Popover>
);

const PreviewModal = () => {
  const {
    store: {
      data: { mainText, followOnSocialMediaText },
    },
  } = UedCx.Pages.Careers.use();

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
          <SiteLayout.Section.Spacing>
            <div className="mt-lg">
              {mainText.length ? (
                <div className="custom-prose prose mb-xl max-w-full gap-10 md:columns-2">
                  <Markdown>{mainText}</Markdown>
                </div>
              ) : null}
              <div className="flex flex-col">
                <div className="custom-prose prose max-w-full">
                  <Markdown>{followOnSocialMediaText}</Markdown>
                </div>
                <div className="mt-md flex items-center gap-lg">
                  <div className="text-3xl">
                    <Icon.Facebook color="#3b5998" />
                  </div>
                  <div className="text-3xl">
                    <Icon.Instagram color="#833AB4" />
                  </div>
                  <div className="text-3xl">
                    <Icon.Linkedin color="#0e76a8" />
                  </div>
                </div>
              </div>
            </div>
          </SiteLayout.Section.Spacing>
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

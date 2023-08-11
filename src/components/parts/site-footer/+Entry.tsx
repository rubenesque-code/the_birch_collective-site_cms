import { Popover } from "@headlessui/react";
import type { ReactElement } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import TextInputPopoverPanel from "~/components/TextInputPopoverPanel";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";

import livingWageLogo from "public/images/living-wage-logo.webp";
import { NextImage } from "~/lib/external-packages-rename";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { ComponentMenu } from "~/components/menus";
import { WithTooltip } from "~/components/WithTooltip";
import { UedCx } from "~/context/user-editable-data";

// todo: block phone number + email through other means

const SiteFooter = () => (
  <div className="flex items-center gap-xl">
    <div className="flex-grow">
      <SocialMediaLinks />
      <div className="mt-md">
        <PageLinks />
      </div>
      <div className="mt-md">
        <InfoRow />
      </div>
      <div className="mt-md">
        <BottomRow />
      </div>
    </div>
    <SecondColumn />
  </div>
);

export default SiteFooter;

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

const PageLinks = () => {
  const { programmes, workshops, donate, volunteer, aboutUs } =
    UedCx.LinkLabels.useData();

  const linkLabelsAction = UedCx.LinkLabels.useAction();

  return (
    <div className="flex items-center gap-lg">
      <div className="font-medium text-brandGreen">
        <TextInputForm
          localStateValue={programmes}
          onSubmit={linkLabelsAction.programmes}
          input={{ placeholder: "Programmes link text", styles: "underline" }}
          tooltip="Click to edit programmes link text"
        />
      </div>
      <div className="font-medium text-brandGreen">
        <TextInputForm
          localStateValue={workshops}
          onSubmit={linkLabelsAction.workshops}
          input={{ placeholder: "Workshops link text", styles: "underline" }}
          tooltip="Click to edit workshops link text"
        />
      </div>
      <div className="font-medium text-brandGreen">
        <TextInputForm
          localStateValue={donate}
          onSubmit={linkLabelsAction.donate}
          input={{ placeholder: "Donate link text", styles: "underline" }}
          tooltip="Click to edit donate link text"
        />
      </div>
      <div className="font-medium text-brandGreen">
        <TextInputForm
          localStateValue={volunteer}
          onSubmit={linkLabelsAction.volunteer}
          input={{ placeholder: "Volunteer link text", styles: "underline" }}
          tooltip="Click to edit volunteer link text"
        />
      </div>
      <div className="font-medium text-brandGreen">
        <TextInputForm
          localStateValue={aboutUs}
          onSubmit={linkLabelsAction.aboutUs}
          input={{ placeholder: "About us link text", styles: "underline" }}
          tooltip="Click to edit about us link text"
        />
      </div>
    </div>
  );
};

const InfoRow = () => {
  const { livingWageEmployer, orgDescription } = UedCx.Footer.useData();

  const footerAction = UedCx.Footer.useAction();

  return (
    <div className="">
      <div className="text-gray-800">
        <TextAreaForm
          localStateValue={orgDescription}
          textArea={{
            placeholder: "Org description (optional)",
          }}
          onSubmit={footerAction.orgDescription}
          tooltip="Click to edit org description"
        />
      </div>
      <div className="mt-xxxs text-gray-800">
        <TextAreaForm
          localStateValue={livingWageEmployer.text}
          textArea={{
            placeholder: "Living wage employer text (optional)",
          }}
          onSubmit={footerAction.livingWageEmployer.text}
          tooltip="Click to edit living wage employer text"
        />
      </div>
    </div>
  );
};

const SecondColumn = () => {
  const { logoImage } = UedCx.OrgDetails.useData();

  return (
    <div className="flex items-center gap-lg">
      <div className="relative aspect-square w-[100px]">
        <NextImage
          alt=""
          src={livingWageLogo}
          fill
          placeholder="blur"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className="relative aspect-square w-[70px]">
        <UserSelectedImageWrapper
          dbImageId={logoImage.dbConnections.imageId}
          placeholderText="logo"
        >
          {({ dbImageId }) => (
            <ConnectImage dbImageId={dbImageId}>
              {({ urls }) => <CustomisableImage urls={urls} />}
            </ConnectImage>
          )}
        </UserSelectedImageWrapper>
        <LogoMenu />
      </div>
    </div>
  );
};

const LogoMenu = () => {
  const { logoImage: logoAction } = UedCx.OrgDetails.useAction();

  return (
    <ComponentMenu styles="left-1 top-1 group-hover/logo:opacity-40">
      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          logoAction.dbConnections.imageId(dbImageId);
        }}
        styles={{
          menu: { itemsWrapper: "left-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

const BottomRow = () => {
  const { contact } = UedCx.OrgDetails.useData();
  const footer = UedCx.Footer.useData();

  const { contact: contactAction } = UedCx.OrgDetails.useAction();
  const footerAction = UedCx.Footer.useAction();

  return (
    <div className="flex items-center gap-lg">
      <div className="text-brandGreen">
        <TextInputForm
          localStateValue={contact.phoneNumber}
          onSubmit={contactAction.phoneNumber}
          input={{ placeholder: "Phone number" }}
          tooltip="Click to edit phone number"
        />
      </div>
      <div className="text-brandGreen">
        <TextInputForm
          localStateValue={contact.email}
          onSubmit={contactAction.email}
          input={{ placeholder: "Email" }}
          tooltip="Click to edit email"
        />
      </div>
      <div className="text-brandGreen">
        <TextInputForm
          localStateValue={footer.message}
          onSubmit={footerAction.message}
          input={{
            placeholder: "Link to message form text",
          }}
          tooltip="Click to edit link to message form text"
        />
      </div>
    </div>
  );
};

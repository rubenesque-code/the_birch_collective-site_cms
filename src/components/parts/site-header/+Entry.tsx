import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { TextInputForm } from "~/components/forms";
import { ComponentMenu } from "~/components/menus";
import AboutUs from "./AboutUs";
import GetInvolved from "./GetInvolved";
import { UedCx } from "~/context/user-editable-data";

const SiteHeader = () => {
  const linkLabels = UedCx.LinkLabels.useData();

  const linkLabelAction = UedCx.LinkLabels.useAction();

  const { undoKey } = UedCx.LinkLabels.useRevision();

  return (
    <div className="flex items-center justify-between p-md">
      <LogoAndOrgName />

      <div className="flex items-center gap-md">
        <AboutUs />
        <div className="max-w-[300px] overflow-x-auto text-sm font-semibold uppercase tracking-wide text-gray-700 lg:text-base xl:text-lg">
          <TextInputForm
            localStateValue={linkLabels.programmes}
            onSubmit={linkLabelAction.programmes}
            input={{
              placeholder: "Programmes link text",
              styles: "uppercase tracking-wide",
            }}
            tooltip="Click to edit programmes link text"
            key={undoKey}
          />
        </div>
        <GetInvolved />
        <div className="max-w-[300px] overflow-x-auto text-sm font-semibold uppercase tracking-wide text-gray-700 lg:text-base xl:text-lg">
          <TextInputForm
            localStateValue={linkLabels.workshops}
            onSubmit={linkLabelAction.workshops}
            input={{
              placeholder: "Workshops link text",
              styles: "uppercase tracking-wide",
            }}
            tooltip="Click to edit workshops link text"
            key={undoKey}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;

const LogoAndOrgName = () => {
  const { logoImage, name } = UedCx.OrgDetails.useData();

  const orgDetailsAction = UedCx.OrgDetails.useAction();

  const { undoKey } = UedCx.OrgDetails.useRevision();

  return (
    <div className="flex items-center gap-sm">
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
      <div className="font-display text-3xl font-bold tracking-wider text-display lg:text-4xl xl:text-6xl">
        <TextInputForm
          localStateValue={name}
          onSubmit={orgDetailsAction.name}
          input={{ placeholder: "Org name" }}
          tooltip="Click to edit org name"
          key={undoKey}
        />
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

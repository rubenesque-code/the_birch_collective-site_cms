import { UserEditableDataCx } from "~/components/+pages/home/_state";
import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { TextInputForm } from "~/components/forms";
import { ComponentMenu } from "~/components/menus";
import AboutUs from "./AboutUs";
import GetInvolved from "./GetInvolved";

const FrontendHeader = () => {
  const { linkLabels } = UserEditableDataCx.useAllData();

  const { linkLabels: linkLabelAction } = UserEditableDataCx.useAction();

  return (
    <div className="flex items-center justify-between p-md">
      <LogoAndOrgName />

      <div className="flex items-center gap-md">
        <AboutUs />
        <div className="max-w-[300px] overflow-x-auto text-sm font-semibold uppercase tracking-wide lg:text-base xl:text-lg">
          <TextInputForm
            localStateValue={linkLabels.programmes}
            onSubmit={({ inputValue }) =>
              linkLabelAction.programmes.update(inputValue)
            }
            input={{
              placeholder: "Programmes link text",
              styles: "uppercase tracking-wide",
            }}
            tooltip="Click to edit programmes link text"
          />
        </div>
        <GetInvolved />
        <div className="max-w-[300px] overflow-x-auto text-sm font-semibold uppercase tracking-wide lg:text-base xl:text-lg">
          <TextInputForm
            localStateValue={linkLabels.workshops}
            onSubmit={({ inputValue }) =>
              linkLabelAction.workshops.update(inputValue)
            }
            input={{
              placeholder: "Workshops link text",
              styles: "uppercase tracking-wide",
            }}
            tooltip="Click to edit workshops link text"
          />
        </div>
      </div>
    </div>
  );
};

export default FrontendHeader;

const LogoAndOrgName = () => {
  const {
    orgDetails: { logoImage, name },
  } = UserEditableDataCx.useAllData();

  const { orgDetails: orgDetailsAction } = UserEditableDataCx.useAction();

  return (
    <div className="flex items-center gap-sm">
      <div className="relative aspect-square w-[70px]">
        <UserSelectedImageWrapper
          dbImageId={logoImage.dbConnections.imageId}
          placeholderText="logo"
        >
          {({ dbImageId }) => (
            <DbImageWrapper dbImageId={dbImageId}>
              {({ urls }) => <CustomisableImage urls={urls} />}
            </DbImageWrapper>
          )}
        </UserSelectedImageWrapper>
        <LogoMenu />
      </div>
      <div className="font-display text-3xl font-bold tracking-wider text-display lg:text-4xl xl:text-6xl">
        <TextInputForm
          localStateValue={name}
          onSubmit={({ inputValue }) =>
            orgDetailsAction.name.update(inputValue)
          }
          input={{ placeholder: "Org name" }}
          tooltip="Click to edit org name"
        />
      </div>
    </div>
  );
};

const LogoMenu = () => {
  const {
    orgDetails: { logoImage: logoAction },
  } = UserEditableDataCx.useAction();

  return (
    <ComponentMenu styles="left-1 top-1 group-hover/logo:opacity-40">
      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          logoAction.dbConnections.imageId.update(dbImageId);
        }}
        styles={{
          menu: { itemsWrapper: "left-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

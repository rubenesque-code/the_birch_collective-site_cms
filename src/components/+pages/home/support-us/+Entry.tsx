import { TextAreaForm, TextInputForm } from "~/components/forms";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { ConnectImage } from "~/components/DbImageWrapper";
import { CustomisableImage } from "~/components/CustomisableImage";
import { ComponentMenu } from "~/components/menus";
import { UedCx } from "~/context/user-editable-data";

const SupportUs = () => {
  return (
    <div className="">
      <Heading />
      <div className="mt-xl grid grid-cols-2 gap-md">
        <Donate />
        <Volunteer />
      </div>
    </div>
  );
};

export default SupportUs;

const Heading = () => {
  const { supportUs } = UedCx.Pages.Landing.useData();

  const { supportUs: supportUsActions } = UedCx.Pages.Landing.useAction();

  return (
    <div className="">
      <div className="text-center font-display text-6xl text-brandGreen">
        <TextInputForm
          localStateValue={supportUs.heading}
          onSubmit={supportUsActions.heading}
          input={{
            placeholder: "Support us heading",
            styles: "font-bold tracking-wide text-center",
          }}
          tooltip="click to edit support us heading"
        />
      </div>
    </div>
  );
};

const Donate = () => {
  return (
    <div>
      <div className="group/donate-image relative aspect-square">
        <DonateImageMenu />
        <DonateImage />
        <DonateButton />
      </div>
      <div className="mt-5 xs:mt-6 md:mt-8">
        <DonateDescription />
      </div>
    </div>
  );
};

const DonateImage = () => {
  const {
    supportUs: { donate },
  } = UedCx.Pages.Landing.useData();

  return (
    <UserSelectedImageWrapper
      dbImageId={donate.image.dbConnections.imageId}
      placeholderText="donate image"
    >
      {({ dbImageId }) => (
        <ConnectImage dbImageId={dbImageId}>
          {({ urls }) => (
            <CustomisableImage urls={urls} position={donate.image.position} />
          )}
        </ConnectImage>
      )}
    </UserSelectedImageWrapper>
  );
};

const DonateImageMenu = () => {
  const {
    supportUs: {
      donate: { image },
    },
  } = UedCx.Pages.Landing.useData();

  const {
    supportUs: {
      donate: { image: imageAction },
    },
  } = UedCx.Pages.Landing.useAction();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/donate-image:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(newValue) => imageAction.position.x(newValue)}
            updateY={(newValue) => imageAction.position.y(newValue)}
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

const DonateButton = () => {
  const {
    supportUs: {
      donate: { buttonText },
    },
  } = UedCx.Pages.Landing.useData();

  const {
    supportUs: {
      donate: { buttonText: buttonTextAction },
    },
  } = UedCx.Pages.Landing.useAction();

  return (
    <div className="absolute bottom-0 left-0 flex cursor-pointer items-center gap-sm rounded-sm bg-brandGreen px-4 py-2 text-lg font-bold tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
      <TextInputForm
        localStateValue={buttonText}
        onSubmit={buttonTextAction}
        input={{ placeholder: "Donate button text" }}
        tooltip="Click to edit button text"
      />
    </div>
  );
};

const DonateDescription = () => {
  const {
    supportUs: {
      donate: { description },
    },
  } = UedCx.Pages.Landing.useData();

  const {
    supportUs: {
      donate: { description: descriptionAction },
    },
  } = UedCx.Pages.Landing.useAction();

  return (
    <div className="text-center font-normal lg:text-xl">
      <TextAreaForm
        localStateValue={description}
        onSubmit={descriptionAction}
        textArea={{ placeholder: "Donate description", styles: "text-center" }}
        tooltip="Click to edit description"
      />
    </div>
  );
};

const Volunteer = () => (
  <div>
    <div className="group/donate-image relative aspect-square">
      <VolunteerImageMenu />
      <VolunteerImage />
      <VolunteerButton />
    </div>
    <div className="mt-5 xs:mt-6 md:mt-8">
      <VolunteerDescription />
    </div>
  </div>
);

const VolunteerImage = () => {
  const {
    supportUs: { volunteer },
  } = UedCx.Pages.Landing.useData();

  return (
    <UserSelectedImageWrapper
      dbImageId={volunteer.image.dbConnections.imageId}
      placeholderText="volunteer image"
    >
      {({ dbImageId }) => (
        <ConnectImage dbImageId={dbImageId}>
          {({ urls }) => (
            <CustomisableImage
              urls={urls}
              position={volunteer.image.position}
            />
          )}
        </ConnectImage>
      )}
    </UserSelectedImageWrapper>
  );
};

const VolunteerImageMenu = () => {
  const {
    supportUs: {
      volunteer: { image },
    },
  } = UedCx.Pages.Landing.useData();

  const {
    supportUs: {
      volunteer: { image: imageAction },
    },
  } = UedCx.Pages.Landing.useAction();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/volunteer-image:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(newValue) => imageAction.position.x(newValue)}
            updateY={(newValue) => imageAction.position.y(newValue)}
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

const VolunteerButton = () => {
  const {
    supportUs: {
      volunteer: { buttonText },
    },
  } = UedCx.Pages.Landing.useData();

  const {
    supportUs: {
      volunteer: { buttonText: buttonTextAction },
    },
  } = UedCx.Pages.Landing.useAction();

  return (
    <div className="absolute bottom-0 left-0 flex cursor-pointer items-center gap-sm rounded-sm bg-brandGreen px-4 py-2 text-lg font-bold tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
      <TextInputForm
        localStateValue={buttonText}
        onSubmit={buttonTextAction}
        input={{ placeholder: "Volunteer button text" }}
        tooltip="Click to edit button text"
      />
    </div>
  );
};

const VolunteerDescription = () => {
  const {
    supportUs: {
      volunteer: { description },
    },
  } = UedCx.Pages.Landing.useData();

  const {
    supportUs: {
      volunteer: { description: descriptionAction },
    },
  } = UedCx.Pages.Landing.useAction();

  return (
    <div className="text-center font-normal lg:text-xl">
      <TextAreaForm
        localStateValue={description}
        onSubmit={descriptionAction}
        textArea={{
          placeholder: "Volunteer description",
          styles: "text-center",
        }}
        tooltip="Click to edit description"
      />
    </div>
  );
};

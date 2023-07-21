import { TextAreaForm, TextInputForm } from "~/components/forms";
import { UserEditableDataCx } from "../_state";
import { RevisionCx } from "../_state/RevisionCx";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { CustomisableImage } from "~/components/CustomisableImage";
import { ComponentMenu } from "~/components/menus";

const SupportUs = () => {
  return (
    <div className="group/support-us">
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
  const {
    page: { supportUs },
  } = UserEditableDataCx.useAllData();

  const {
    page: { supportUs: supportUsActions },
  } = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="">
      <div className="text-center font-display text-6xl text-brandGreen">
        <TextInputForm
          localStateValue={supportUs.heading}
          onSubmit={({ inputValue }) =>
            supportUsActions.heading.update(inputValue)
          }
          input={{
            placeholder: "Support us heading",
            styles: "font-bold tracking-wide text-center",
          }}
          tooltip="click to edit support us heading"
          key={undoKey}
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
    page: {
      supportUs: { donate },
    },
  } = UserEditableDataCx.useAllData();

  return (
    <UserSelectedImageWrapper
      dbImageId={donate.image.dbConnections.imageId}
      placeholderText="donate image"
    >
      {({ dbImageId }) => (
        <DbImageWrapper dbImageId={dbImageId}>
          {({ urls }) => (
            <CustomisableImage urls={urls} position={donate.image.position} />
          )}
        </DbImageWrapper>
      )}
    </UserSelectedImageWrapper>
  );
};

const DonateImageMenu = () => {
  const {
    page: {
      supportUs: {
        donate: { image },
      },
    },
  } = UserEditableDataCx.useAllData();

  const {
    page: {
      supportUs: {
        donate: { image: imageAction },
      },
    },
  } = UserEditableDataCx.useAction();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/donate-image:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(newValue) => imageAction.position.x.update(newValue)}
            updateY={(newValue) => imageAction.position.y.update(newValue)}
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
          imageAction.dbConnections.imageId.update(dbImageId);
          imageAction.position.x.update(50);
          imageAction.position.y.update(50);
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
    page: {
      supportUs: {
        donate: { buttonText },
      },
    },
  } = UserEditableDataCx.useAllData();

  const {
    page: {
      supportUs: {
        donate: { buttonText: buttonTextAction },
      },
    },
  } = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="absolute bottom-0 left-0 flex cursor-pointer items-center gap-sm rounded-sm bg-brandGreen px-4 py-2 text-lg font-bold tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
      <TextInputForm
        localStateValue={buttonText}
        onSubmit={({ inputValue }) => buttonTextAction.update(inputValue)}
        input={{ placeholder: "Donate button text" }}
        tooltip="Click to edit button text"
        key={undoKey}
      />
    </div>
  );
};

const DonateDescription = () => {
  const {
    page: {
      supportUs: {
        donate: { description },
      },
    },
  } = UserEditableDataCx.useAllData();

  const {
    page: {
      supportUs: {
        donate: { description: descriptionAction },
      },
    },
  } = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="text-center font-normal lg:text-xl">
      <TextAreaForm
        localStateValue={description}
        onSubmit={({ inputValue }) => descriptionAction.update(inputValue)}
        textArea={{ placeholder: "Donate description", styles: "text-center" }}
        tooltip="Click to edit description"
        key={undoKey}
      />
    </div>
  );
};

const Volunteer = () => {
  return (
    <div>
      <div className="group/volunteer-image relative aspect-square">
        <VolunteerImageMenu />
        <VolunteerImage />
        <VolunteerButton />
      </div>
      <div className="mt-5 xs:mt-6 md:mt-8">
        <VolunteerDescription />
      </div>
    </div>
  );
};

const VolunteerImage = () => {
  const {
    page: {
      supportUs: { volunteer },
    },
  } = UserEditableDataCx.useAllData();

  return (
    <UserSelectedImageWrapper
      dbImageId={volunteer.image.dbConnections.imageId}
      placeholderText="volunteer image"
    >
      {({ dbImageId }) => (
        <DbImageWrapper dbImageId={dbImageId}>
          {({ urls }) => (
            <CustomisableImage
              urls={urls}
              position={volunteer.image.position}
            />
          )}
        </DbImageWrapper>
      )}
    </UserSelectedImageWrapper>
  );
};

const VolunteerImageMenu = () => {
  const {
    page: {
      supportUs: {
        volunteer: { image },
      },
    },
  } = UserEditableDataCx.useAllData();

  const {
    page: {
      supportUs: {
        volunteer: { image: imageAction },
      },
    },
  } = UserEditableDataCx.useAction();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/volunteer-image:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(newValue) => imageAction.position.x.update(newValue)}
            updateY={(newValue) => imageAction.position.y.update(newValue)}
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
          imageAction.dbConnections.imageId.update(dbImageId);
          imageAction.position.x.update(50);
          imageAction.position.y.update(50);
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
    page: {
      supportUs: {
        volunteer: { buttonText },
      },
    },
  } = UserEditableDataCx.useAllData();

  const {
    page: {
      supportUs: {
        volunteer: { buttonText: buttonTextAction },
      },
    },
  } = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="absolute bottom-0 left-0 flex cursor-pointer items-center gap-sm rounded-sm bg-brandGreen px-4 py-2 text-lg font-bold tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
      <TextInputForm
        localStateValue={buttonText}
        onSubmit={({ inputValue }) => buttonTextAction.update(inputValue)}
        input={{ placeholder: "Volunteer button text", styles: "" }}
        tooltip="Click to edit button text"
        key={undoKey}
      />
    </div>
  );
};

const VolunteerDescription = () => {
  const {
    page: {
      supportUs: {
        volunteer: { description },
      },
    },
  } = UserEditableDataCx.useAllData();

  const {
    page: {
      supportUs: {
        volunteer: { description: descriptionAction },
      },
    },
  } = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="text-center font-normal lg:text-xl">
      <TextAreaForm
        localStateValue={description}
        onSubmit={({ inputValue }) => descriptionAction.update(inputValue)}
        textArea={{
          placeholder: "Volunteer description",
          styles: "text-center",
        }}
        tooltip="Click to edit description"
        key={undoKey}
      />
    </div>
  );
};

import { type ReactElement } from "react";

import { UedCx } from "~/context/user-editable-data";

import { useToast } from "~/hooks";

import { WarningPanel } from "~/components/WarningPanel";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import ModalLayout from "~/components/layouts/Modal";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { VolunteerPositionCx } from "~/context/entities/VolunteerPositionCx";
import { CreateModal } from "./create-modal/CreateModal";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import { Icon } from "../icons";

const VolunteerPositionsModal = ({
  button,
  ...contextProps
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
} & ContextApiCxProps) => (
  <ComponentApiCx.Provider {...contextProps}>
    <Modal.WithVisibilityProvider
      button={button}
      panelContent={({ closeModal }) => (
        <ModalLayout.UserEdit
          body={<Content />}
          closeModal={closeModal}
          createEntityModal={<CreateModal />}
          title="Add volunteer position"
        />
      )}
    />
  </ComponentApiCx.Provider>
);

export default VolunteerPositionsModal;

const Content = () => {
  const {
    store: { data },
  } = UedCx.VolunteerPositions.use();

  return (
    <div>
      {!data.length ? (
        <div className="text-gray-600">No volunteer positions yet.</div>
      ) : (
        <div className="grid grid-cols-2 gap-sm">
          {data.map((volunteerPosition) => (
            <VolunteerPositionCx.Provider
              volunteerPosition={volunteerPosition}
              key={volunteerPosition.id}
            >
              <VolunteerPosition />
            </VolunteerPositionCx.Provider>
          ))}
        </div>
      )}
    </div>
  );
};

const VolunteerPosition = () => {
  const { id, name, text } = VolunteerPositionCx.use();

  const {
    store: { actions },
    revision: { undoKey },
  } = UedCx.VolunteerPositions.use();

  return (
    <div className="group/position relative">
      <PositionMenu />
      <div className={`rounded-lg border p-sm `}>
        <div className="">
          <div className="text-center font-display text-3xl text-brandOrange">
            <TextInputForm
              localStateValue={name}
              input={{
                placeholder: "Position name",
                styles: "font-bold tracking-wide text-center",
              }}
              onSubmit={(updatedValue) => actions.name({ id, updatedValue })}
              tooltip="Click to edit position name"
              key={undoKey}
            />
          </div>
          <div className="custom-prose prose mt-sm w-full max-w-full">
            <TextAreaForm
              localStateValue={text}
              textArea={{
                placeholder: "position description",
              }}
              onSubmit={(updatedValue) => actions.text({ id, updatedValue })}
              tooltip="Click to edit position description"
              key={undoKey}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PositionMenu = () => {
  const { id } = VolunteerPositionCx.use();

  const {
    store: { actions },
  } = UedCx.VolunteerPositions.use();

  const { connectPosition, connectTooltip, usedPositionIds } =
    ComponentApiCx.use();

  const toast = useToast();

  const isUsed = usedPositionIds?.includes(id);

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/position:opacity-40">
      {connectPosition && connectTooltip ? (
        <>
          <ComponentMenu.Button
            onClick={() => {
              if (isUsed) {
                return;
              }

              connectPosition(id);
            }}
            tooltip={
              !isUsed ? connectTooltip : "can't add to page - already in use"
            }
            isDisabled={isUsed}
            styles={{ button: "text-blue-400" }}
          >
            <Icon.ConnectEntity />
          </ComponentMenu.Button>

          <ComponentMenu.Divider />
        </>
      ) : null}

      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            tooltip="delete volunteer position"
            onClick={openModal}
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              actions.delete({ id });
              closeModal();
              toast.neutral("deleted volunteer position");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete volunteer position",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

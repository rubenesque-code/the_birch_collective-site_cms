import { type ReactElement } from "react";

import { UedCx } from "~/context/user-editable-data";

import { useToast } from "~/hooks";

import { WarningPanel } from "~/components/WarningPanel";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import ModalLayout from "~/components/layouts/Modal";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { CreateModal } from "./create-modal/CreateModal";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import { Icon } from "../icons";
import { CareerCx } from "~/context/entities";
import { DocLinkButtonCx } from "~/context/entities/career";

const CareersModal = ({
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
          title="Add career"
        />
      )}
    />
  </ComponentApiCx.Provider>
);

export default CareersModal;

const Content = () => {
  const {
    store: { data },
  } = UedCx.Careers.use();

  return (
    <div>
      {!data.length ? (
        <div className="text-gray-600">No careers yet.</div>
      ) : (
        <div className="grid grid-cols-2 gap-sm">
          {data.map((career) => (
            <CareerCx.Provider career={career} key={career.id}>
              <Career />
            </CareerCx.Provider>
          ))}
        </div>
      )}
    </div>
  );
};

const Career = () => {
  const { id, closingDate, description, docLinkButtons, title } =
    CareerCx.use();

  const {
    store: { actions },
    revision: { undoKey },
  } = UedCx.Careers.use();

  return (
    <div className="group/career relative">
      <CareerMenu />
      <div className={`rounded-lg border p-sm`}>
        <div className="">
          <div className="border-b border-gray-300 pb-sm">
            <div className="font-medium">
              <TextInputForm
                localStateValue={title}
                input={{
                  placeholder: "position description",
                }}
                onSubmit={(updatedValue) => actions.title({ id, updatedValue })}
                tooltip="Click to edit title"
                key={undoKey}
              />
            </div>
            <div className="mt-xs">
              <div className="flex items-center gap-xs text-gray-500">
                <span>
                  <Icon.Date />
                </span>
                <div className="flex gap-xs">
                  <span>closes, </span>
                  <span>
                    <TextInputForm
                      localStateValue={closingDate}
                      input={{
                        placeholder: "1 January 2031",
                      }}
                      onSubmit={(updatedValue) =>
                        actions.closingDate({ id, updatedValue })
                      }
                      tooltip="Click to edit closing date"
                      key={undoKey}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-sm">
            <TextAreaForm
              localStateValue={description}
              textArea={{
                placeholder: "job description",
              }}
              onSubmit={(updatedValue) =>
                actions.description({ id, updatedValue })
              }
              tooltip="Click to edit description"
              key={undoKey}
            />
          </div>

          <div className="mt-md">
            <div className="text-gray-600">Download details and forms</div>
            <div className="mt-sm flex items-center gap-md">
              {!docLinkButtons.length ? (
                <p className="text-gray-600">No doc links yet.</p>
              ) : (
                docLinkButtons.map((docLinkButton) => (
                  <DocLinkButtonCx.Provider
                    docLinkButton={docLinkButton}
                    key={docLinkButton.id}
                  >
                    <DocLinkButton />
                  </DocLinkButtonCx.Provider>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocLinkButton = () => {
  const docLinkButton = DocLinkButtonCx.use();

  const career = CareerCx.use();

  const {
    store: {
      actions: { docLinkButtons: docLinkButtonAction },
    },
    revision: { undoKey },
  } = UedCx.Careers.use();

  return (
    <div className="flex cursor-pointer items-center gap-xs rounded-sm border border-blue-400 px-sm py-xxs transition-all duration-75 ease-in-out hover:bg-gray-100">
      <span className="text-blue-400">
        <Icon.Download />
      </span>
      <span className="text-gray-600">
        <TextInputForm
          localStateValue={docLinkButton.text}
          input={{
            placeholder: "button text",
          }}
          onSubmit={(updatedValue) =>
            docLinkButtonAction.text({
              careerId: career.id,
              docLinkButtonId: docLinkButton.id,
              updatedValue,
            })
          }
          tooltip="Click to edit download link button text"
          key={undoKey}
        />
      </span>
    </div>
  );
};

const CareerMenu = () => {
  const { id } = CareerCx.use();

  const {
    store: { actions },
  } = UedCx.Careers.use();

  const {
    connectCareer: connectPosition,
    connectTooltip,
    usedCareerIds: usedPositionIds,
  } = ComponentApiCx.use();

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
            tooltip="delete job posting"
            onClick={openModal}
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              actions.delete({ id });

              closeModal();

              toast.neutral("deleted job post");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete job posting",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

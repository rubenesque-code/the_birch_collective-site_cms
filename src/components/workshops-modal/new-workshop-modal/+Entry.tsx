import { useState } from "react";

import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { WithTooltip } from "~/components/WithTooltip";

import { createInitData, NewWorkshopCx } from "./_state";

import { UedCx } from "~/context/user-editable-data";
import { useToast } from "~/hooks";

// □ refactor

const CreateModal = () => {
  const {
    store: { data: workshops },
  } = UedCx.Workshops.use();

  return (
    <NewWorkshopCx.Provider newWorkshop={{ index: workshops.length }}>
      {(newWorkshopCx) => (
        <Modal.VisibilityCx.Provider>
          {(newWorkshopModal) => (
            <Modal.VisibilityCx.Provider>
              {(warningModal) => {
                const handleCloseNewWorkshopModal = () => {
                  if (newWorkshopCx.revision.isUserEntry) {
                    warningModal.openModal();
                    return;
                  }
                  newWorkshopModal.closeModal();
                };

                return (
                  <>
                    <button
                      className={`group my-btn-create mb-sm flex items-center gap-xs rounded-md px-sm py-1.5 text-white`}
                      onClick={newWorkshopModal.openModal}
                      type="button"
                    >
                      <span className="text-sm">
                        <Icon.Create />
                      </span>
                      <span className="text-sm font-medium">Add new</span>
                    </button>

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={handleCloseNewWorkshopModal}
                      isOpen={newWorkshopModal.isOpen}
                      panelContent={
                        <NewWorkshopModalContent
                          onClose={handleCloseNewWorkshopModal}
                          closeNewWorkshopModal={newWorkshopModal.closeModal}
                        />
                      }
                    />

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={warningModal.closeModal}
                      isOpen={warningModal.isOpen}
                      panelContent={
                        <WarningPanel
                          callback={() => {
                            newWorkshopCx.actions.resetData(
                              createInitData({ index: workshops.length }),
                            );
                            newWorkshopModal.closeModal();
                            warningModal.closeModal();
                          }}
                          closeModal={warningModal.closeModal}
                          text={{
                            title: "Close workshop creation?",
                            body: "Changes made will be lost.",
                          }}
                        />
                      }
                    />
                  </>
                );
              }}
            </Modal.VisibilityCx.Provider>
          )}
        </Modal.VisibilityCx.Provider>
      )}
    </NewWorkshopCx.Provider>
  );
};

export default CreateModal;

const NewWorkshopModalContent = ({
  onClose,
  closeNewWorkshopModal,
}: {
  onClose: () => void;
  closeNewWorkshopModal: () => void;
}) => {
  const [showIncompleteErrorMessage, setShowIncompleteErrorMessage] =
    useState(false);

  const {
    store: { data: workshops, actions: workshopAction },
  } = UedCx.Workshops.use();

  const {
    data: newWorkshop,
    actions: newWorkshopAction,
    revision,
  } = NewWorkshopCx.use();

  const toast = useToast();

  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Create workshop</h3>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewWorkshop />
      </div>

      {showIncompleteErrorMessage ? (
        <div className="mt-sm w-[346px] text-sm">
          <p className="text-my-error-content">
            Can&apos;t create workshop. Requirements: title, summary.
          </p>
        </div>
      ) : null}

      <div
        className={`flex items-center justify-between ${
          showIncompleteErrorMessage ? "mt-md" : "mt-xl"
        }`}
      >
        <button
          className="my-btn my-btn-neutral"
          type="button"
          onClick={onClose}
        >
          close
        </button>
        <button
          className="my-btn my-btn-action"
          type="button"
          onClick={() => {
            if (!revision.areRequiredFields) {
              setShowIncompleteErrorMessage(true);
              setTimeout(() => {
                setShowIncompleteErrorMessage(false);
              }, 7000);
              return;
            }

            workshopAction.create({
              ...newWorkshop,
              index: workshops.length,
            });

            toast.neutral("Added workshop");

            closeNewWorkshopModal();

            setTimeout(() => {
              newWorkshopAction.resetData(
                createInitData({ index: workshops.length + 1 }),
              );
            }, 200);
          }}
        >
          create
        </button>
      </div>
    </div>
  );
};

const NewWorkshop = () => {
  const {
    data: { subtitle, summary, title, type },
    actions: newWorkshopAction,
  } = NewWorkshopCx.use();

  return (
    <div className="relative w-[700px]">
      <div className="group/workshop-image relative aspect-video w-[500px]">
        <NewWorkshopMenu />
        <UserSelectedImageWrapper
          dbImageId={summary.image.dbConnections.imageId}
          placeholderText="summary image"
        >
          {({ dbImageId }) => (
            <ConnectImage connectedImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage
                  urls={urls}
                  position={summary.image.position}
                />
              )}
            </ConnectImage>
          )}
        </UserSelectedImageWrapper>
      </div>

      <div className="mt-md">
        <div className="text-sm text-gray-500">Title</div>
        <div className="font-medium">
          <TextInputForm
            localStateValue={title}
            onSubmit={newWorkshopAction.title}
            input={{ placeholder: "Workshop title" }}
          />
        </div>
      </div>

      <div className="mt-md">
        <div className="text-sm text-gray-500">Type</div>
        <WithTooltip text="Click to change workshop type">
          <div
            className="inline-block cursor-pointer"
            onClick={() =>
              newWorkshopAction.type(type === "free" ? "paid" : "free")
            }
          >
            {type === "free" ? "Free" : "Paid"}
          </div>
        </WithTooltip>
      </div>

      <div className="mt-md">
        <div className="flex items-center gap-md text-sm text-gray-500">
          <span>Subtitle</span>
          <span className="italic text-gray-400">optional</span>
        </div>
        <div className="">
          <TextInputForm
            localStateValue={subtitle}
            onSubmit={newWorkshopAction.subtitle}
            input={{ placeholder: "Workshop subtitle" }}
          />
        </div>
      </div>

      <div className="mt-md">
        <div className="text-sm text-gray-500">Summary text</div>
        <div className="max-h-[400px] overflow-y-auto">
          <TextAreaForm
            localStateValue={summary.mainText}
            onSubmit={newWorkshopAction.summary.mainText}
            textArea={{ placeholder: "Workshop summary" }}
          />
        </div>
      </div>
    </div>
  );
};

const NewWorkshopMenu = () => {
  const {
    data: {
      summary: { image },
    },
    actions: {
      summary: { image: imageAction },
    },
  } = NewWorkshopCx.use();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/workshop-image:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(updatedValue) => imageAction.position.x(updatedValue)}
            updateY={(updatedValue) => imageAction.position.y(updatedValue)}
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

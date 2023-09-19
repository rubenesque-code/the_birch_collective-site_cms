import { useState } from "react";

import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";

import { createInitData, NewProgrammeCx } from "./_state";

import { UedCx } from "~/context/user-editable-data";
import { useToast } from "~/hooks";

// □ refactor

const CreateModal = () => {
  const {
    store: { data: programmes },
  } = UedCx.Programmes.use();

  return (
    <NewProgrammeCx.Provider newProgramme={{ index: programmes.length }}>
      {(newProgrammeCx) => (
        <Modal.VisibilityCx.Provider>
          {(newProgrammeModal) => (
            <Modal.VisibilityCx.Provider>
              {(warningModal) => {
                const handleCloseNewProgrammeModal = () => {
                  if (newProgrammeCx.isUserEntry) {
                    warningModal.openModal();
                    return;
                  }
                  newProgrammeModal.closeModal();
                };

                return (
                  <>
                    <button
                      className={`group my-btn-create mb-sm flex items-center gap-xs rounded-md px-sm py-1.5 text-white`}
                      onClick={newProgrammeModal.openModal}
                      type="button"
                    >
                      <span className="text-sm">
                        <Icon.Create />
                      </span>
                      <span className="text-sm font-medium">Add new</span>
                    </button>

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={handleCloseNewProgrammeModal}
                      isOpen={newProgrammeModal.isOpen}
                      panelContent={
                        <NewProgrammeModalContent
                          onClose={handleCloseNewProgrammeModal}
                          closeNewProgrammeModal={newProgrammeModal.closeModal}
                        />
                      }
                    />

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={warningModal.closeModal}
                      isOpen={warningModal.isOpen}
                      panelContent={
                        <WarningPanel
                          callback={() => {
                            newProgrammeCx.actions.resetData(
                              createInitData({ index: programmes.length }),
                            );
                            newProgrammeModal.closeModal();
                            warningModal.closeModal();
                          }}
                          closeModal={warningModal.closeModal}
                          text={{
                            title: "Close programme creation?",
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
    </NewProgrammeCx.Provider>
  );
};

export default CreateModal;

const NewProgrammeModalContent = ({
  onClose,
  closeNewProgrammeModal,
}: {
  onClose: () => void;
  closeNewProgrammeModal: () => void;
}) => {
  const [showIncompleteErrorMessage, setShowIncompleteErrorMessage] =
    useState(false);

  const {
    store: { data: programmes, actions: programmeAction },
  } = UedCx.Programmes.use();

  const { data: newProgramme, actions: newProgrammeAction } =
    NewProgrammeCx.use();

  const toast = useToast();

  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Create programme</h3>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewProgramme />
      </div>

      {showIncompleteErrorMessage ? (
        <div className="mt-sm w-[346px] text-sm">
          <p className="text-my-error-content">
            Can&apos;t create programme. Requirements: title, subtitle.
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
            const formIsComplete = Boolean(
              newProgramme.subtitle && newProgramme.title,
            );

            if (!formIsComplete) {
              setShowIncompleteErrorMessage(true);
              setTimeout(() => {
                setShowIncompleteErrorMessage(false);
              }, 7000);
              return;
            }

            programmeAction.create({
              ...newProgramme,
              index: programmes.length,
            });

            toast.neutral("Added programme");

            closeNewProgrammeModal();

            setTimeout(() => {
              newProgrammeAction.resetData(
                createInitData({ index: programmes.length + 1 }),
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

const NewProgramme = () => {
  const {
    data: { subtitle, summary, title },
    actions: newProgrammeAction,
  } = NewProgrammeCx.use();

  return (
    <div className="relative w-[700px]">
      <div className="group/programme-image relative aspect-video w-[500px]">
        <NewProgrammeMenu />
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
        <div className="text-sm text-gray-400">Title</div>
        <div className="font-medium">
          <TextInputForm
            localStateValue={title}
            onSubmit={newProgrammeAction.title}
            input={{ placeholder: "Programme title" }}
          />
        </div>
      </div>
      <div className="mt-md">
        <div className="text-sm text-gray-400">Subtitle</div>
        <div className="font-medium">
          <TextInputForm
            localStateValue={subtitle}
            onSubmit={newProgrammeAction.subtitle}
            input={{ placeholder: "Programme subtitle" }}
          />
        </div>
      </div>
      <div className="mt-md">
        <div className="text-sm text-gray-400">Summary</div>
        <div className="max-h-[400px] overflow-y-auto">
          <TextAreaForm
            localStateValue={summary.mainText}
            onSubmit={newProgrammeAction.summary.mainText}
            textArea={{ placeholder: "Programme summary" }}
          />
        </div>
      </div>
    </div>
  );
};

const NewProgrammeMenu = () => {
  const {
    data: {
      summary: { image },
    },
    actions: {
      summary: { image: imageAction },
    },
  } = NewProgrammeCx.use();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/programme-image:opacity-40">
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

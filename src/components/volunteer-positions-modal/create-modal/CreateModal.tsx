import { useState } from "react";

import { WarningPanel } from "~/components/WarningPanel";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { Modal } from "~/components/styled-bases";
import { UedCx } from "~/context/user-editable-data";
import { useToast } from "~/hooks";
import { NewPositionCx, createInitData } from "./_state";

// □ refactor

export const CreateModal = () => {
  return (
    <NewPositionCx.Provider>
      {(newPositionData) => (
        <Modal.VisibilityCx.Provider>
          {(newPositionModal) => (
            <Modal.VisibilityCx.Provider>
              {(warningModal) => {
                const handleCloseNewPositionModal = () => {
                  if (newPositionData.revision.isUserEntry) {
                    warningModal.openModal();
                    return;
                  }
                  newPositionModal.closeModal();
                };

                return (
                  <>
                    <button
                      className={`group my-btn-create mb-sm flex items-center gap-xs rounded-md px-sm py-1.5 text-white`}
                      onClick={newPositionModal.openModal}
                      type="button"
                    >
                      <span className="text-sm">
                        <Icon.Create />
                      </span>
                      <span className="text-sm font-medium">Create new</span>
                    </button>

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={handleCloseNewPositionModal}
                      isOpen={newPositionModal.isOpen}
                      panelContent={
                        <NewPositionModalContent
                          onClose={handleCloseNewPositionModal}
                          closeNewPositionModal={newPositionModal.closeModal}
                        />
                      }
                    />

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={warningModal.closeModal}
                      isOpen={warningModal.isOpen}
                      panelContent={
                        <WarningPanel
                          callback={() => {
                            newPositionData.actions.resetData(createInitData());
                            newPositionModal.closeModal();
                            warningModal.closeModal();
                          }}
                          closeModal={warningModal.closeModal}
                          text={{
                            title: "Close volunteer position creation?",
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
    </NewPositionCx.Provider>
  );
};

const NewPositionModalContent = ({
  onClose,
  closeNewPositionModal,
}: {
  onClose: () => void;
  closeNewPositionModal: () => void;
}) => {
  const [showIncompleteErrorMessage, setShowIncompleteErrorMessage] =
    useState(false);

  const {
    actions: newPositionAction,
    data: newPositionData,
    revision,
  } = NewPositionCx.use();

  const {
    store: { actions: volunteerPositionAction },
  } = UedCx.VolunteerPositions.use();

  const toast = useToast();

  const handleSubmitCreate = () => {
    if (!revision.areRequiredFields) {
      setShowIncompleteErrorMessage(true);

      setTimeout(() => {
        setShowIncompleteErrorMessage(false);
      }, 7000);

      return;
    }

    volunteerPositionAction.create(newPositionData);

    toast.neutral("Added volunteer position");

    closeNewPositionModal();

    setTimeout(() => {
      newPositionAction.resetData(createInitData());
    }, 200);
  };

  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Add new position</h3>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewPosition />
      </div>

      {showIncompleteErrorMessage ? (
        <div className="mt-sm w-[346px] text-sm">
          <p className="text-my-error-content">
            Can&apos;t create position. Requirements: name and description.
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
          onClick={handleSubmitCreate}
        >
          create
        </button>
      </div>
    </div>
  );
};

const NewPosition = () => {
  const {
    actions,
    data: { name, text },
  } = NewPositionCx.use();

  return (
    <div className="relative w-[500px]">
      <div className="text-sm text-gray-400">Name</div>
      <div className="font-medium">
        <TextInputForm
          localStateValue={name}
          onSubmit={actions.name}
          input={{ placeholder: "Position name" }}
        />
      </div>
      <div className="mt-md">
        <div className="text-sm text-gray-400">Description</div>
        <div className="max-h-[400px] overflow-y-auto">
          <TextAreaForm
            localStateValue={text}
            onSubmit={actions.text}
            textArea={{ placeholder: "Position description" }}
          />
        </div>
      </div>
    </div>
  );
};

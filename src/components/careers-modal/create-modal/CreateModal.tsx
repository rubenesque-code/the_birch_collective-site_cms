import { useState } from "react";

import { WarningPanel } from "~/components/WarningPanel";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { Modal } from "~/components/styled-bases";
import { UedCx } from "~/context/user-editable-data";
import { useToast } from "~/hooks";
import { NewCareerCx, createInitData } from "./_state";

export const CreateModal = () => {
  const {
    store: { data: careers },
  } = UedCx.Careers.use();

  return (
    <NewCareerCx.Provider>
      {(newCareerData) => (
        <Modal.VisibilityCx.Provider>
          {(newCareerModal) => (
            <Modal.VisibilityCx.Provider>
              {(warningModal) => {
                const handleCloseNewCareerModal = () => {
                  if (newCareerData.revision.isUserEntry) {
                    warningModal.openModal();
                    return;
                  }
                  newCareerModal.closeModal();
                };

                return (
                  <>
                    <button
                      className={`group my-btn-create mb-sm flex items-center gap-xs rounded-md px-sm py-1.5 text-white`}
                      onClick={newCareerModal.openModal}
                      type="button"
                    >
                      <span className="text-sm">
                        <Icon.Create />
                      </span>
                      <span className="text-sm font-medium">Create new</span>
                    </button>

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={handleCloseNewCareerModal}
                      isOpen={newCareerModal.isOpen}
                      panelContent={
                        <NewCareerModalContent
                          onClose={handleCloseNewCareerModal}
                          closeNewCareerModal={newCareerModal.closeModal}
                        />
                      }
                    />

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={warningModal.closeModal}
                      isOpen={warningModal.isOpen}
                      panelContent={
                        <WarningPanel
                          callback={() => {
                            newCareerData.actions.resetData(
                              createInitData({ index: careers.length }),
                            );
                            newCareerModal.closeModal();
                            warningModal.closeModal();
                          }}
                          closeModal={warningModal.closeModal}
                          text={{
                            title: "Close job post creation?",
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
    </NewCareerCx.Provider>
  );
};

const NewCareerModalContent = ({
  onClose,
  closeNewCareerModal,
}: {
  onClose: () => void;
  closeNewCareerModal: () => void;
}) => {
  const [showIncompleteErrorMessage, setShowIncompleteErrorMessage] =
    useState(false);

  const newCareer = NewCareerCx.use();

  const {
    store: { actions: careerAction, data: careers },
  } = UedCx.Careers.use();

  const toast = useToast();

  const handleSubmitCreate = () => {
    if (!newCareer.revision.areRequiredFields) {
      setShowIncompleteErrorMessage(true);

      setTimeout(() => {
        setShowIncompleteErrorMessage(false);
      }, 7000);

      return;
    }

    careerAction.create(newCareer.data);

    toast.neutral("Added job post");

    closeNewCareerModal();

    setTimeout(() => {
      newCareer.actions.resetData(createInitData({ index: careers.length }));
    }, 200);
  };

  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Create new job posting</h3>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewJobPost />
      </div>

      {showIncompleteErrorMessage ? (
        <div className="mt-sm w-[346px] text-sm">
          <p className="text-my-error-content">
            Can&apos;t create job post. Requirements: title and description.
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

const NewJobPost = () => {
  const {
    actions,
    data: { closingDate, description, title },
  } = NewCareerCx.use();

  return (
    <div className="relative w-[600px]">
      <div className="text-sm text-gray-500">Title</div>
      <div className="mt-xxxs font-medium">
        <TextInputForm
          localStateValue={title}
          onSubmit={actions.title}
          input={{ placeholder: "Job title" }}
        />
      </div>

      <div className="mt-md">
        <div className="flex items-center gap-md text-sm text-gray-500">
          <span>Closing date</span>
          <span className="italic text-gray-400">optional</span>
        </div>
        <div className="mt-xxxs font-medium">
          <TextInputForm
            localStateValue={closingDate}
            onSubmit={actions.closingDate}
            input={{ placeholder: "Closing date" }}
          />
        </div>
      </div>

      <div className="mt-md">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Description</span>
          <div className="flex items-center gap-xs text-gray-400">
            <span>
              <Icon.Info />
            </span>
            <span>A full description can be added as a downloadable link.</span>
          </div>
        </div>
        <div className="mt-xxxs max-h-[400px] overflow-y-auto">
          <TextAreaForm
            localStateValue={description}
            onSubmit={actions.description}
            textArea={{ placeholder: "Job description" }}
          />
        </div>
      </div>
    </div>
  );
};

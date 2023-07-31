import { useState } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { useToast } from "~/hooks";
import { NewSupporterCx, createInitData } from "./_state";
import { TextInputForm } from "../forms";
import { UedCx } from "~/context/user-editable-data";

// □ refactor

export const CreateModal = () => {
  const {
    store: { data: supporters },
  } = UedCx.Supporters.use();

  return (
    <NewSupporterCx.Provider newSupporter={{ index: supporters.length }}>
      {(newSupporterCx) => (
        <Modal.VisibilityCx.Provider>
          {(newSupporterModal) => (
            <Modal.VisibilityCx.Provider>
              {(warningModal) => {
                const handleCloseNewSupporterModal = () => {
                  if (newSupporterCx.isUserEntry) {
                    warningModal.openModal();
                    return;
                  }
                  newSupporterModal.closeModal();
                };

                return (
                  <>
                    <button
                      className={`group my-btn-create mb-sm flex items-center gap-xs rounded-md px-sm py-1.5 text-white`}
                      onClick={newSupporterModal.openModal}
                      type="button"
                    >
                      <span className="text-sm">
                        <Icon.Create />
                      </span>
                      <span className="text-sm font-medium">Add new</span>
                    </button>

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={handleCloseNewSupporterModal}
                      isOpen={newSupporterModal.isOpen}
                      panelContent={
                        <NewSupporterModalContent
                          onClose={handleCloseNewSupporterModal}
                          closeNewSupporterModal={newSupporterModal.closeModal}
                        />
                      }
                    />

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={warningModal.closeModal}
                      isOpen={warningModal.isOpen}
                      panelContent={
                        <WarningPanel
                          callback={() => {
                            newSupporterCx.actions.resetData(
                              createInitData({ index: supporters.length }),
                            );
                            newSupporterModal.closeModal();
                            warningModal.closeModal();
                          }}
                          closeModal={warningModal.closeModal}
                          text={{
                            title: "Close supporter creation?",
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
    </NewSupporterCx.Provider>
  );
};

const NewSupporterModalContent = ({
  onClose,
  closeNewSupporterModal,
}: {
  onClose: () => void;
  closeNewSupporterModal: () => void;
}) => {
  const [showIncompleteErrorMessage, setShowIncompleteErrorMessage] =
    useState(false);

  const {
    store: { data: supporters, actions: supportersAction },
  } = UedCx.Supporters.use();

  const { data: newSupporter, actions: newSupporterAction } =
    NewSupporterCx.use();

  const toast = useToast();

  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Add new supporter</h3>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewSupporter />
      </div>

      {showIncompleteErrorMessage ? (
        <div className="mt-sm w-[346px] text-sm">
          <p className="text-my-error-content">
            Can&apos;t create supporter. Requirements: image, title and link.
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
              newSupporter.image.dbConnections.imageId &&
                newSupporter.name.length &&
                newSupporter.url.length,
            );

            if (!formIsComplete) {
              setShowIncompleteErrorMessage(true);
              setTimeout(() => {
                setShowIncompleteErrorMessage(false);
              }, 7000);
              return;
            }

            supportersAction.create({
              ...newSupporter,
              index: supporters.length,
            });
            toast.neutral("Added supporter");
            closeNewSupporterModal();
            setTimeout(() => {
              newSupporterAction.resetData(
                createInitData({ index: supporters.length + 1 }),
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

// image + image menu as in banner image. create abstraction maybe. image position functionality.

const NewSupporter = () => {
  const { data: newSupporter, actions } = NewSupporterCx.use();

  return (
    <div className="relative max-w-[500px]">
      <div className="group/supporter-image relative aspect-video w-[300px]">
        <Menu />
        <UserSelectedImageWrapper
          dbImageId={newSupporter.image.dbConnections.imageId}
          placeholderText="supporter image"
        >
          {({ dbImageId }) => (
            <DbImageWrapper dbImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage urls={urls} objectFit="contain" />
              )}
            </DbImageWrapper>
          )}
        </UserSelectedImageWrapper>
      </div>

      <div className="mt-md">
        <div className="text-sm text-gray-400">Name</div>
        <div className="font-medium">
          <TextInputForm
            localStateValue={newSupporter.name}
            onSubmit={actions.title.update}
            input={{ placeholder: "Supporter name" }}
          />
        </div>
      </div>
      <div className="mt-md">
        <div className="text-sm text-gray-400">Link</div>
        <div className="font-medium">
          <TextInputForm
            localStateValue={newSupporter.url}
            onSubmit={actions.url.update}
            input={{ placeholder: "Supporter link" }}
          />
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const {
    actions: { image: imageAction },
  } = NewSupporterCx.use();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/supporter-image:opacity-40">
      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          imageAction.dbConnect.imageId.update(dbImageId);
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

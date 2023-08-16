import { useState } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { useToast } from "~/hooks";
import { createInitData, NewPartnerCx } from "./_state";
import { TextInputForm } from "../forms";
import { UedCx } from "~/context/user-editable-data";

export const CreateModal = () => {
  const {
    store: { data: partners },
  } = UedCx.Partners.use();

  return (
    <NewPartnerCx.Provider newPartner={{ index: partners.length }}>
      {(newPartnerCx) => (
        <Modal.VisibilityCx.Provider>
          {(newPartnerModal) => (
            <Modal.VisibilityCx.Provider>
              {(warningModal) => {
                const handleCloseNewPartnerModal = () => {
                  if (newPartnerCx.isUserEntry) {
                    warningModal.openModal();
                    return;
                  }
                  newPartnerModal.closeModal();
                };

                return (
                  <>
                    <button
                      className={`group my-btn-create mb-sm flex items-center gap-xs rounded-md px-sm py-1.5 text-white`}
                      onClick={newPartnerModal.openModal}
                      type="button"
                    >
                      <span className="text-sm">
                        <Icon.Create />
                      </span>
                      <span className="text-sm font-medium">Add new</span>
                    </button>

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={handleCloseNewPartnerModal}
                      isOpen={newPartnerModal.isOpen}
                      panelContent={
                        <NewPartnerModalContent
                          onClose={handleCloseNewPartnerModal}
                          closeNewPartnerModal={newPartnerModal.closeModal}
                        />
                      }
                    />

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={warningModal.closeModal}
                      isOpen={warningModal.isOpen}
                      panelContent={
                        <WarningPanel
                          callback={() => {
                            newPartnerCx.actions.resetData(
                              createInitData({ index: partners.length }),
                            );
                            newPartnerModal.closeModal();
                            warningModal.closeModal();
                          }}
                          closeModal={warningModal.closeModal}
                          text={{
                            title: "Close partner creation?",
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
    </NewPartnerCx.Provider>
  );
};

const NewPartnerModalContent = ({
  onClose,
  closeNewPartnerModal,
}: {
  onClose: () => void;
  closeNewPartnerModal: () => void;
}) => {
  const [showIncompleteErrorMessage, setShowIncompleteErrorMessage] =
    useState(false);

  const {
    store: { data: partners, actions: partnersAction },
  } = UedCx.Partners.use();

  const { data: newPartner, actions: newPartnerAction } = NewPartnerCx.use();

  const toast = useToast();

  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Add new partner</h3>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewPartner />
      </div>

      {showIncompleteErrorMessage ? (
        <div className="mt-sm w-[346px] text-sm">
          <p className="text-my-error-content">
            Can&apos;t create partner. Requirements: image, title and link.
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
              newPartner.image.dbConnections.imageId &&
                newPartner.name.length &&
                newPartner.url.length,
            );

            if (!formIsComplete) {
              setShowIncompleteErrorMessage(true);
              setTimeout(() => {
                setShowIncompleteErrorMessage(false);
              }, 7000);
              return;
            }

            partnersAction.create({
              ...newPartner,
              index: partners.length,
            });
            toast.neutral("Added partner");
            closeNewPartnerModal();
            setTimeout(() => {
              newPartnerAction.resetData(
                createInitData({ index: partners.length + 1 }),
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

const NewPartner = () => {
  const { data: newPartner, actions } = NewPartnerCx.use();

  return (
    <div className="relative max-w-[500px]">
      <div className="group/partner-image relative aspect-video w-[300px]">
        <Menu />
        <UserSelectedImageWrapper
          dbImageId={newPartner.image.dbConnections.imageId}
          placeholderText="partner image"
        >
          {({ dbImageId }) => (
            <ConnectImage dbImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage urls={urls} objectFit="contain" />
              )}
            </ConnectImage>
          )}
        </UserSelectedImageWrapper>
      </div>

      <div className="mt-md">
        <div className="text-sm text-gray-400">Name</div>
        <div className="font-medium">
          <TextInputForm
            localStateValue={newPartner.name}
            onSubmit={actions.title.update}
            input={{ placeholder: "Partner name" }}
          />
        </div>
      </div>
      <div className="mt-md">
        <div className="text-sm text-gray-400">Link</div>
        <div className="font-medium">
          <TextInputForm
            localStateValue={newPartner.url}
            onSubmit={actions.url.update}
            input={{ placeholder: "Partner link" }}
          />
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const {
    actions: { image: imageAction },
  } = NewPartnerCx.use();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/partner-image:opacity-40">
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

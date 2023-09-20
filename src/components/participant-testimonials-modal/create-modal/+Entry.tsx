import { useState } from "react";

import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";

import { CreateCx, createInitData } from "./_state";

import { UedCx } from "~/context/user-editable-data";
import { useToast } from "~/hooks";

const CreateModal = () => {
  const {
    store: { data: testimonials },
  } = UedCx.ParticipantTestimonials.use();

  return (
    <CreateCx.Provider newTestimonial={{ index: testimonials.length }}>
      {(createCx) => (
        <Modal.VisibilityCx.Provider>
          {(createModal) => (
            <Modal.VisibilityCx.Provider>
              {(warningModal) => {
                const handleCloseCreateModal = () => {
                  if (createCx.revision.isUserEntry) {
                    warningModal.openModal();
                    return;
                  }
                  createModal.closeModal();
                };

                return (
                  <>
                    <button
                      className={`group my-btn-create mb-sm flex items-center gap-xs rounded-md px-sm py-1.5 text-white`}
                      onClick={createModal.openModal}
                      type="button"
                    >
                      <span className="text-sm">
                        <Icon.Create />
                      </span>
                      <span className="text-sm font-medium">Add new</span>
                    </button>

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={handleCloseCreateModal}
                      isOpen={createModal.isOpen}
                      panelContent={
                        <CreateModalContent
                          onClose={handleCloseCreateModal}
                          closeCreateModal={createModal.closeModal}
                        />
                      }
                    />

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={warningModal.closeModal}
                      isOpen={warningModal.isOpen}
                      panelContent={
                        <WarningPanel
                          callback={() => {
                            createCx.actions.resetData(
                              createInitData({ index: testimonials.length }),
                            );
                            createModal.closeModal();
                            warningModal.closeModal();
                          }}
                          closeModal={warningModal.closeModal}
                          text={{
                            title: "Close testimonial creation?",
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
    </CreateCx.Provider>
  );
};

export default CreateModal;

const CreateModalContent = ({
  onClose,
  closeCreateModal,
}: {
  onClose: () => void;
  closeCreateModal: () => void;
}) => {
  const [showIncompleteErrorMessage, setShowIncompleteErrorMessage] =
    useState(false);

  const {
    store: { data: testimonials, actions: testimonialAction },
  } = UedCx.ParticipantTestimonials.use();

  const {
    data: newTestimonial,
    actions: newTestimonialAction,
    revision,
  } = CreateCx.use();

  const toast = useToast();

  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Create testimonial</h3>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewTestimonial />
      </div>

      {showIncompleteErrorMessage ? (
        <div className="mt-sm w-[346px] text-sm">
          <p className="text-my-error-content">
            Can&apos;t create testimonial. Requirements: name, title, text.
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

            testimonialAction.create({
              ...newTestimonial,
              index: testimonials.length,
            });

            toast.neutral("Added testimonial");

            closeCreateModal();

            setTimeout(() => {
              newTestimonialAction.resetData(
                createInitData({ index: testimonials.length + 1 }),
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

const NewTestimonial = () => {
  const {
    data: { endorserName, image, text },
    actions: newTestimonialAction,
  } = CreateCx.use();

  return (
    <div className="relative w-[700px]">
      <span className="italic text-gray-300">optional</span>
      <div className="group/testimonial-image relative aspect-[3/4] w-[220px]">
        <NewTestimonialMenu />

        <UserSelectedImageWrapper
          dbImageId={image.dbConnect.imageId}
          placeholderText=""
        >
          {({ dbImageId }) => (
            <ConnectImage connectedImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage urls={urls} position={image.position} />
              )}
            </ConnectImage>
          )}
        </UserSelectedImageWrapper>
      </div>

      <div className="mt-md">
        <div className="text-sm text-gray-500">Endorser name</div>
        <div className="overflow-x-auto font-medium">
          <TextInputForm
            localStateValue={endorserName}
            onSubmit={newTestimonialAction.endorserName}
            input={{ placeholder: "Name" }}
          />
        </div>
      </div>

      <div className="mt-md">
        <div className="text-sm text-gray-500">Text</div>
        <TextAreaForm
          localStateValue={text}
          onSubmit={newTestimonialAction.text}
          textArea={{ placeholder: "Text" }}
        />
      </div>
    </div>
  );
};

const NewTestimonialMenu = () => {
  const {
    data: { image },
    actions: { image: imageAction },
  } = CreateCx.use();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/testimonial-image:opacity-40">
      {image.dbConnect.imageId ? (
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
          imageAction.dbConnect.imageId(dbImageId);
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

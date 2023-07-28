import { useState } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { UserEditableDataCx } from "../../_state";
import { NewTestimonialCx, createInitData } from "./_state/NewTestimonialCx";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { WarningPanel } from "~/components/WarningPanel";
import { useToast } from "~/hooks";

export const CreateModal = () => {
  const { testimonials } = UserEditableDataCx.useAllData();

  return (
    <NewTestimonialCx.Provider newTestimonial={{ index: testimonials.length }}>
      {(newTestimonialCx) => (
        <Modal.VisibilityCx.Provider>
          {(newTestimonialModal) => (
            <Modal.VisibilityCx.Provider>
              {(warningModal) => {
                const handleCloseNewTestimonial = () => {
                  if (newTestimonialCx.isUserEntry) {
                    warningModal.openModal();
                    return;
                  }
                  newTestimonialModal.closeModal();
                };

                return (
                  <>
                    <button
                      className={`group my-btn-create mb-sm flex items-center gap-xs rounded-md px-sm py-1.5 text-white`}
                      onClick={newTestimonialModal.openModal}
                      type="button"
                    >
                      <span className="text-sm">
                        <Icon.Create />
                      </span>
                      <span className="text-sm font-medium">Add new</span>
                    </button>

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={handleCloseNewTestimonial}
                      isOpen={newTestimonialModal.isOpen}
                      panelContent={
                        <NewTestimonialModalContent
                          onClose={handleCloseNewTestimonial}
                          closeNewTestimonialModal={
                            newTestimonialModal.closeModal
                          }
                        />
                      }
                    />

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={warningModal.closeModal}
                      isOpen={warningModal.isOpen}
                      panelContent={
                        <WarningPanel
                          callback={() => {
                            newTestimonialCx.actions.resetData(
                              createInitData({ index: testimonials.length }),
                            );
                            newTestimonialModal.closeModal();
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
    </NewTestimonialCx.Provider>
  );
};

const NewTestimonialModalContent = ({
  onClose,
  closeNewTestimonialModal,
}: {
  onClose: () => void;
  closeNewTestimonialModal: () => void;
}) => {
  const [showIncompleteErrorMessage, setShowIncompleteErrorMessage] =
    useState(false);

  const { testimonials } = UserEditableDataCx.useAllData();

  const { testimonial: testimonialAction } = UserEditableDataCx.useAction();

  const newTestimonialCx = NewTestimonialCx.use();

  const toast = useToast();

  const handleCreate = () => {
    const formIsComplete = Boolean(
      newTestimonialCx.data.endorserName.length &&
        newTestimonialCx.data.image.dbConnect.imageId &&
        newTestimonialCx.data.text.length,
    );

    if (!formIsComplete) {
      setShowIncompleteErrorMessage(true);
      setTimeout(() => {
        setShowIncompleteErrorMessage(false);
      }, 7000);
      return;
    }

    testimonialAction.create({
      ...newTestimonialCx.data,
      index: testimonials.length,
    });

    toast.neutral("Added testimonial");

    closeNewTestimonialModal();

    setTimeout(() => {
      newTestimonialCx.actions.resetData(
        createInitData({ index: testimonials.length + 1 }),
      );
    }, 200);
  };

  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Add new testimonial</h3>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewTestimonial />
      </div>

      {showIncompleteErrorMessage ? (
        <div className="mt-sm w-[346px] text-sm">
          <p className="text-my-error-content">
            Can&apos;t create testimonial. Requirements: image, text and
            endorser name.
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
          onClick={handleCreate}
        >
          create
        </button>
      </div>
    </div>
  );
};

const NewTestimonial = () => {
  const newTestimonialStore = NewTestimonialCx.use();

  return (
    <div className="relative h-[465px] w-[346px]">
      <div className="group/testimonialImage absolute h-full w-full">
        <UserSelectedImageWrapper
          dbImageId={newTestimonialStore.data.image.dbConnect.imageId}
          placeholderText="background image"
        >
          {({ dbImageId }) => (
            <DbImageWrapper dbImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage
                  urls={urls}
                  position={newTestimonialStore.data.image.position}
                />
              )}
            </DbImageWrapper>
          )}
        </UserSelectedImageWrapper>
        <Menu />
      </div>
      <div className="absolute bottom-0 z-20 flex h-3/5 w-full flex-col justify-end gap-sm rounded-b-md bg-gradient-to-t from-black to-transparent p-sm text-center text-lg text-white">
        <div className="overflow-y-auto scrollbar-hide">
          <TextAreaForm
            localStateValue={newTestimonialStore.data.text}
            onSubmit={newTestimonialStore.actions.text.update}
            textArea={{ placeholder: "Testimonial text..." }}
          />
        </div>
        <div className="shrink-0 font-medium">
          <TextInputForm
            localStateValue={newTestimonialStore.data.endorserName}
            onSubmit={newTestimonialStore.actions.endorserName.update}
            input={{ placeholder: "Endorser name" }}
          />
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const {
    actions: { image: imageAction },
    data: { image },
  } = NewTestimonialCx.use();

  return (
    <div className="absolute right-1 top-1 z-20 flex items-center gap-sm rounded-md bg-white px-xs py-xxs opacity-30 shadow-lg transition-opacity duration-75 ease-in-out group-hover/testimonialImage:opacity-40 hover:!opacity-100 ">
      {image.dbConnect.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={imageAction.position.x.update}
            updateY={imageAction.position.y.update}
            styles={{ wrapper: "left-0 top-0" }}
          />

          <ComponentMenu.Divider />
        </>
      ) : null}

      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          imageAction.dbConnect.imageId.update(dbImageId);
          imageAction.position.x.update(50);
          imageAction.position.y.update(50);
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </div>
  );
};

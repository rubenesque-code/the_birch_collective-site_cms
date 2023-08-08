import { useState } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { useToast } from "~/hooks";
import { NewMemberCx, createInitData } from "./_state";
import { UedCx } from "~/context/user-editable-data";
import { TextAreaForm, TextInputForm } from "~/components/forms";

// □ refactor

export const CreateModal = () => {
  const {
    store: {
      data: {
        theTeam: { members },
      },
    },
  } = UedCx.Pages.AboutUs.use();

  return (
    <NewMemberCx.Provider newMember={{ index: members.length }}>
      {(newMemberCx) => (
        <Modal.VisibilityCx.Provider>
          {(newMemberModal) => (
            <Modal.VisibilityCx.Provider>
              {(warningModal) => {
                const handleCloseNewMemberModal = () => {
                  if (newMemberCx.isUserEntry) {
                    warningModal.openModal();
                    return;
                  }
                  newMemberModal.closeModal();
                };

                return (
                  <>
                    <button
                      className={`group my-btn-create mb-sm flex items-center gap-xs rounded-md px-sm py-1.5 text-white`}
                      onClick={newMemberModal.openModal}
                      type="button"
                    >
                      <span className="text-sm">
                        <Icon.Create />
                      </span>
                      <span className="text-sm font-medium">Add new</span>
                    </button>

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={handleCloseNewMemberModal}
                      isOpen={newMemberModal.isOpen}
                      panelContent={
                        <NewMemberModalContent
                          onClose={handleCloseNewMemberModal}
                          closeNewMemberModal={newMemberModal.closeModal}
                        />
                      }
                    />

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={warningModal.closeModal}
                      isOpen={warningModal.isOpen}
                      panelContent={
                        <WarningPanel
                          callback={() => {
                            newMemberCx.actions.resetData(
                              createInitData({ index: members.length }),
                            );
                            newMemberModal.closeModal();
                            warningModal.closeModal();
                          }}
                          closeModal={warningModal.closeModal}
                          text={{
                            title: "Close member creation?",
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
    </NewMemberCx.Provider>
  );
};

const NewMemberModalContent = ({
  onClose,
  closeNewMemberModal,
}: {
  onClose: () => void;
  closeNewMemberModal: () => void;
}) => {
  const [showIncompleteErrorMessage, setShowIncompleteErrorMessage] =
    useState(false);

  const {
    store: {
      data: {
        theTeam: { members },
      },
      actions: {
        theTeam: { members: memberAction },
      },
    },
  } = UedCx.Pages.AboutUs.use();

  const { data: newMember, actions: newMemberAction } = NewMemberCx.use();

  const toast = useToast();

  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Add new member</h3>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewMember />
      </div>

      {showIncompleteErrorMessage ? (
        <div className="mt-sm w-[346px] text-sm">
          <p className="text-my-error-content">
            Can&apos;t create member. Requirements: image, name, role, bio.
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
              newMember.image.dbConnections.imageId &&
                newMember.name.length &&
                newMember.role.length &&
                newMember.bio.length,
            );

            if (!formIsComplete) {
              setShowIncompleteErrorMessage(true);
              setTimeout(() => {
                setShowIncompleteErrorMessage(false);
              }, 7000);
              return;
            }

            memberAction.create({
              ...newMember,
              index: members.length,
            });
            toast.neutral("Added member");
            closeNewMemberModal();
            setTimeout(() => {
              newMemberAction.resetData(
                createInitData({ index: members.length + 1 }),
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

const NewMember = () => {
  const {
    data: { bio, image, name, role },
    actions,
  } = NewMemberCx.use();

  return (
    <div className="relative w-[700px]">
      <div className="group/member-image relative aspect-square w-[200px] rounded-full">
        <NewMemberMenu />
        <UserSelectedImageWrapper
          dbImageId={image.dbConnections.imageId}
          placeholderText="member image"
          isCircle
        >
          {({ dbImageId }) => (
            <DbImageWrapper dbImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage
                  urls={urls}
                  objectFit="cover"
                  position={image.position}
                  isCircle
                />
              )}
            </DbImageWrapper>
          )}
        </UserSelectedImageWrapper>
      </div>

      <div className="mt-md">
        <div className="text-sm text-gray-400">Name</div>
        <div className="font-medium">
          <TextInputForm
            localStateValue={name}
            onSubmit={actions.name}
            input={{ placeholder: "Member name" }}
          />
        </div>
      </div>
      <div className="mt-md">
        <div className="text-sm text-gray-400">Role</div>
        <div className="font-medium">
          <TextInputForm
            localStateValue={role}
            onSubmit={actions.role}
            input={{ placeholder: "Member role" }}
          />
        </div>
      </div>
      <div className="mt-md">
        <div className="text-sm text-gray-400">Bio</div>
        <div className="max-h-[400px] overflow-y-auto">
          <TextAreaForm
            localStateValue={bio}
            onSubmit={actions.bio}
            textArea={{ placeholder: "Member bio" }}
          />
        </div>
      </div>
    </div>
  );
};

const NewMemberMenu = () => {
  const {
    data: { image },
    actions: { image: imageAction },
  } = NewMemberCx.use();
  console.log("image:", image);

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/member-image:opacity-40">
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

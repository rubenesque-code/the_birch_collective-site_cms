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

// todo: need to reset on click outside?
export const CreateModal = () => {
  const { testimonials } = UserEditableDataCx.useAllData();

  return (
    <NewTestimonialCx.Provider newTestimonial={{ index: testimonials.length }}>
      {({ isUserEntry, actions }) => {
        console.log("isUserEntry:", isUserEntry);
        return (
          <Modal.VisibilityCx.Provider>
            {(newTestimonialModal) => (
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
                  onClickOutside={() => {
                    if (isUserEntry) {
                      return;
                    }
                    newTestimonialModal.closeModal();
                  }}
                  isOpen={newTestimonialModal.isOpen}
                  panelContent={
                    <Content
                      closeModal={() => {
                        actions.resetData(
                          createInitData({ index: testimonials.length }),
                        );
                        newTestimonialModal.closeModal();
                      }}
                    />
                  }
                />
              </>
            )}
          </Modal.VisibilityCx.Provider>
        );
      }}
    </NewTestimonialCx.Provider>
  );
};

const Content = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Add new testimonial</h3>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewTestimonial />
      </div>

      <div className="mt-xl flex items-center justify-between">
        <button
          className="my-btn my-btn-neutral"
          type="button"
          onClick={() => closeModal()}
        >
          close
        </button>
        <button
          className="my-btn my-btn-action"
          type="button"
          onClick={() => closeModal()}
        >
          create
        </button>
      </div>
    </div>
  );
};

// image + image menu as in banner image. create abstraction maybe. image position functionality.

const NewTestimonial = () => {
  const newTestimonialStore = NewTestimonialCx.use();

  return (
    <div className="relative aspect-[3/4] h-[465px]">
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
            onSubmit={({ inputValue }) =>
              newTestimonialStore.actions.text.update(inputValue)
            }
            input={{ placeholder: "Testimonial text..." }}
          />
        </div>
        <div className="shrink-0 font-medium">
          <TextInputForm
            localStateValue={newTestimonialStore.data.endorserName}
            onSubmit={({ inputValue }) =>
              newTestimonialStore.actions.endorserName.update(inputValue)
            }
            input={{ placeholder: "Endorser name" }}
          />
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const newTestimonialStore = NewTestimonialCx.use();

  return (
    <div className="absolute right-1 top-1 z-20 flex items-center gap-sm rounded-md bg-white px-xs py-xxs opacity-30 shadow-lg transition-opacity duration-75 ease-in-out group-hover/testimonialImage:opacity-40 hover:!opacity-100 ">
      {newTestimonialStore.data.image.dbConnect.imageId ? (
        <>
          <PositionButtons />

          <ComponentMenu.Divider />
        </>
      ) : null}
      <ComponentMenu.Image
        onUploadOrSelect={({ dbImageId }) => {
          newTestimonialStore.actions.image.dbConnect.imageId.update(dbImageId);
          newTestimonialStore.actions.image.position.x.update(50);
          newTestimonialStore.actions.image.position.y.update(50);
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </div>
  );
};

const PositionButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const newTStore = NewTestimonialCx.use();

  return (
    <div className="flex items-center gap-sm">
      {!isOpen ? (
        <ComponentMenu.Button
          onClick={() => setIsOpen(true)}
          tooltip="show position controls"
        >
          <Icon.ChangePos />
        </ComponentMenu.Button>
      ) : (
        <>
          <ComponentMenu.Button
            onClick={() => {
              if (newTStore.data.image.position.x === 0) {
                return;
              }
              const newPosition = newTStore.data.image.position.x - 10;
              newTStore.actions.image.position.x.update(newPosition);
            }}
            tooltip="move image focus to the left"
            isDisabled={newTStore.data.image.position.x === 0}
          >
            <Icon.PosLeft />
          </ComponentMenu.Button>
          <ComponentMenu.Button
            onClick={() => {
              if (newTStore.data.image.position.x === 100) {
                return;
              }
              const newPosition = newTStore.data.image.position.x + 10;
              newTStore.actions.image.position.x.update(newPosition);
            }}
            tooltip="move image focus to the right"
            isDisabled={newTStore.data.image.position.x === 100}
          >
            <Icon.PosRight />
          </ComponentMenu.Button>

          <ComponentMenu.Button
            onClick={() => {
              if (newTStore.data.image.position.y === 0) {
                return;
              }
              const newPosition = newTStore.data.image.position.y - 10;
              newTStore.actions.image.position.y.update(newPosition);
            }}
            tooltip="show higher part of the image"
            isDisabled={newTStore.data.image.position.y === 0}
          >
            <Icon.PosDown />
          </ComponentMenu.Button>
          <ComponentMenu.Button
            onClick={() => {
              if (newTStore.data.image.position.y === 100) {
                return;
              }
              const newPosition = newTStore.data.image.position.y + 10;
              newTStore.actions.image.position.y.update(newPosition);
            }}
            tooltip="show lower part of the image"
            isDisabled={newTStore.data.image.position.y === 100}
          >
            <Icon.PosUp />
          </ComponentMenu.Button>

          <ComponentMenu.Button
            onClick={() => setIsOpen(false)}
            tooltip="hide position controls"
            styles={{ button: "text-xs p-1 text-green-300" }}
          >
            <Icon.HideExpandable />
          </ComponentMenu.Button>
        </>
      )}
    </div>
  );
};

// □ ideally, don't want to show position buttons if there's an image error (unfound image) either. Would need to recomposoe image state or equivalent.

/* const Menu = ({
  testimonialId,
  isConnectedImage,
}: {
  testimonialId: string;
  isConnectedImage: boolean;
}) => {
  const userAction = UserEditableDataCx.useAction();

  return (
    <div className="absolute right-1 top-1 z-20 flex items-center gap-sm rounded-md bg-white px-xs py-xxs opacity-0 shadow-lg transition-opacity duration-75 ease-in-out group-hover/testimonialImage:opacity-40 hover:!opacity-100 ">
      {isConnectedImage ? (
        <>
          <PositionButtons testimonialId={testimonialId} />

          <ComponentMenu.Divider />
        </>
      ) : null}
      <ComponentMenu.Image
        onUploadOrSelect={({ dbImageId }) => {
          userAction.testimonial.image.dbConnect.imageId.update({
            id: testimonialId,
            newVal: dbImageId,
          });
          userAction.testimonial.image.position.x.update({
            id: testimonialId,
            newVal: 50,
          });
          userAction.testimonial.image.position.y.update({
            id: testimonialId,
            newVal: 50,
          });
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </div>
  );
};

const PositionButtons = ({ testimonialId }: { testimonialId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const userAction = UserEditableDataCx.useAction();
  const {
    bannerImage: { position },
  } = UserEditableDataCx.useData("page");

  return (
    <div className="flex items-center gap-sm">
      {!isOpen ? (
        <ComponentMenu.Button
          onClick={() => setIsOpen(true)}
          tooltip="show position controls"
        >
          <Icon.ChangePos />
        </ComponentMenu.Button>
      ) : (
        <>
          <ComponentMenu.Button
            onClick={() => {
              if (position.x === 0) {
                return;
              }
              const newPosition = position.x - 10;
              userAction.testimonial.image.position.x.update({
                id: testimonialId,
                newVal: newPosition,
              });
            }}
            tooltip="move image focus to the left"
            isDisabled={position.x === 0}
          >
            <Icon.PosLeft />
          </ComponentMenu.Button>
          <ComponentMenu.Button
            onClick={() => {
              if (position.x === 100) {
                return;
              }
              const newPosition = position.x + 10;
              userAction.testimonial.image.position.x.update({
                id: testimonialId,
                newVal: newPosition,
              });
            }}
            tooltip="move image focus to the right"
            isDisabled={position.x === 100}
          >
            <Icon.PosRight />
          </ComponentMenu.Button>

          <ComponentMenu.Button
            onClick={() => {
              if (position.y === 0) {
                return;
              }
              const newPosition = position.y - 10;
              userAction.testimonial.image.position.y.update({
                id: testimonialId,
                newVal: newPosition,
              });
            }}
            tooltip="show higher part of the image"
            isDisabled={position.y === 0}
          >
            <Icon.PosDown />
          </ComponentMenu.Button>
          <ComponentMenu.Button
            onClick={() => {
              if (position.y === 100) {
                return;
              }
              const newPosition = position.y + 10;
              userAction.testimonial.image.position.y.update({
                id: testimonialId,
                newVal: newPosition,
              });
            }}
            tooltip="show lower part of the image"
            isDisabled={position.y === 100}
          >
            <Icon.PosUp />
          </ComponentMenu.Button>

          <ComponentMenu.Button
            onClick={() => setIsOpen(false)}
            tooltip="hide position controls"
            styles={{ button: "text-xs p-1 text-blue-300" }}
          >
            <Icon.HideExpandable />
          </ComponentMenu.Button>
        </>
      )}
    </div>
  );
};
 */

import { useMemo, type ReactElement } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal, MyMenu } from "~/components/styled-bases";
import { deepSortByIndex } from "~/helpers/data/process";
import { useToast } from "~/hooks";
import { UserEditableDataCx } from "../../_state";
import { CreateModal } from "./CreateModal";
import { TestimonialCx } from "./_state";
import { DndKit } from "~/components/dnd-kit";
import { getIds } from "~/helpers/data/query";

// □ abstraction for image library modal content + below
// □ mymodal, provider, useVisibility context, etc. could be better structured
// □ how does memoisation with array as dependency work? Should calc isChange myself?
// □ ideally, don't want to show position buttons if there's an image error (unfound image) either. Would need to recomposoe image state or equivalent.
// □ should probs derive e.g. testimonial type from state used rather than db
// □ update testimonial index on delete seems to be working. Might be unreliable.

export const EditModal = ({
  button,
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
}) => {
  return (
    <Modal.VisibilityCx.Provider>
      {({ closeModal, isOpen, openModal }) => (
        <>
          {button({ openModal })}

          <Modal.OverlayAndPanelWrapper
            onClickOutside={closeModal}
            isOpen={isOpen}
            panelContent={<Content />}
          />
        </>
      )}
    </Modal.VisibilityCx.Provider>
  );
};

const Content = () => {
  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <div className="relative flex h-[1200px] max-h-[70vh] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Testimonials</h3>
      </div>
      <div className="mt-sm">
        <CreateModal />
      </div>
      <div className="mt-sm flex-grow overflow-y-auto">
        <Testimonials />
      </div>
      <div className="mt-xl">
        <button
          className="my-btn my-btn-neutral"
          type="button"
          onClick={() => closeModal()}
        >
          close
        </button>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { testimonials } = UserEditableDataCx.useAllData();

  const sorted = useMemo(() => deepSortByIndex(testimonials), [testimonials]);

  const userActions = UserEditableDataCx.useAction();

  return (
    <div>
      {!testimonials.length ? (
        <p className="">No testimonials yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-sm pr-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={userActions.testimonial.order.update}
          >
            {sorted.map((testimonial) => (
              <DndKit.Element
                elementId={testimonial.id}
                styles={{ handle: "bg-white" }}
                key={testimonial.id}
              >
                <TestimonialCx.Provider testimonial={testimonial}>
                  <Testimonial />
                </TestimonialCx.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Testimonial = () => {
  const { endorserName, image, id, text } = TestimonialCx.use();
  const action = UserEditableDataCx.useAction();

  return (
    <div className="group/testimonialImage relative aspect-[3/4]">
      <div className=" absolute h-full w-full">
        <UserSelectedImageWrapper
          dbImageId={image.dbConnect.imageId}
          placeholderText="background image"
        >
          {({ dbImageId }) => (
            <DbImageWrapper dbImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage urls={urls} position={image.position} />
              )}
            </DbImageWrapper>
          )}
        </UserSelectedImageWrapper>
        <Menu />
      </div>
      <div className="absolute bottom-0 z-20 flex h-3/5 w-full flex-col justify-end gap-sm rounded-b-md bg-gradient-to-t from-black to-transparent p-sm text-center text-lg text-white">
        <div className="overflow-y-auto scrollbar-hide">
          <TextAreaForm
            localStateValue={text}
            onSubmit={({ inputValue }) =>
              action.testimonial.text.update({ id, newVal: inputValue })
            }
            textArea={{ placeholder: "Testimonial text..." }}
          />
        </div>
        <div className="shrink-0 font-medium">
          <TextInputForm
            localStateValue={endorserName}
            onSubmit={({ inputValue }) =>
              action.testimonial.endorserName.update({
                id,
                newVal: inputValue,
              })
            }
            input={{ placeholder: "Endorser name" }}
          />
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const { image, id, index } = TestimonialCx.use();
  const userAction = UserEditableDataCx.useAction();

  const toast = useToast();

  return (
    <ComponentMenu styles="left-1 top-1 group-hover/testimonialImage:opacity-60">
      {image.dbConnect.imageId ? (
        <>
          <PositionButtonsMenu />

          <ComponentMenu.Divider />
        </>
      ) : null}
      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          userAction.testimonial.image.dbConnect.imageId.update({
            id,
            newVal: dbImageId,
          });
          userAction.testimonial.image.position.x.update({
            id,
            newVal: 50,
          });
          userAction.testimonial.image.position.y.update({
            id,
            newVal: 50,
          });
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />

      <ComponentMenu.Divider />
      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            onClick={openModal}
            tooltip="delete testimonial"
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              userAction.testimonial.delete({ id, index });
              closeModal();
              toast.neutral("deleted testimonial");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete testimonial",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

const PositionButtonsMenu = () => {
  const {
    image: { position },
    id,
  } = TestimonialCx.use();
  const userAction = UserEditableDataCx.useAction();

  return (
    <MyMenu
      button={
        <ComponentMenu.Button tooltip="show position controls">
          <Icon.ChangePos />
        </ComponentMenu.Button>
      }
      styles={{
        itemsWrapper: "left-0 top-0",
      }}
    >
      {({ close: closeMenu }) => (
        <>
          <ComponentMenu styles="opacity-100">
            <ComponentMenu.Button
              onClick={() => {
                if (position.x === 0) {
                  return;
                }
                const newPosition = position.x - 10;
                userAction.testimonial.image.position.x.update({
                  id,
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
                  id,
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
                  id,
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
                  id,
                  newVal: newPosition,
                });
              }}
              tooltip="show lower part of the image"
              isDisabled={position.y === 100}
            >
              <Icon.PosUp />
            </ComponentMenu.Button>

            <ComponentMenu.Divider />

            <ComponentMenu.Button
              onClick={closeMenu}
              tooltip="close position controls"
              styles={{ button: "text-gray-600" }}
            >
              <Icon.HideExpandable />
            </ComponentMenu.Button>
          </ComponentMenu>
        </>
      )}
    </MyMenu>
  );
};

// change order. Edit each slide. create new. delete.

import { Modal } from "~/components/styled-bases";
import { UserEditableDataCx } from "../../_state";
import { useState, type ReactElement, useMemo } from "react";
import { CreateModal } from "./CreateModal";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { ComponentMenu } from "~/components/menus";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { CustomisableImage } from "~/components/CustomisableImage";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import type { MyDb } from "~/types/database";
import { deepSortByIndex } from "~/helpers/data/process";
import { RevisionContext } from "../../_state/RevisionContext";
import { WarningPanel } from "~/components/WarningPanel";
import { useToast } from "~/hooks";

// □ abstraction for image library modal content + below
// □ mymodal, provider, useVisibility context, etc. could be better structured
// □ how does memoisation with array as dependency work? Should calc isChange myself?
// □ ideally, don't want to show position buttons if there's an image error (unfound image) either. Would need to recomposoe image state or equivalent.
// □ should probs derive e.g. testimonial type from state used rather than db

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
            panelContent={<Content closeModal={closeModal} />}
          />
        </>
      )}
    </Modal.VisibilityCx.Provider>
  );
};

const Content = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="relative flex h-[700px] max-h-[70vh] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
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

  const {
    data: { isTestimonialsChange },
  } = RevisionContext.use();

  const sorted = useMemo(
    () => deepSortByIndex(testimonials),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isTestimonialsChange],
  );

  return (
    <div>
      {!testimonials.length ? (
        <p className="">No testimonials yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-sm pr-sm">
          {sorted.map((testimonial) => (
            <div key={testimonial.id}>
              {testimonial.text.length ? (
                <Testimonial testimonial={testimonial} />
              ) : (
                "no text yet"
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Testimonial = ({
  testimonial: { image, endorserName, id, text },
}: {
  testimonial: MyDb["testimonial"];
}) => {
  const userAction = UserEditableDataCx.useAction();

  return (
    <div className="relative aspect-[3/4]">
      <div className="group/testimonialImage absolute h-full w-full">
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
        <Menu connectedImageId={image.dbConnect.imageId} testimonialId={id} />
      </div>
      <div className="absolute bottom-0 z-20 flex h-3/5 w-full flex-col justify-end gap-sm rounded-b-md bg-gradient-to-t from-black to-transparent p-sm text-center text-lg text-white">
        <div className="overflow-y-auto scrollbar-hide">
          <TextAreaForm
            localStateValue={text}
            onSubmit={({ inputValue }) =>
              userAction.testimonial.text.update({ id, newVal: inputValue })
            }
            input={{ placeholder: "Testimonial text..." }}
          />
        </div>
        <div className="shrink-0 font-medium">
          <TextInputForm
            localStateValue={endorserName}
            onSubmit={({ inputValue }) =>
              userAction.testimonial.endorserName.update({
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

const Menu = ({
  testimonialId,
  connectedImageId,
}: {
  testimonialId: string;
  connectedImageId: string | null;
}) => {
  const userAction = UserEditableDataCx.useAction();

  const toast = useToast();

  return (
    <div className="absolute right-1 top-1 z-20 flex items-center gap-sm rounded-md bg-white px-xs py-xxs opacity-0 shadow-lg transition-opacity duration-75 ease-in-out group-hover/testimonialImage:opacity-40 hover:!opacity-100 ">
      {connectedImageId ? (
        <>
          <PositionButtons testimonialId={testimonialId} />

          <ComponentMenu.Divider />
        </>
      ) : null}
      <ComponentMenu.ImageModal
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
              userAction.testimonial.delete({ id: testimonialId });
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

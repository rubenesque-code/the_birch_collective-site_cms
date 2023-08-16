import { useMemo, type ReactElement } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";
import { CreateModal } from "./CreateModal";
import ModalLayout from "~/components/layouts/Modal";
import { UedCx } from "~/context/user-editable-data";
import { ParticipantTestimonialCx } from "~/context/entities";

export const EditModal = ({
  button,
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
}) => (
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

const Content = () => {
  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <ModalLayout.UserEdit
      body={<Testimonials />}
      closeModal={closeModal}
      title="Testimonials"
      createEntityModal={<CreateModal />}
    />
  );
};

const Testimonials = () => {
  const {
    store: { data: testimonials, actions },
  } = UedCx.ParticipantTestimonials.use();

  const sorted = useMemo(() => deepSortByIndex(testimonials), [testimonials]);

  return (
    <div>
      {!testimonials.length ? (
        <p className="">No testimonials yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-sm pr-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={actions.reorder}
          >
            {sorted.map((testimonial) => (
              <DndKit.Element
                elementId={testimonial.id}
                styles={{ handle: "bg-white" }}
                key={testimonial.id}
              >
                <ParticipantTestimonialCx.Provider testimonial={testimonial}>
                  <Testimonial />
                </ParticipantTestimonialCx.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Testimonial = () => {
  const { endorserName, image, id, text } = ParticipantTestimonialCx.use();

  const {
    store: { actions },
  } = UedCx.ParticipantTestimonials.use();

  return (
    <div className="group/testimonialImage relative aspect-[3/4]">
      <div className=" absolute h-full w-full">
        <UserSelectedImageWrapper
          dbImageId={image.dbConnect.imageId}
          placeholderText="background image"
        >
          {({ dbImageId }) => (
            <ConnectImage dbImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage urls={urls} position={image.position} />
              )}
            </ConnectImage>
          )}
        </UserSelectedImageWrapper>
        <Menu />
      </div>
      <div className="absolute bottom-0 z-20 flex h-3/5 w-full flex-col items-center justify-end gap-sm rounded-b-md bg-gradient-to-t from-black to-transparent p-sm text-center text-lg text-white">
        <div className="w-full overflow-y-auto p-xs scrollbar-hide">
          <TextAreaForm
            localStateValue={text}
            onSubmit={(inputValue) => actions.text({ id, newVal: inputValue })}
            textArea={{
              placeholder: "Testimonial text...",
              styles: "text-center",
            }}
          />
        </div>
        <div className="max-w-[90%] shrink-0 overflow-x-auto font-medium">
          <TextInputForm
            localStateValue={endorserName}
            onSubmit={(inputValue) =>
              actions.endorserName({
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
  const { image, id } = ParticipantTestimonialCx.use();

  const {
    store: { actions },
  } = UedCx.ParticipantTestimonials.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="left-1 top-1 group-hover/testimonialImage:opacity-60">
      {image.dbConnect.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(newVal) => actions.image.position.x({ id, newVal })}
            updateY={(newVal) => actions.image.position.y({ id, newVal })}
            styles={{ wrapper: "left-0 top-0" }}
          />

          <ComponentMenu.Divider />
        </>
      ) : null}
      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          actions.image.dbConnections.imageId({
            id,
            newVal: dbImageId,
          });

          actions.image.position.x({
            id,
            newVal: 50,
          });

          actions.image.position.y({
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
              actions.delete({ id });

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

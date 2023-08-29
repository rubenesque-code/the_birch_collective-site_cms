import React, { type ReactElement } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import ModalLayout from "~/components/layouts/Modal";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";

import CreateModal from "./create-modal/+Entry";

import { ParticipantTestimonialCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";

const ParticipantTestimonialsModal = ({
  button,
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
}) => (
  <Modal.WithVisibilityProvider
    button={button}
    panelContent={({ closeModal }) => (
      <ModalLayout.UserEdit
        body={<Testimonials />}
        closeModal={closeModal}
        createEntityModal={<CreateModal />}
        header={
          <ModalLayout.UserEdit.Header>
            <ModalLayout.UserEdit.Header.Title>
              Edit participant testimonials
            </ModalLayout.UserEdit.Header.Title>
          </ModalLayout.UserEdit.Header>
        }
      />
    )}
  />
);

export default ParticipantTestimonialsModal;

const Testimonials = () => {
  const {
    store: { data: testimonials, actions },
  } = UedCx.ParticipantTestimonials.use();

  const sorted = React.useMemo(
    () => deepSortByIndex(testimonials),
    [testimonials],
  );

  const toast = useToast();

  return (
    <div className="mt-md">
      {!testimonials.length ? (
        <div className="text-gray-600">No testimonials yet.</div>
      ) : (
        <div className="grid grid-cols-2 gap-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={(input) => {
              actions.reorder(input);

              toast.neutral("reordered");
            }}
          >
            {sorted.map((testimonial) => (
              <DndKit.Element elementId={testimonial.id} key={testimonial.id}>
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
    <div className="group/testimonial relative">
      <TestimonialMenu />
      <div className={`rounded-lg border p-sm`}>
        <div className="relative aspect-[3/4] w-[160px]">
          <UserSelectedImageWrapper
            dbImageId={image.dbConnect.imageId}
            placeholderText="image"
          >
            {({ dbImageId }) => (
              <ConnectImage dbImageId={dbImageId}>
                {({ urls }) => (
                  <CustomisableImage urls={urls} position={image.position} />
                )}
              </ConnectImage>
            )}
          </UserSelectedImageWrapper>
        </div>

        <div className="mt-md">
          <div className="text-sm text-gray-400">Endorser name</div>
          <div className="max-w-full overflow-x-auto ">
            <TextInputForm
              localStateValue={endorserName}
              onSubmit={(inputValue) =>
                actions.endorserName({ id, newVal: inputValue })
              }
              input={{ placeholder: "Endorser name" }}
              tooltip="Click to edit endorser name"
            />
          </div>
        </div>

        <div className="mt-md">
          <div className="text-sm text-gray-400">Text</div>
          <div className="max-w-full overflow-x-auto">
            <TextAreaForm
              localStateValue={text}
              onSubmit={(inputValue) =>
                actions.text({ id, newVal: inputValue })
              }
              textArea={{
                placeholder: "",
              }}
              tooltip="Click to edit endorsement text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialMenu = () => {
  const { id, image } = ParticipantTestimonialCx.use();

  const {
    store: { actions },
  } = UedCx.ParticipantTestimonials.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/testimonial:opacity-40">
      {image.dbConnect.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(newVal) => actions.image.position.x({ id, newVal })}
            updateY={(newVal) => actions.image.position.y({ id, newVal })}
            styles={{ wrapper: "right-0 top-0", menuItemsWrapper: "right-0" }}
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
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />

      <ComponentMenu.Divider />

      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            tooltip="delete testimonial"
            onClick={openModal}
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

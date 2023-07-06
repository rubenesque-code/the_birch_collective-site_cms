// change order. Edit each slide. create new. delete.

import { Modal } from "~/components/styled-bases";
import { UserEditableDataCx } from "../../_state";
import type { ReactElement } from "react";
import { CreateModal } from "./CreateModal";

// □ abstraction for image library modal content + below
// □ mymodal, provider, useVisibility context, etc. could be better structured

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
  return (
    <div>
      {!testimonials.length ? (
        <p className="">No testimonials yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id}>
              {testimonial.text.length ? testimonial.text : "no text yet"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

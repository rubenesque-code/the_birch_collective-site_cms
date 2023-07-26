import type { ReactElement } from "react";

function ModalLayout() {
  throw new Error(
    "ModalLayout exists for naming purposes only and should not be used as a component",
  );
}

export default ModalLayout;

const UserEdit = ({
  createEntityModal,
  body,
  title,
  closeModal,
  styles,
}: {
  createEntityModal?: ReactElement;
  body: ReactElement;
  title: string;
  closeModal: () => void;
  styles?: {
    outerWrapper?: string;
  };
}) => (
  <div
    className={`relative flex h-[1200px] max-h-[70vh] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl ${
      styles?.outerWrapper || ""
    }`}
  >
    <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
      <h3 className="leading-6">{title}</h3>
    </div>
    {createEntityModal ? (
      <div className="mt-sm">{createEntityModal}</div>
    ) : null}
    <div className="mt-sm flex-grow overflow-y-auto">{body}</div>
    <div className="mt-xl">
      <button
        className="my-btn my-btn-neutral"
        type="button"
        onClick={closeModal}
      >
        close
      </button>
    </div>
  </div>
);

ModalLayout.UserEdit = UserEdit;

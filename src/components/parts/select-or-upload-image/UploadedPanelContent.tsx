export const UploadedPanelContent = ({
  closeModal,
}: {
  closeModal: () => void;
}) => (
  <div className="relative flex h-[700px] max-h-[70vh] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
    <h3 className="border-b-base-300 pb-sm text-base-content border-b leading-6">
      Uploaded Images
    </h3>
    <div className="mt-md flex-grow overflow-y-auto">
      <Images />
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

const Images = () => {
  return <div>Images</div>;
};

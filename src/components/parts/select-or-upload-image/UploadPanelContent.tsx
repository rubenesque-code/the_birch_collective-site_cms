export const UploadPanelContent = (props: { closeModal: () => void }) => (
  <div className="relative w-[600px] max-w-[90vw] rounded-2xl bg-white p-6 text-left shadow-xl">
    <h3 className="border-b-base-300 pb-sm text-base-content border-b leading-6">
      Upload Image
    </h3>
    <div className="mt-md">
      <button onClick={props.closeModal}>Close</button>
    </div>
  </div>
);

import { Icon } from "./icons";

const UnsavedWarningPanel = ({
  callback,
  closeModal,
}: {
  callback: () => void;
  closeModal: () => void;
}) => (
  <div
    id="alert-additional-content-4"
    className="min-w-[300px] max-w-xl rounded-xl border-4 border-gray-100 bg-white p-xl shadow-xl"
    role="alert"
  >
    <div className="flex items-center gap-xs">
      <span className="text-lg text-my-alert-content">
        <Icon.Info />
      </span>
      <span className="sr-only">Info</span>
      <h3 className="text-lg font-medium text-gray-600">
        There are unsaved changes
      </h3>
    </div>
    <div className="mt-sm text-left text-gray-600">
      <p>These will be lost if you leave the page.</p>
    </div>
    <div className="mt-lg flex items-center justify-between">
      <button
        type="button"
        className="my-btn my-btn-neutral"
        onClick={closeModal}
      >
        Cancel
      </button>
      <button
        type="button"
        className={`my-btn my-btn-action`}
        data-dismiss-target="#alert-additional-content-4"
        onClick={callback}
      >
        Continue
      </button>
    </div>
  </div>
);

export default UnsavedWarningPanel;

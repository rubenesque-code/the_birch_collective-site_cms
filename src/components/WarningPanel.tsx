import { Icon } from "./icons";

export type Props = {
  closeModal: () => void;
  callback: () => void;
  text: { title: string; body: string };
};

export const WarningPanel = ({ callback, closeModal, text }: Props) => (
  <div
    id="alert-additional-content-4"
    className="min-w-[300px] max-w-xl rounded-lg border border-my-alert-content bg-white p-4 text-my-alert-content shadow-lg"
    role="alert"
  >
    <div className="flex items-center gap-xxs">
      <span className="text-lg">
        <Icon.Info weight="fill" />
      </span>
      <span className="sr-only">Info</span>
      <h3 className="text-lg font-medium">{text.title}</h3>
    </div>
    <div className="text-base-content mb-4 mt-2 text-left text-sm">
      {text.body}
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
        Confirm
      </button>
    </div>
  </div>
);

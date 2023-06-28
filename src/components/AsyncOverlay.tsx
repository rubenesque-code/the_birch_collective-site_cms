import { Spinner } from "./Spinner";
import { Icon } from "./icons";

export const AsyncOverlay = ({
  closeButton,
  status,
}: {
  closeButton: { onClick: () => void };
  status: "idle" | "loading" | "error" | "success";
}) => {
  if (status === "idle") {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-10 grid h-full w-full place-items-center rounded-2xl bg-white bg-opacity-70">
      <div className="flex items-center gap-sm">
        {status === "loading" ? (
          <>
            <Spinner />
            <p className="">Uploading image...</p>
          </>
        ) : status === "success" ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-sm">
              <span className="">
                <Icon.Success />
              </span>
              <p className="">Upload success</p>
            </div>
            <div className="mt-md">
              <button
                className="my-btn my-btn-neutral bg-white text-gray-700 hover:!text-gray-800"
                onClick={closeButton.onClick}
                type="button"
              >
                Ok
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="text-my-error-content">
              <Icon.Error />
            </span>
            <p className="">Upload error</p>
          </>
        )}
      </div>
    </div>
  );
};

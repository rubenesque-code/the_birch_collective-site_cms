import { Icon } from "./icons";

export const Toast = ({
  text,
  type,
}: {
  text: string;
  type: "error" | "success" | "alert" | "info";
}) => (
  <div className="flex w-full max-w-xs items-center text-gray-500" role="alert">
    <div
      className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
        type === "alert"
          ? "bg-my-alert text-my-alert-content"
          : type === "error"
          ? "bg-my-error text-my-error-content"
          : type === "success"
          ? "bg-my-success text-my-success-content"
          : "bg-blue-100 text-blue-500"
      }`}
    >
      {type === "error" ? (
        <Icon.Error />
      ) : type === "success" ? (
        <Icon.Success />
      ) : type === "alert" ? (
        <Icon.Alert />
      ) : (
        <Icon.Info />
      )}
    </div>
    <div className="ml-3 text-sm font-normal">{text}</div>
  </div>
);

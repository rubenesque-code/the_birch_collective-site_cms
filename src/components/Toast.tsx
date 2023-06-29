import { Icon } from "./icons";

export const Toast = ({
  text,
  type,
}: {
  text: string;
  type: "neutral" | "error" | "success" | "alert" | "info";
}) => (
  <div className="flex w-full max-w-xs items-center text-gray-500" role="alert">
    {type !== "neutral" ? (
      <div
        className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg `}
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
    ) : null}
    <div className="ml-3 text-sm font-normal">{text}</div>
  </div>
);

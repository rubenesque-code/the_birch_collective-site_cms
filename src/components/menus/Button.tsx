import type { ReactNode } from "react";
import { WithTooltip } from "../WithTooltip";
import { Icon } from "../icons";
import type { MyPick } from "~/types/utilities";

type MyButtonProps = {
  onClick: () => void;
  children: ReactNode;
  styles?: {
    button?: string;
  };
  tooltip: string;
};

const MyButton = ({ children, onClick, styles, tooltip }: MyButtonProps) => (
  <WithTooltip text={tooltip} yOffset={15}>
    <button
      className={`rounded-md px-2 py-2 text-sm transition-all duration-75 ease-in-out ${
        styles?.button || ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  </WithTooltip>
);

const DeleteButton = (props: MyPick<MyButtonProps, "onClick" | "styles">) => (
  <MyButton {...props} tooltip="" styles={{ button: "hover:bg-my-alert" }}>
    <span className="text-my-alert-content">
      <Icon.Delete />
    </span>
  </MyButton>
);

function Button() {
  throw new Error(
    "Button exists for naming purposes only and should not be used as a component",
  );
}

export { Button };

Button.Delete = DeleteButton;

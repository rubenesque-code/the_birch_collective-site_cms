import type { ReactNode } from "react";
import { WithTooltip } from "../../WithTooltip";
import { Icon } from "../../icons";
import type { MyPick } from "~/types/utilities";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  styles?: {
    button?: string;
  };
  tooltip: string;
  isDisabled?: boolean;
};

const Button = ({
  children,
  onClick,
  styles,
  tooltip,
  isDisabled,
}: ButtonProps) => (
  <WithTooltip text={tooltip} yOffset={15}>
    <button
      className={`rounded-full p-2 text-sm transition-all duration-75 ease-in-out hover:bg-gray-100 active:bg-white ${
        isDisabled ? "cursor-auto opacity-40" : ""
      } ${styles?.button || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  </WithTooltip>
);

const DeleteButton = (props: MyPick<ButtonProps, "onClick" | "styles">) => (
  <Button {...props} tooltip="" styles={{ button: "hover:bg-my-alert" }}>
    <span className="text-my-alert-content">
      <Icon.Delete />
    </span>
  </Button>
);

const ImageButton = () => (
  <Button tooltip="Update image">
    <Icon.Image />
  </Button>
);

/* function Button() {
   throw new Error(
    "Button exists for naming purposes only and should not be used as a component",
  ); 
  
} */

export { Button };

Button.Image = ImageButton;
Button.Delete = DeleteButton;

import type { ReactNode } from "react";

import { Icon } from "../../icons";
import { WithTooltip } from "../../WithTooltip";

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
    <div
      className={`rounded-full p-2 text-sm transition-all duration-75 ease-in-out hover:bg-gray-100 active:bg-white ${
        isDisabled ? "cursor-auto opacity-40" : "cursor-pointer"
      } ${styles?.button || ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  </WithTooltip>
);

export { Button };

const DeleteButton = ({
  styles,
  ...props
}: { styles?: { outer?: string; inner?: string } } & MyPick<
  ButtonProps,
  "onClick" | "tooltip"
>) => (
  <Button
    {...props}
    styles={{ button: `hover:bg-my-alert ${styles?.outer || ""}` }}
  >
    <span className={`text-my-alert-content ${styles?.inner || ""}`}>
      <Icon.Delete />
    </span>
  </Button>
);

const ImageButton = () => (
  <Button tooltip="Update image">
    <Icon.Image />
  </Button>
);

Button.Image = ImageButton;
Button.Delete = DeleteButton;

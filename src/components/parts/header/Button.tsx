import type { ReactElement, ReactNode } from "react";
import { WithTooltip } from "~/components/WithTooltip";
import { ComponentApiCx } from "./_state";

export const Button = ({
  children,
  ...input
}: {
  tooltip: (isChange: boolean) => string;
  onClick: () => void;
  icon: ReactElement;
  children?: ReactNode;
}) => {
  const {
    data: { isChange },
  } = ComponentApiCx.use();

  return (
    <WithTooltip text={input.tooltip(isChange)}>
      <button
        className={`relative rounded-full p-1 text-2xl transition-all ease-in-out hover:bg-gray-100 ${
          !isChange
            ? "cursor-auto text-gray-200 hover:text-gray-300"
            : "cursor-pointer text-gray-500 hover:text-gray-600"
        }`}
        onClick={input.onClick}
        type="button"
      >
        {input.icon}
        {children}
      </button>
    </WithTooltip>
  );
};

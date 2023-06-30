import { WithTooltip } from "~/components/WithTooltip";
import { SaveContext } from "./_state";
import { Icon } from "~/components/icons";
import type { ReactElement, ReactNode } from "react";

export const Revision = () => {
  const {
    actions: { save, undo },
    data: { isChange },
  } = SaveContext.use();

  return (
    <div className="flex items-center gap-md">
      <Button
        icon={<Icon.Undo weight="light" />}
        onClick={undo}
        tooltip={(isChange) =>
          isChange ? "undo all changes since last save" : "nothing to undo"
        }
      />
      <Button
        icon={<Icon.Save weight="light" />}
        onClick={save}
        tooltip={(isChange) => (isChange ? "save" : "nothing to save")}
      >
        <span
          className={`absolute left-[2.5px] top-[2.5px] h-[8px] w-[8px] rounded-full bg-green-active transition-opacity ease-in-out ${
            !isChange ? "opacity-0" : "opacity-100"
          }`}
        />
      </Button>
    </div>
  );
};

const Button = ({
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
  } = SaveContext.use();

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

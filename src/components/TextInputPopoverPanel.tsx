import type { ReactElement } from "react";

import { Icon } from "./icons";

const TextInputPopoverPanel = ({
  input,
  title,
}: {
  input: ReactElement;
  title: string;
}) => {
  return (
    <div className="min-w-[450px] rounded-xl bg-white p-lg pr-lg shadow-lg">
      <div className="whitespace-nowrap  text-blue-300">{title}</div>
      <div className="mt-sm overflow-x-auto rounded-sm border border-gray-200 px-xs py-xxs pr-md">
        {input}
      </div>
      <div className="mt-sm flex items-center justify-end gap-xs text-sm text-gray-300">
        <Icon.Info />
        <span>Click outside when done</span>
      </div>
    </div>
  );
};

export default TextInputPopoverPanel;

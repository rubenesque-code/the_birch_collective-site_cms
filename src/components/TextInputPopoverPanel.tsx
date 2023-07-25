import type { ReactElement } from "react";

const TextInputPopoverPanel = ({
  input,
  title,
}: {
  input: ReactElement;
  title: string;
}) => {
  return (
    <div className="rounded-xl bg-white p-md pr-lg shadow-lg">
      <div className="mb-xxs whitespace-nowrap text-sm text-gray-400">
        {title}
      </div>
      <div className="rounded-sm border border-gray-200 px-xs py-xxs pr-md">
        {input}
      </div>
    </div>
  );
};

export default TextInputPopoverPanel;

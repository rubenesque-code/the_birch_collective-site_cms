import type { ReactElement, ReactNode } from "react";

import { ComponentApiCx } from "./_state";

import { WarningPanel } from "~/components/WarningPanel";
import { WithTooltip } from "~/components/WithTooltip";
import { Icon } from "~/components/icons";
import { Modal } from "~/components/styled-bases";

export const RevisionButtons = () => (
  <div className="flex items-center gap-md">
    <Undo />
    <Save />
  </div>
);

const Button = ({
  children,
  ...input
}: {
  tooltip: string;
  onClick: () => void;
  icon: ReactElement;
  children?: ReactNode;
}) => {
  const {
    data: { isChange },
  } = ComponentApiCx.use();

  return (
    <WithTooltip text={input.tooltip}>
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

const Undo = () => {
  const {
    actions: { undo },
    data: { isChange },
  } = ComponentApiCx.use();

  return (
    <Modal.WithVisibilityProvider
      button={({ openModal }) => (
        <Button
          icon={<Icon.Undo weight="light" />}
          onClick={() => isChange && openModal()}
          tooltip={isChange ? "undo changes" : "nothing to undo"}
        />
      )}
      panelContent={({ closeModal }) => (
        <WarningPanel
          callback={() => {
            undo();
            closeModal();
          }}
          closeModal={closeModal}
          text={{
            body: "Are you sure? This can't be undone.",
            title: "Undo changes since last save",
          }}
        />
      )}
    />
  );
};

const Save = () => {
  const {
    actions: { save },
    data: { isChange },
  } = ComponentApiCx.use();

  return (
    <Button
      icon={<Icon.Save weight="light" />}
      onClick={save}
      tooltip={isChange ? "save changes" : "nothing to save"}
    >
      <span
        className={`absolute left-[2.5px] top-[2.5px] h-[8px] w-[8px] rounded-full bg-green-active transition-opacity ease-in-out ${
          !isChange ? "opacity-0" : "opacity-100"
        }`}
      />
    </Button>
  );
};

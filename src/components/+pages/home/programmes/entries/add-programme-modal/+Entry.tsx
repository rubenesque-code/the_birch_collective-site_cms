import React, { type ReactElement } from "react";

import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import ModalLayout from "~/components/layouts/Modal";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { ProgrammeCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import { WithTooltip } from "~/components/WithTooltip";

// todo: editable. dnd

const AddProgrammeModal = ({
  button,
  ...contextProps
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
} & ContextApiCxProps) => (
  <ComponentApiCx.Provider {...contextProps}>
    <Modal.WithVisibilityProvider button={button} panelContent={<Content />} />
  </ComponentApiCx.Provider>
);

export default AddProgrammeModal;

const Content = () => {
  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <ModalLayout.UserEdit
      body={<Programmes />}
      closeModal={closeModal}
      header={
        <ModalLayout.UserEdit.Header>
          <ModalLayout.UserEdit.Header.Title>
            Add programme
          </ModalLayout.UserEdit.Header.Title>
          <ModalLayout.UserEdit.Header.Info>
            Create, delete and edit in depth on the programmes page.
          </ModalLayout.UserEdit.Header.Info>
        </ModalLayout.UserEdit.Header>
      }
    />
  );
};

const Programmes = () => {
  const programmes = UedCx.Programmes.useData();

  const { reorder } = UedCx.Programmes.useAction();

  const sorted = React.useMemo(() => deepSortByIndex(programmes), [programmes]);

  const { usedProgrammeIds } = ComponentApiCx.use();

  return (
    <div>
      {!programmes.length ? (
        <div className="text-gray-600">No programmes yet.</div>
      ) : (
        <div className="grid grid-cols-3 gap-sm">
          <DndKit.Context elementIds={getIds(sorted)} onReorder={reorder}>
            {sorted.map((programme) => (
              <DndKit.Element elementId={programme.id} key={programme.id}>
                <ProgrammeCx.Provider programme={programme}>
                  <ProgrammeSummary
                    isUsed={usedProgrammeIds.includes(programme.id)}
                  />
                </ProgrammeCx.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const ProgrammeSummary = ({ isUsed }: { isUsed: boolean }) => {
  const { id, subtitle, summary, title } = ProgrammeCx.use();

  const programmeAction = UedCx.Programmes.useAction();

  const { connectProgramme, connectTooltip } = ComponentApiCx.use();

  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <div className="group/programme relative flex flex-col items-center p-sm">
      <div className="w-full text-center font-display text-3xl text-brandLightOrange">
        <TextInputForm
          localStateValue={title}
          onSubmit={(inputValue) =>
            programmeAction.title({ id, newVal: inputValue })
          }
          input={{
            placeholder: "Title",
            styles: "tracking-wider text-center font-bold",
          }}
          tooltip="Click to edit title"
        />
      </div>
      <div className="mt-xs max-w-full overflow-x-auto text-display xs:text-lg lg:text-xl">
        <TextInputForm
          localStateValue={subtitle}
          onSubmit={(inputValue) =>
            programmeAction.subtitle({ id, newVal: inputValue })
          }
          input={{ placeholder: "Subtitle", styles: "uppercase" }}
          tooltip="Click to edit subtitle"
        />
      </div>
      <div className="mt-xs w-full text-center text-base font-light xs:font-normal lg:text-lg">
        <TextAreaForm
          localStateValue={summary}
          textArea={{
            placeholder: "Programme summary",
            styles: "text-center",
          }}
          onSubmit={(inputValue) => {
            programmeAction.summary({ id, newVal: inputValue });
          }}
          tooltip="Click to edit summary"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        {!isUsed ? (
          <WithTooltip text="Unused on page">
            <div className="cursor-help rounded-sm border px-xxs py-xxxs text-xs text-gray-500">
              Unused
            </div>
          </WithTooltip>
        ) : (
          <div></div>
        )}
        <div className="opacity-10 duration-75 ease-in-out group-hover/programme:opacity-80 hover:opacity-100">
          <ComponentMenu.Button
            onClick={() => {
              if (isUsed) {
                return;
              }

              connectProgramme(id);

              closeModal();
            }}
            tooltip={!isUsed ? connectTooltip : "can't add - already in use"}
            isDisabled={isUsed}
            styles={{ button: "text-blue-400" }}
          >
            <Icon.ConnectEntity />
          </ComponentMenu.Button>
        </div>
      </div>
    </div>
  );
};

{
  /* <WithTooltip text={connectTooltip}>
      <div
        className="cursor-pointer rounded-lg border p-sm hover:bg-gray-100"
        onClick={() => {
          connectProgramme(id);

          toast.neutral("programme added to landing");

          closeModal();
        }}
      >
        <div className="uppercase">{title}</div>
        <div className="mt-xs text-lg">{subtitle}</div>
        <div className="mt-xs text-gray-800">
          <Markdown>{summary}</Markdown>
        </div>
      </div>
    </WithTooltip> */
}

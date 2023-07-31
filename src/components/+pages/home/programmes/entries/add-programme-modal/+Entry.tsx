import Markdown from "markdown-to-jsx";
import { useMemo, type ReactElement } from "react";

import { WithTooltip } from "~/components/WithTooltip";
import ModalLayout from "~/components/layouts/Modal";
import { Modal } from "~/components/styled-bases";
import { ProgrammeCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { strArrayDivergence } from "~/helpers/query-arr";
import { useToast } from "~/hooks";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";

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

  const { usedProgrammeIds } = ComponentApiCx.use();

  const unusedProgrammeIds = strArrayDivergence(
    getIds(programmes),
    usedProgrammeIds,
  );

  const unusedProgrammes = programmes.flatMap((programme) =>
    unusedProgrammeIds.includes(programme.id) ? [programme] : [],
  );

  const unusedProgrammesSorted = useMemo(() => {
    return deepSortByIndex(unusedProgrammes);
  }, [unusedProgrammes]);

  return (
    <div>
      {!programmes.length ? (
        <div className="text-gray-600">No programmes yet.</div>
      ) : !unusedProgrammes.length ? (
        <div className="text-gray-600">No unused programmes.</div>
      ) : (
        <div className="grid grid-cols-3 gap-sm">
          {unusedProgrammesSorted.map((programme) => (
            <ProgrammeCx.Provider programme={programme} key={programme.id}>
              <ProgrammeSummary />
            </ProgrammeCx.Provider>
          ))}
        </div>
      )}
    </div>
  );
};

const ProgrammeSummary = () => {
  const { id, subtitle, summary, title } = ProgrammeCx.use();

  const { connectProgramme, connectTooltip } = ComponentApiCx.use();

  const toast = useToast();

  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <WithTooltip text={connectTooltip}>
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
    </WithTooltip>
  );
};

import Markdown from "markdown-to-jsx";

import { useMemo, type ReactElement } from "react";
import { Icon } from "~/components/icons";
import { Modal } from "~/components/styled-bases";
import { ProgrammeCx } from "~/context/entities";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { strArrayDivergence } from "~/helpers/query-arr";
import { UserEditableDataCx } from "../../../_state";
import { WithTooltip } from "~/components/WithTooltip";
import { useToast } from "~/hooks";

const AddProgrammeModal = ({
  button,
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
}) => {
  return (
    <Modal.WithVisibilityProvider
      button={({ openModal }) => button({ openModal })}
      panelContent={<Content />}
    />
  );
};

export default AddProgrammeModal;

const Content = () => {
  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <div className="relative flex max-h-[70vh] min-h-[500px] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Add programme</h3>
        <h5 className="flex items-center gap-xs text-sm text-gray-500">
          <span className="text-gray-400">
            <Icon.Info />
          </span>
          Create, delete and edit in depth on the programmes page.
        </h5>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <Programmes />
      </div>
      <div className="mt-xl">
        <button
          className="my-btn my-btn-neutral"
          type="button"
          onClick={() => closeModal()}
        >
          close
        </button>
      </div>
    </div>
  );
};

const Programmes = () => {
  const { programmes } = UserEditableDataCx.useAllData();
  const { page } = UserEditableDataCx.useAllData();

  const usedProgrammeIds = page.programmes.entries.map(
    (entry) => entry.dbConnections.programmeId,
  );
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

  const {
    page: {
      programmes: {
        entry: { add },
      },
    },
  } = UserEditableDataCx.useAction();

  const toast = useToast();

  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <WithTooltip text="add to landing">
      <div
        className="cursor-pointer rounded-lg border p-sm hover:bg-gray-100"
        onClick={() => {
          add({ dbConnect: { programmeId: id } });
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

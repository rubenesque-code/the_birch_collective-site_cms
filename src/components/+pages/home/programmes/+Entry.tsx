import { TextAreaForm, TextInputForm } from "~/components/forms";
import { ComponentMenu } from "~/components/menus";
import { UserEditableDataCx } from "../_state";
import { RevisionCx } from "../_state/RevisionCx";
import AddProgrammeModal from "./entries/add-programme-modal/+Entry";
import type { MyDb } from "~/types/database";
import { ProgrammeCx } from "~/context/entities";
import { type ReactNode } from "react";

const Programmes = () => {
  return (
    <div className="group/programmes">
      <Headings />
      <EntriesSection />
    </div>
  );
};

export default Programmes;

const Headings = () => {
  const {
    page: { programmes },
  } = UserEditableDataCx.useAllData();

  const {
    page: { programmes: programmesAction },
  } = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="">
      <div className="flex justify-center font-display text-6xl text-brandOrange">
        <TextInputForm
          localStateValue={programmes.heading}
          onSubmit={({ inputValue }) =>
            programmesAction.heading.update(inputValue)
          }
          input={{
            placeholder: "Heading",
            styles: "font-bold tracking-wide text-center",
          }}
          tooltip="click to edit programmes heading"
          key={undoKey}
        />
      </div>
      <div className="mt-3 text-center font-light xs:mt-4 xs:text-lg sm:mt-6 sm:text-xl lg:text-2xl">
        <TextAreaForm
          localStateValue={programmes.subheading}
          textArea={{
            placeholder: "Subheading",
            styles: "tracking-wide text-center",
          }}
          onSubmit={({ inputValue }) => {
            programmesAction.subheading.update(inputValue);
          }}
          tooltip="Click to edit programmes subheading"
          key={undoKey}
        />
      </div>
    </div>
  );
};

// programmes modal - create new. add existing.
// edit in place.

const EntriesSection = () => {
  const {
    page: {
      programmes: { entries },
    },
  } = UserEditableDataCx.useAllData();

  return (
    <div className="relative pt-lg">
      {!entries.length ? (
        <div className="mt-sm text-gray-800">
          No programmes added to landing page yet.
        </div>
      ) : (
        entries.map((programme) => (
          <GetDataWrapper programme={programme} key={programme.id}>
            {({ connectedProgramme }) => (
              <ProgrammeCx.Provider programme={connectedProgramme}>
                <Programme />
              </ProgrammeCx.Provider>
            )}
          </GetDataWrapper>
        ))
      )}

      <ComponentMenu styles="right-1 top-1 group-hover/programmes:opacity-40">
        <AddProgrammeModal />
      </ComponentMenu>
    </div>
  );
};

const GetDataWrapper = (input: {
  children: (arg0: { connectedProgramme: MyDb["programme"] }) => ReactNode;
  programme: MyDb["pages"]["landing"]["programmes"]["entries"][number];
}) => {
  const { programmes } = UserEditableDataCx.useAllData();

  const connectedProgramme = programmes.find(
    (programme) => programme.id === input.programme.dbConnections.programmeId,
  );

  if (!connectedProgramme) {
    return <div>Couldnt find programme</div>;
  }

  return input.children({ connectedProgramme });
};

const Programme = () => {
  const { title } = ProgrammeCx.use();

  return <div>{title}</div>;
};

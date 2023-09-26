import React, { type ReactNode } from "react";
import { produce } from "immer";

import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { ComponentMenu } from "~/components/menus";
import ProgrammesModal from "~/components/programmes-modal/+Entry";

import { ProgrammeCx } from "~/context/entities";
import { LandingCx } from "~/context/entities/landing";
import { UedCx } from "~/context/user-editable-data";
import { useToast } from "~/hooks";
import type { MyDb } from "~/types/database";

const Programmes = () => (
  <div className="group/programmes">
    <Headings />
    <EntriesSection />
    <div className="mt-xl flex justify-center">
      <GoToPageButton />
    </div>
  </div>
);

export default Programmes;

const Headings = () => {
  const { programmes } = UedCx.Pages.Landing.useData();

  const { programmes: programmesAction } = UedCx.Pages.Landing.useAction();
  const { undoKey } = UedCx.Pages.Landing.useRevision();

  return (
    <div className="">
      <div className="overflow-x-auto text-center font-display text-6xl text-brandOrange">
        <TextInputForm
          localStateValue={programmes.heading}
          onSubmit={programmesAction.heading}
          input={{
            placeholder: "Programmes heading",
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
            placeholder: "Progarammes subheading",
            styles: "tracking-wide text-center",
          }}
          onSubmit={programmesAction.subheading}
          tooltip="Click to edit programmes subheading"
          key={undoKey}
        />
      </div>
    </div>
  );
};

const EntriesSection = () => {
  const {
    programmes: { entries },
  } = UedCx.Pages.Landing.useData();
  const {
    programmes: { entries: entryAction },
  } = UedCx.Pages.Landing.useAction();

  const {
    store: { data: programmes },
  } = UedCx.Programmes.use();

  // □ refactor?
  const entriesSorted = React.useMemo(() => {
    const sorted = produce(entries, (draft) => {
      draft.sort((entryA, entryB) => {
        const programmeA = programmes.find(
          (programme) => programme.id === entryA.dbConnections.programmeId,
        );
        const programmeB = programmes.find(
          (programme) => programme.id === entryB.dbConnections.programmeId,
        );

        if (!programmeA && !programmeB) {
          return 0;
        }
        if (!programmeA) {
          return -1;
        }
        if (!programmeB) {
          return 1;
        }
        return programmeA.index - programmeB.index;
      });
    });

    return sorted;
  }, [entries, programmes]);

  const toast = useToast();

  return (
    <div className="mt-md">
      <CmsLayout.EditBar className="opacity-40 group-hover/programmes:opacity-80 hover:!opacity-100">
        <ProgrammesModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.Button.Edit
              buttonText="Edit programmes"
              onClick={openModal}
            />
          )}
          connectProgramme={(programmeId) => {
            entryAction.add({ dbConnect: { programmeId } });

            toast.neutral("added programme to landing");
          }}
          connectTooltip="Add to landing"
          usedProgrammeIds={entries.map(
            (entry) => entry.dbConnections.programmeId,
          )}
        />

        <CmsLayout.EditBar.Info
          infoText="Fields below are editable. Edit in depth from the programmes page."
          gap="xs"
        />
      </CmsLayout.EditBar>

      {!entries.length ? (
        <div className="mt-md text-gray-800">
          No programmes added to landing page yet.
        </div>
      ) : (
        <div className="mt-lg grid grid-cols-2 gap-sm">
          {entriesSorted.map((entry) => (
            <LandingCx.Programme.Provider entry={entry} key={entry.id}>
              <ConnectProgramme>
                {({ connectedProgramme }) => (
                  <ProgrammeCx.Provider programme={connectedProgramme}>
                    <Programme />
                  </ProgrammeCx.Provider>
                )}
              </ConnectProgramme>
            </LandingCx.Programme.Provider>
          ))}
        </div>
      )}
    </div>
  );
};

const ConnectProgramme = ({
  children,
}: {
  children: (arg0: { connectedProgramme: MyDb["programme"] }) => ReactNode;
}) => {
  const landingProgramme = LandingCx.Programme.use();
  const {
    store: { data: programmes },
  } = UedCx.Programmes.use();

  const connectedProgramme = programmes.find(
    (programme) => programme.id === landingProgramme.dbConnections.programmeId,
  );

  if (!connectedProgramme) {
    return <UnfoundProgramme />;
  }

  return children({ connectedProgramme });
};

const UnfoundProgramme = () => (
  <div className="group/programme relative grid place-items-center rounded-md border-2 border-my-alert-content bg-gray-50 p-md">
    <ProgrammeMenu />
    <div className="grid place-items-center">
      <div className="text-5xl text-gray-500">
        <Icon.Programme weight="light" />
      </div>
      <div className="mt-4 text-center text-my-alert-content">
        <p className="mt-1">Error - could not find programme.</p>
      </div>
      <div className="mt-4 max-w-[400px] text-center text-gray-500">
        A programme was added to the landing page that can&apos;t be found. It
        may have been deleted.
      </div>
    </div>
  </div>
);

const Programme = () => {
  const { id, title, subtitle, summary } = ProgrammeCx.use();

  const {
    store: { actions: programmeAction },
    revision: { undoKey },
  } = UedCx.Programmes.use();

  return (
    <div className="group/programme relative flex flex-col items-center p-sm">
      <ProgrammeMenu />
      <div className="w-full overflow-x-auto text-center font-display text-3xl font-bold tracking-wider text-brandLightOrange">
        <TextInputForm
          localStateValue={title}
          onSubmit={(inputValue) =>
            programmeAction.title({ id, updatedValue: inputValue })
          }
          input={{
            placeholder: "Title",
            styles: "tracking-wider text-center",
          }}
          tooltip="Click to edit title"
          key={undoKey}
        />
      </div>
      <div className="mt-xs w-full uppercase text-display xs:text-lg lg:text-xl">
        <TextAreaForm
          localStateValue={subtitle}
          onSubmit={(inputValue) =>
            programmeAction.subtitle({ id, updatedValue: inputValue })
          }
          textArea={{
            placeholder: "Subtitle",
            styles: "uppercase text-center",
          }}
          tooltip="Click to edit subtitle"
          key={undoKey}
        />
      </div>
      <div className="mt-xs w-full text-center text-base font-light xs:font-normal lg:text-lg">
        <TextAreaForm
          localStateValue={summary.mainText}
          textArea={{
            placeholder: "Programme summary",
            styles: "text-center",
          }}
          onSubmit={(inputValue) => {
            programmeAction.summary.mainText({ id, updatedValue: inputValue });
          }}
          tooltip="Click to edit summary"
          key={undoKey}
        />
      </div>
    </div>
  );
};

const ProgrammeMenu = () => {
  const {
    programmes: {
      entries: { remove },
    },
  } = UedCx.Pages.Landing.useAction();

  const { id } = LandingCx.Programme.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/programme:opacity-40">
      <ComponentMenu.Button
        onClick={() => {
          remove({ id });
          toast.neutral("programme removed from landing");
        }}
        tooltip="remove programme from landing"
        styles={{ button: "hover:text-my-alert-content hover:bg-my-alert" }}
      >
        <Icon.Remove weight="bold" />
      </ComponentMenu.Button>
    </ComponentMenu>
  );
};

const GoToPageButton = () => {
  const {
    programmes: { buttonText },
  } = UedCx.Pages.Landing.useData();

  const { programmes: programmesAction } = UedCx.Pages.Landing.useAction();

  const { undoKey } = UedCx.Pages.Landing.useRevision();

  return (
    <div className="flex cursor-pointer items-center gap-sm overflow-x-auto rounded-sm bg-brandOrange px-4 py-2 text-lg font-bold uppercase tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
      <TextInputForm
        localStateValue={buttonText}
        onSubmit={programmesAction.buttonText}
        input={{ placeholder: "Button text", styles: "uppercase" }}
        tooltip="Click to edit button text"
        key={undoKey}
      />
      <div className="">
        <Icon.ArrowRight />
      </div>
    </div>
  );
};

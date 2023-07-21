import { TextAreaForm, TextInputForm } from "~/components/forms";
import { UserEditableDataCx } from "../_state";
import { RevisionCx } from "../_state/RevisionCx";
import React, { type ReactNode } from "react";
import { produce } from "immer";
import SupportersModal from "~/components/supporters-modal/+Entry";
import { Icon } from "~/components/icons";
import { LandingCx, SupporterCx } from "~/context/entities";
import type { MyDb } from "~/types/database";
import { useToast } from "~/hooks";
import { ComponentMenu } from "~/components/menus";

const Supporters = () => {
  return (
    <div>
      <Headings />
      <Entries />
    </div>
  );
};

export default Supporters;

const Headings = () => {
  const {
    page: { supporters },
  } = UserEditableDataCx.useAllData();

  const {
    page: { supporters: supportersAction },
  } = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="">
      <div className="text-center font-display text-6xl text-brandOrange">
        <TextInputForm
          localStateValue={supporters.heading}
          onSubmit={({ inputValue }) =>
            supportersAction.heading.update(inputValue)
          }
          input={{
            placeholder: "Supporters heading",
            styles: "font-bold tracking-wide text-center",
          }}
          tooltip="click to edit supporters heading"
          key={undoKey}
        />
      </div>
      <div className="mt-3 text-center font-light xs:mt-4 xs:text-lg sm:mt-6 sm:text-xl lg:text-2xl">
        <TextAreaForm
          localStateValue={supporters.subheading}
          textArea={{
            placeholder: "Supporters subheading",
            styles: "tracking-wide text-center",
          }}
          onSubmit={({ inputValue }) => {
            supportersAction.subheading.update(inputValue);
          }}
          tooltip="Click to edit supporters subheading"
          key={undoKey}
        />
      </div>
    </div>
  );
};

const Entries = () => {
  const {
    page: {
      supporters: { entries },
    },
    supporters,
  } = UserEditableDataCx.useAllData();

  const {
    page: {
      supporters: { entry: entryAction },
    },
  } = UserEditableDataCx.useAction();

  const entriesSorted = React.useMemo(() => {
    const sorted = produce(entries, (draft) => {
      draft.sort((entryA, entryB) => {
        const supporterA = supporters.find(
          (supporter) => supporter.id === entryA.dbConnections.supporterId,
        );
        const supporterB = supporters.find(
          (supporter) => supporter.id === entryB.dbConnections.supporterId,
        );

        if (!supporterA && !supporterB) {
          return 0;
        }
        if (!supporterA) {
          return -1;
        }
        if (!supporterB) {
          return 1;
        }
        return supporterA.index - supporterB.index;
      });
    });
    return sorted;
  }, [entries, supporters]);

  return (
    <div className="mt-md">
      <div className="flex items-center justify-between rounded-md border border-dashed px-4 py-2">
        <SupportersModal
          button={({ openModal }) => (
            <div
              className="my-btn my-btn-neutral flex cursor-pointer items-center gap-xs rounded-sm border-transparent"
              onClick={openModal}
            >
              <span className="text-gray-400">
                <Icon.Configure />
              </span>
              <span className="">Edit supporters</span>
            </div>
          )}
          connectSupporter={(supporterId) =>
            entryAction.add({ dbConnections: { supporterId } })
          }
          usedSupporterIds={entries.map(
            (entry) => entry.dbConnections.supporterId,
          )}
        />

        {/* <div className="flex items-center gap-xs text-sm text-gray-400">
          <span className="text-gray-400">
            <Icon.Info />
          </span>
          <span>
            Each field below is editable. Edit in depth from the supporter
            page.
          </span>
        </div> */}
      </div>

      {!entries.length ? (
        <div className="mt-md text-gray-800">
          No supporters added to landing page yet.
        </div>
      ) : (
        <div className="mt-lg grid grid-cols-2 gap-sm">
          {entriesSorted.map((supporter) => (
            <LandingCx.Supporter.Provider
              supporter={supporter}
              key={supporter.id}
            >
              <GetSupporterWrapper>
                {({ connectedSupporter: connectedSupporter }) => (
                  <SupporterCx.Provider supporter={connectedSupporter}>
                    <Supporter />
                  </SupporterCx.Provider>
                )}
              </GetSupporterWrapper>
            </LandingCx.Supporter.Provider>
          ))}
        </div>
      )}
    </div>
  );
};

const GetSupporterWrapper = ({
  children,
}: {
  children: (arg0: { connectedSupporter: MyDb["supporter"] }) => ReactNode;
}) => {
  const landingSupporter = LandingCx.Supporter.use();
  const { supporters } = UserEditableDataCx.useAllData();

  const connectedSupporter = supporters.find(
    (supporter) => supporter.id === landingSupporter.dbConnections.supporterId,
  );

  if (!connectedSupporter) {
    return <UnfoundSupporter />;
  }

  return children({ connectedSupporter });
};

const UnfoundSupporter = () => (
  <div className="group/supporter relative grid place-items-center rounded-md border-2 border-my-alert-content bg-gray-50 p-md">
    <SupporterMenu />
    <div className="grid place-items-center">
      <div className="text-5xl text-gray-500">
        <Icon.Supporter weight="light" />
      </div>
      <div className="mt-4 text-center text-my-alert-content">
        <p className="mt-1">Error - could not find supporter.</p>
      </div>
      <div className="mt-4 max-w-[400px] text-center text-gray-500">
        A supporter was added to the landing page that can&apos;t be found. It
        may have been deleted.
      </div>
    </div>
  </div>
);

const Supporter = () => {
  const { id, name: title } = SupporterCx.use();
  const { supporter: supporterAction } = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="group/supporter relative flex flex-col items-center p-sm">
      <SupporterMenu />
      <div className="w-full text-center font-display text-3xl font-bold uppercase tracking-wider text-brandLightOrange">
        <TextInputForm
          localStateValue={title}
          onSubmit={({ inputValue }) =>
            supporterAction.name.update({ id, newVal: inputValue })
          }
          input={{
            placeholder: "Title",
            styles: "uppercase tracking-wider text-center",
          }}
          tooltip="Click to edit title"
          key={undoKey}
        />
      </div>
    </div>
  );
};

const SupporterMenu = () => {
  const {
    page: {
      programmes: {
        entry: { remove },
      },
    },
  } = UserEditableDataCx.useAction();

  const { id } = LandingCx.Supporter.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/supporter:opacity-40">
      <ComponentMenu.Button
        onClick={() => {
          remove({ id });
          toast.neutral("supporter removed from landing");
        }}
        tooltip="remove supporter from landing"
        styles={{ button: "hover:text-my-alert-content hover:bg-my-alert" }}
      >
        <Icon.Remove weight="bold" />
      </ComponentMenu.Button>
    </ComponentMenu>
  );
};

import React, { type ReactNode } from "react";
import { produce } from "immer";

import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { ComponentMenu } from "~/components/menus";
import SupportersModal from "~/components/supporters-modal/+Entry";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";

import { LandingCx, SupporterCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { useToast } from "~/hooks";
import type { MyDb } from "~/types/database";

const Supporters = () => (
  <div className="group/supporters">
    <Headings />
    <Entries />
  </div>
);

export default Supporters;

const Headings = () => {
  const { supporters } = UedCx.Pages.Landing.useData();

  const { supporters: supportersAction } = UedCx.Pages.Landing.useAction();

  const { undoKey } = UedCx.Pages.Landing.useRevision();

  return (
    <div className="">
      <div className="overflow-x-auto text-center font-display text-6xl text-brandOrange">
        <TextInputForm
          localStateValue={supporters.heading}
          onSubmit={supportersAction.heading}
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
          onSubmit={supportersAction.subheading}
          tooltip="Click to edit supporters subheading"
          key={undoKey}
        />
      </div>
    </div>
  );
};

const Entries = () => {
  const {
    supporters: { entries },
  } = UedCx.Pages.Landing.useData();

  const {
    store: { data: supporters },
  } = UedCx.Supporters.use();

  const {
    supporters: { entries: entriesAction },
  } = UedCx.Pages.Landing.useAction();

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

  const toast = useToast();

  return (
    <div className="mt-md">
      <CmsLayout.EditBar className="opacity-40 group-hover/supporters:opacity-80 hover:!opacity-100">
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
          connectSupporter={(supporterId) => {
            entriesAction.add({ dbConnections: { supporterId } });
            toast.neutral("added supporter to landing");
          }}
          usedSupporterIds={entries.map(
            (entry) => entry.dbConnections.supporterId,
          )}
        />
      </CmsLayout.EditBar>

      {!entries.length ? (
        <div className="mt-md text-gray-800">
          No supporters added to landing page yet.
        </div>
      ) : (
        <div className="mt-lg grid grid-cols-4 gap-lg">
          {entriesSorted.map((supporter) => (
            <LandingCx.Supporter.Provider
              supporter={supporter}
              key={supporter.id}
            >
              <ConnectSupporter>
                {({ connectedSupporter }) => (
                  <SupporterCx.Provider supporter={connectedSupporter}>
                    <Supporter />
                  </SupporterCx.Provider>
                )}
              </ConnectSupporter>
            </LandingCx.Supporter.Provider>
          ))}
        </div>
      )}
    </div>
  );
};

const ConnectSupporter = ({
  children,
}: {
  children: (arg0: { connectedSupporter: MyDb["supporter"] }) => ReactNode;
}) => {
  const landingSupporter = LandingCx.Supporter.use();

  const {
    store: { data: supporters },
  } = UedCx.Supporters.use();

  const queriedSupporter = supporters.find(
    (supporter) => supporter.id === landingSupporter.dbConnections.supporterId,
  );

  if (!queriedSupporter) {
    return <UnfoundSupporter />;
  }

  return children({ connectedSupporter: queriedSupporter });
};

const UnfoundSupporter = () => (
  <div className="group/supporter relative flex aspect-video flex-col items-center overflow-auto rounded-md border-2 border-my-alert-content bg-gray-50 p-sm">
    <SupporterMenu />
    <div className="text-5xl text-gray-500">
      <Icon.Supporter weight="light" />
    </div>
    <div className="mt-4 text-center text-my-alert-content">
      <p className="mt-1">Error - can&apos;t find supporter.</p>
    </div>
    <div className="mt-4 max-w-[400px] text-center text-gray-500">
      A supporter was added to the landing page that can&apos;t be found. It may
      have been deleted.
    </div>
  </div>
);

const Supporter = () => {
  const { image } = SupporterCx.use();

  return (
    <div className="group/supporter relative">
      <SupporterMenu />
      <div className="relative aspect-video">
        <UserSelectedImageWrapper
          dbImageId={image.dbConnections.imageId}
          placeholderText="supporter image"
        >
          {({ dbImageId }) => (
            <ConnectImage connectedImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage urls={urls} objectFit="contain" />
              )}
            </ConnectImage>
          )}
        </UserSelectedImageWrapper>
      </div>
    </div>
  );
};

const SupporterMenu = () => {
  const {
    supporters: {
      entries: { remove },
    },
  } = UedCx.Pages.Landing.useAction();

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

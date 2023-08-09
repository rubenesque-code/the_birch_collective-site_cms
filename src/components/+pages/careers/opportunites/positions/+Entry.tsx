import React, { type ReactNode } from "react";
import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { ComponentMenu } from "~/components/menus";
import VolunteerPositionsModal from "~/components/volunteer-positions-modal/+Entry";
import { VolunteerPositionCx } from "~/context/entities/VolunteerPositionCx";
import { VolunteerPositionsPageCx } from "~/context/entities/volunteer-positions-page";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

const Positions = () => {
  const {
    store: {
      data: {
        opportunities: { entries },
      },
      actions: {
        opportunities: { entries: positionAction },
      },
    },
  } = UedCx.Pages.VolunteerPositions.use();

  const sorted = React.useMemo(() => deepSortByIndex(entries), [entries]);

  const toast = useToast();

  return (
    <div>
      <CmsLayout.EditBar>
        <VolunteerPositionsModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.Button
              icon={<Icon.Create />}
              onClick={openModal}
              text="Add position"
            />
          )}
          connectPosition={(volunteerPositionId) => {
            positionAction.add({
              id: generateUid(),
              dbConnections: { volunteerPositionId },
              index: entries.length,
            });

            toast.neutral("added volunteer position to page");
          }}
          connectTooltip="add position to page"
          usedPositionIds={entries.map(
            (entry) => entry.dbConnections.volunteerPositionId,
          )}
        />
      </CmsLayout.EditBar>

      <div className="mt-lg">
        {!sorted.length ? (
          <p>No volunteer positions yet.</p>
        ) : (
          <div className="mt-lg grid grid-cols-2 gap-x-lg gap-y-xl">
            <DndKit.Context
              elementIds={getIds(sorted)}
              onReorder={positionAction.reorder}
            >
              {sorted.map((entry) => (
                <DndKit.Element elementId={entry.id} key={entry.id}>
                  <VolunteerPositionsPageCx.PositionEntry.Provider
                    entry={entry}
                  >
                    <ConnectVolunteerPosition>
                      {({ connectedPosition }) => (
                        <VolunteerPositionCx.Provider
                          volunteerPosition={connectedPosition}
                        >
                          <Position />
                        </VolunteerPositionCx.Provider>
                      )}
                    </ConnectVolunteerPosition>
                  </VolunteerPositionsPageCx.PositionEntry.Provider>
                </DndKit.Element>
              ))}
            </DndKit.Context>
          </div>
        )}
      </div>
    </div>
  );
};

export default Positions;

const ConnectVolunteerPosition = ({
  children,
}: {
  children: (arg0: {
    connectedPosition: MyDb["volunteer-position"];
  }) => ReactNode;
}) => {
  const pageEntry = VolunteerPositionsPageCx.PositionEntry.use();

  const {
    store: { data: volunteerPositions },
  } = UedCx.VolunteerPositions.use();

  const connectedPosition = volunteerPositions.find(
    (position) => position.id === pageEntry.dbConnections.volunteerPositionId,
  );

  if (!connectedPosition) {
    return <UnfoundPosition />;
  }

  return children({ connectedPosition });
};

const UnfoundPosition = () => (
  <div className="group/position relative grid place-items-center rounded-md border-2 border-my-alert-content bg-gray-50 p-md">
    <PositionMenu />
    <div className="grid place-items-center">
      <div className="text-5xl text-gray-500">
        <Icon.VolunteerPositon weight="light" />
      </div>
      <div className="mt-4 text-center text-my-alert-content">
        <p className="mt-1">Error - could not find volunteer position.</p>
      </div>
      <div className="mt-4 max-w-[400px] text-center text-gray-500">
        A volunteer position was added to the volunteer positions page that
        can&apos;t be found. It may have been deleted.
      </div>
    </div>
  </div>
);

const PositionMenu = () => {
  const {
    store: {
      data: {},

      actions: {
        opportunities: { entries: positionAction },
      },
    },
  } = UedCx.Pages.VolunteerPositions.use();

  const pageEntry = VolunteerPositionsPageCx.PositionEntry.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/position:opacity-40">
      <ComponentMenu.Button
        onClick={() => {
          positionAction.remove({
            id: pageEntry.id,
          });

          toast.neutral("position removed");
        }}
        tooltip="remove position"
        styles={{ button: "hover:text-my-alert-content hover:bg-my-alert" }}
      >
        <Icon.Remove weight="bold" />
      </ComponentMenu.Button>
    </ComponentMenu>
  );
};

const Position = () => {
  const { id, name, text } = VolunteerPositionCx.use();

  const {
    store: { actions },
    revision: { undoKey },
  } = UedCx.VolunteerPositions.use();

  return (
    <div className="group/position">
      <PositionMenu />
      <div className="text-center font-display text-3xl text-brandOrange">
        <TextInputForm
          localStateValue={name}
          input={{
            placeholder: "Position name",
            styles: "font-bold tracking-wide text-center",
          }}
          onSubmit={(updatedValue) => actions.name({ id, updatedValue })}
          tooltip="Click to edit position name"
          key={undoKey}
        />
      </div>
      <div className="custom-prose prose mt-sm w-full max-w-full">
        <TextAreaForm
          localStateValue={text}
          textArea={{
            placeholder: "position description",
          }}
          onSubmit={(updatedValue) => actions.text({ id, updatedValue })}
          tooltip="Click to edit position description"
          key={undoKey}
        />
      </div>
    </div>
  );
};

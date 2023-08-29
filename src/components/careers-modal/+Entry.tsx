import React, { type ReactElement } from "react";

import { TextAreaForm, TextInputForm } from "~/components/forms";
import ModalLayout from "~/components/layouts/Modal";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { WarningPanel } from "~/components/WarningPanel";

import { DndKit } from "../dnd-kit";
import { Icon } from "../icons";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import { CreateModal } from "./create-modal/CreateModal";

import { CareerCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";

const CareersModal = ({
  button,
  ...contextProps
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
} & ContextApiCxProps) => (
  <ComponentApiCx.Provider {...contextProps}>
    <Modal.WithVisibilityProvider
      button={button}
      panelContent={({ closeModal }) => (
        <ModalLayout.Standard
          body={<Content />}
          closeModal={closeModal}
          createEntityModal={<CreateModal />}
          header={
            <ModalLayout.Standard.Header>
              <ModalLayout.Standard.Header.Title>
                Add job post
              </ModalLayout.Standard.Header.Title>
              <ModalLayout.Standard.Header.Info>
                Below fields are editable. Edit all fields from the careers
                page.
              </ModalLayout.Standard.Header.Info>
            </ModalLayout.Standard.Header>
          }
        />
      )}
    />
  </ComponentApiCx.Provider>
);

export default CareersModal;

const Content = () => {
  const {
    store: { data, actions },
  } = UedCx.Careers.use();

  const sorted = React.useMemo(() => deepSortByIndex(data), [data]);

  return (
    <div>
      {!sorted.length ? (
        <div className="text-gray-600">No job postings yet.</div>
      ) : (
        <div className="grid grid-cols-2 gap-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={actions.reorder}
          >
            {sorted.map((career) => (
              <DndKit.Element elementId={career.id} key={career.id}>
                <CareerCx.Provider career={career}>
                  <Career />
                </CareerCx.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Career = () => {
  const { id, closingDate, description, title } = CareerCx.use();

  const {
    store: { actions },
    revision: { undoKey },
  } = UedCx.Careers.use();

  return (
    <div className="group/career relative">
      <CareerMenu />
      <div className={`rounded-lg border p-sm`}>
        <div className="">
          <div className="border-b border-gray-300 pb-sm">
            <div className="font-medium">
              <TextInputForm
                localStateValue={title}
                input={{
                  placeholder: "position description",
                }}
                onSubmit={(updatedValue) => actions.title({ id, updatedValue })}
                tooltip="Click to edit title"
                key={undoKey}
              />
            </div>
            <div className="mt-xs">
              <div className="flex items-center gap-xs text-gray-500">
                <span>
                  <Icon.Date />
                </span>
                <div className="flex gap-xs">
                  <span>closes, </span>
                  <span>
                    <TextInputForm
                      localStateValue={closingDate}
                      input={{
                        placeholder: "1 January 2031",
                      }}
                      onSubmit={(updatedValue) =>
                        actions.closingDate({ id, updatedValue })
                      }
                      tooltip="Click to edit closing date"
                      key={undoKey}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-sm">
            <TextAreaForm
              localStateValue={description}
              textArea={{
                placeholder: "job description",
              }}
              onSubmit={(updatedValue) =>
                actions.description({ id, updatedValue })
              }
              tooltip="Click to edit description"
              key={undoKey}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CareerMenu = () => {
  const { id } = CareerCx.use();

  const {
    store: { actions },
  } = UedCx.Careers.use();

  const {
    connectCareer: connectPosition,
    connectTooltip,
    usedCareerIds: usedPositionIds,
  } = ComponentApiCx.use();

  const toast = useToast();

  const isUsed = usedPositionIds?.includes(id);

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/position:opacity-40">
      {connectPosition && connectTooltip ? (
        <>
          <ComponentMenu.Button
            onClick={() => {
              if (isUsed) {
                return;
              }

              connectPosition(id);
            }}
            tooltip={
              !isUsed ? connectTooltip : "can't add to page - already in use"
            }
            isDisabled={isUsed}
            styles={{ button: "text-blue-400" }}
          >
            <Icon.ConnectEntity />
          </ComponentMenu.Button>

          <ComponentMenu.Divider />
        </>
      ) : null}

      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            tooltip="delete job posting"
            onClick={openModal}
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              actions.delete({ id });

              closeModal();

              toast.neutral("deleted job post");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete job posting",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

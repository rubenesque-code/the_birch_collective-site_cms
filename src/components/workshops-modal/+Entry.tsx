import React, { type ReactElement } from "react";

import { UedCx } from "~/context/user-editable-data";

import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";

import { useToast } from "~/hooks";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import ModalLayout from "~/components/layouts/Modal";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import CreateModal from "./new-workshop-modal/+Entry";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import { Icon } from "../icons";
import { DbReadCx } from "~/context/db-data-read-only";
import { WithTooltip } from "../WithTooltip";

const WorkshopsModal = ({
  button,
  ...contextProps
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
} & ContextApiCxProps) => (
  <ComponentApiCx.Provider {...contextProps}>
    <Modal.WithVisibilityProvider
      button={button}
      panelContent={({ closeModal }) => (
        <ModalLayout.UserEdit
          body={<Workshops />}
          closeModal={closeModal}
          createEntityModal={<CreateModal />}
          header={
            <ModalLayout.UserEdit.Header>
              <ModalLayout.UserEdit.Header.Title>
                Edit workshops
              </ModalLayout.UserEdit.Header.Title>
              <ModalLayout.UserEdit.Header.Info>
                Edit in depth from the workshops page and each workshop&apos;s
                page
              </ModalLayout.UserEdit.Header.Info>
            </ModalLayout.UserEdit.Header>
          }
        />
      )}
    />
  </ComponentApiCx.Provider>
);

export default WorkshopsModal;

const Workshops = () => {
  const {
    store: { data: workshops, actions },
  } = UedCx.Workshops.use();

  const sorted = React.useMemo(() => deepSortByIndex(workshops), [workshops]);

  const toast = useToast();

  return (
    <div>
      {!workshops.length ? (
        <div className="text-gray-600">No workshops yet.</div>
      ) : (
        <div className="grid grid-cols-2 gap-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={(input) => {
              actions.reorder(input);

              toast.neutral("reordered");
            }}
          >
            {sorted.map((workshop) => (
              <DndKit.Element elementId={workshop.id} key={workshop.id}>
                <DbReadCx.Workshop.Provider workshop={workshop}>
                  <Workshop />
                </DbReadCx.Workshop.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Workshop = () => {
  const { id, subtitle, summary, title, type } = DbReadCx.Workshop.use();

  const {
    store: { actions },
  } = UedCx.Workshops.use();

  return (
    <div className="group/workshop relative">
      <WorkshopMenu />
      <div className={`rounded-lg border p-sm `}>
        <div className="relative aspect-video w-full">
          <UserSelectedImageWrapper
            dbImageId={summary.image.dbConnections.imageId}
            placeholderText="summary image"
          >
            {({ dbImageId }) => (
              <ConnectImage dbImageId={dbImageId}>
                {({ urls }) => (
                  <CustomisableImage
                    urls={urls}
                    position={summary.image.position}
                  />
                )}
              </ConnectImage>
            )}
          </UserSelectedImageWrapper>
        </div>

        <div className="mt-md">
          <div className="text-sm text-gray-400">Title</div>
          <div className="max-w-full overflow-x-auto ">
            <TextInputForm
              localStateValue={title}
              onSubmit={(inputValue) =>
                actions.title({ id, updatedValue: inputValue })
              }
              input={{ placeholder: "Workshop title" }}
              tooltip="Click to edit title"
            />
          </div>
        </div>

        <div className="mt-md">
          <div className="text-sm text-gray-500">Type</div>
          <WithTooltip text="Click to change workshop type">
            <div
              className="inline-block cursor-pointer"
              onClick={() =>
                actions.type({
                  id,
                  updatedValue: type === "free" ? "paid" : "free",
                })
              }
            >
              {type === "free" ? "Free" : "Paid"}
            </div>
          </WithTooltip>
        </div>

        <div className="mt-md">
          <div className="text-sm text-gray-400">Subtitle</div>
          <div className="max-w-full overflow-x-auto">
            <TextInputForm
              localStateValue={subtitle}
              onSubmit={(inputValue) =>
                actions.subtitle({ id, updatedValue: inputValue })
              }
              input={{
                placeholder: "Workshop subtitle",
              }}
              tooltip="Click to edit subtitle"
            />
          </div>
        </div>

        <div className="mt-md">
          <div className="text-sm text-gray-400">Summary text</div>
          <div className="max-h-[200px] overflow-y-auto">
            <TextAreaForm
              localStateValue={summary.mainText}
              onSubmit={(inputValue) =>
                actions.summary.mainText({ id, updatedValue: inputValue })
              }
              textArea={{ placeholder: "Workshop summary" }}
              tooltip="Click to edit summary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkshopMenu = () => {
  const {
    id,
    summary: { image },
  } = DbReadCx.Workshop.use();

  const {
    store: { actions },
  } = UedCx.Workshops.use();

  const { connectWorkshop, connectTooltip, usedWorkshopIds } =
    ComponentApiCx.use();

  const toast = useToast();

  const isUsed = usedWorkshopIds?.includes(id);

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/workshop:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(updatedValue) =>
              actions.summary.image.position.x({ id, updatedValue })
            }
            updateY={(updatedValue) =>
              actions.summary.image.position.y({ id, updatedValue })
            }
            styles={{ wrapper: "right-0 top-0", menuItemsWrapper: "right-0" }}
          />

          <ComponentMenu.Divider />
        </>
      ) : null}

      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          actions.summary.image.dbConnections.imageId({
            id,
            updatedValue: dbImageId,
          });
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />

      {connectWorkshop && connectTooltip ? (
        <>
          <ComponentMenu.Divider />

          <ComponentMenu.Button
            onClick={() => {
              if (isUsed) {
                return;
              }

              connectWorkshop(id);
            }}
            tooltip={
              !isUsed ? connectTooltip : "can't add to page - already in use"
            }
            isDisabled={isUsed}
            styles={{ button: "text-blue-400" }}
          >
            <Icon.ConnectEntity />
          </ComponentMenu.Button>
        </>
      ) : null}

      <ComponentMenu.Divider />

      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            tooltip="delete workshop"
            onClick={openModal}
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              actions.delete({ id });
              closeModal();
              toast.neutral("deleted workshop");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete workshop",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

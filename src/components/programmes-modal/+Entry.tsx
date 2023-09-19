import React, { type ReactElement } from "react";

import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import ModalLayout from "~/components/layouts/Modal";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";

import { Icon } from "../icons";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import CreateModal from "./new-programme-modal/+Entry";

import { ProgrammeCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";

const ProgrammesModal = ({
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
          body={<Programmes />}
          closeModal={closeModal}
          createEntityModal={<CreateModal />}
          header={
            <ModalLayout.Standard.Header>
              <ModalLayout.Standard.Header.Title>
                Edit programmes
              </ModalLayout.Standard.Header.Title>
              <ModalLayout.Standard.Header.Info>
                Edit more in depth from the programmes page and each
                programme&apos;s page
              </ModalLayout.Standard.Header.Info>
            </ModalLayout.Standard.Header>
          }
        />
      )}
    />
  </ComponentApiCx.Provider>
);

export default ProgrammesModal;

const Programmes = () => {
  const {
    store: { data: programmes, actions },
  } = UedCx.Programmes.use();

  const sorted = React.useMemo(() => deepSortByIndex(programmes), [programmes]);

  const toast = useToast();

  return (
    <div>
      {!programmes.length ? (
        <div className="text-gray-600">No programmes yet.</div>
      ) : (
        <div className="grid grid-cols-2 gap-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={(input) => {
              actions.reorder(input);

              toast.neutral("reordered");
            }}
          >
            {sorted.map((programme) => (
              <DndKit.Element elementId={programme.id} key={programme.id}>
                <ProgrammeCx.Provider programme={programme}>
                  <Programme />
                </ProgrammeCx.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Programme = () => {
  const { id, subtitle, summary, title } = ProgrammeCx.use();

  const {
    store: { actions },
  } = UedCx.Programmes.use();

  return (
    <div className="group/programme relative">
      <ProgrammeMenu />
      <div className={`rounded-lg border p-sm `}>
        <div className="relative aspect-video w-full">
          <UserSelectedImageWrapper
            dbImageId={summary.image.dbConnections.imageId}
            placeholderText="summary image"
          >
            {({ dbImageId }) => (
              <ConnectImage connectedImageId={dbImageId}>
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
          <div className="text-sm text-gray-400">title</div>
          <div className="font-medium">
            <TextInputForm
              localStateValue={title}
              onSubmit={(inputValue) =>
                actions.title({ id, updatedValue: inputValue })
              }
              input={{ placeholder: "Programme title" }}
              tooltip="Click to edit title"
            />
          </div>
        </div>
        <div className="mt-md">
          <div className="text-sm text-gray-400">subtitle</div>
          <div className="overflow-auto font-medium">
            <TextInputForm
              localStateValue={subtitle}
              onSubmit={(inputValue) =>
                actions.subtitle({ id, updatedValue: inputValue })
              }
              input={{ placeholder: "Programme subtitle" }}
              tooltip="Click to edit subtitle"
            />
          </div>
        </div>
        <div className="mt-md">
          <div className="text-sm text-gray-400">summary</div>
          <div className="max-h-[200px] overflow-y-auto">
            <TextAreaForm
              localStateValue={summary.mainText}
              onSubmit={(inputValue) =>
                actions.summary.mainText({ id, updatedValue: inputValue })
              }
              textArea={{ placeholder: "Programme summary" }}
              tooltip="Click to edit summary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgrammeMenu = () => {
  const {
    id,
    summary: { image },
  } = ProgrammeCx.use();

  const {
    store: { actions },
  } = UedCx.Programmes.use();

  const { connectProgramme, connectTooltip, usedProgrammeIds } =
    ComponentApiCx.use();

  const toast = useToast();

  const isUsed = usedProgrammeIds?.includes(id);

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/programme:opacity-40">
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

      {connectProgramme && connectTooltip ? (
        <>
          <ComponentMenu.Divider />

          <ComponentMenu.Button
            onClick={() => {
              if (isUsed) {
                return;
              }

              connectProgramme(id);
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
            tooltip="delete programme"
            onClick={openModal}
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              actions.delete({ id });
              closeModal();
              toast.neutral("deleted programme");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete programme",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

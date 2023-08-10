/* eslint-disable jsx-a11y/alt-text */
import { useMemo, type ReactElement } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { DndKit } from "~/components/dnd-kit";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { ImageUploadAndLibrary } from "~/components/parts/upload-image-and-library";
import { Modal } from "~/components/styled-bases";
import { PosterCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";

export const EditModal = ({
  button,
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
}) => (
  <Modal.VisibilityCx.Provider>
    {({ closeModal, isOpen, openModal }) => (
      <>
        {button({ openModal })}

        <Modal.OverlayAndPanelWrapper
          onClickOutside={closeModal}
          isOpen={isOpen}
          panelContent={<Content />}
        />
      </>
    )}
  </Modal.VisibilityCx.Provider>
);

const Content = () => {
  const {
    store: {
      data: { posters },
      actions: { posters: postersAction },
    },
  } = UedCx.Programme.use();

  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <div className="relative flex h-[1000px] max-h-[70vh] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Programme posters</h3>
      </div>
      <div className="mt-sm">
        <ImageUploadAndLibrary.Complete
          menuButton={
            <div
              className={`group my-btn my-btn-neutral flex items-center gap-xs`}
            >
              <span className="text-sm">
                <Icon.Create />
              </span>
              <span className="text-sm font-medium">Add new poster</span>
            </div>
          }
          onUploadOrSelect={({ dbImageId }) =>
            postersAction.create({
              id: generateUid(),
              image: {
                dbConnections: { imageId: dbImageId },
              },
              index: posters.length,
            })
          }
        />
      </div>
      <div className="mt-sm flex-grow overflow-y-auto">
        <Posters />
      </div>
      <div className="mt-xl">
        <button
          className="my-btn my-btn-neutral"
          type="button"
          onClick={closeModal}
        >
          close
        </button>
      </div>
    </div>
  );
};

const Posters = () => {
  const {
    store: {
      data: { posters },
      actions: { posters: postersAction },
    },
  } = UedCx.Programme.use();

  const sorted = useMemo(() => deepSortByIndex(posters), [posters]);

  return (
    <div className="mt-xs">
      {!posters.length ? (
        <p className="text-gray-800">No posters yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-sm pr-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={postersAction.reorder}
          >
            {sorted.map((poster) => (
              <DndKit.Element
                elementId={poster.id}
                styles={{ handle: "bg-white" }}
                key={poster.id}
              >
                <PosterCx.Provider poster={poster}>
                  <Poster />
                </PosterCx.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Poster = () => {
  const { image } = PosterCx.use();

  return (
    <div className="group/entry relative aspect-square rounded-lg border p-sm">
      <div className="relative aspect-square">
        <div className=" absolute h-full w-full">
          <UserSelectedImageWrapper
            dbImageId={image.dbConnections.imageId}
            placeholderText="background image"
          >
            {({ dbImageId }) => (
              <DbImageWrapper dbImageId={dbImageId}>
                {({ urls }) => (
                  <CustomisableImage urls={urls} objectFit="contain" />
                )}
              </DbImageWrapper>
            )}
          </UserSelectedImageWrapper>
        </div>
      </div>
      <Menu />
    </div>
  );
};

const Menu = () => {
  const {
    store: {
      actions: { posters: postersAction },
    },
  } = UedCx.Programme.use();

  const { id } = PosterCx.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="left-1 top-1 group-hover/entry:opacity-60">
      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          postersAction.image.dbConnections.imageId({
            id,
            updatedValue: dbImageId,
          });
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />

      <ComponentMenu.Divider />
      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            onClick={openModal}
            tooltip="delete poster"
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              postersAction.delete({ id });
              closeModal();
              toast.neutral("deleted poster");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete poster",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

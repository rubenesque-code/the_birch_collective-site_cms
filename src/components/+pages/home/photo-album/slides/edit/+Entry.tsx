/* eslint-disable jsx-a11y/alt-text */
import { useMemo, type ReactElement } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { DndKit } from "~/components/dnd-kit";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { ImageUploadAndLibrary } from "~/components/parts/upload-image-and-library";
import { Modal } from "~/components/styled-bases";
import { PhotoAlbumEntryCx } from "~/context/entities/landing/PhotoAlbumEntry";
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
    photoAlbum: { entries },
  } = UedCx.Pages.Landing.useData();

  const {
    photoAlbum: { entries: entryAction },
  } = UedCx.Pages.Landing.useAction();

  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <div className="relative flex h-[1200px] max-h-[70vh] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Landing photo album</h3>
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
              <span className="text-sm font-medium">Add new image</span>
            </div>
          }
          onUploadOrSelect={({ dbImageId }) =>
            entryAction.create({
              id: generateUid(),
              image: {
                dbConnections: { imageId: dbImageId },
                position: { x: 50, y: 50 },
              },
              index: entries.length,
            })
          }
        />
      </div>
      <div className="mt-sm flex-grow overflow-y-auto">
        <Entries />
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

const Entries = () => {
  const {
    photoAlbum: { entries },
  } = UedCx.Pages.Landing.useData();

  const {
    photoAlbum: { entries: entriesAction },
  } = UedCx.Pages.Landing.useAction();

  const sorted = useMemo(() => deepSortByIndex(entries), [entries]);

  return (
    <div className="mt-xs">
      {!entries.length ? (
        <p className="text-gray-800">No photo album entries yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-sm pr-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={entriesAction.reorder}
          >
            {sorted.map((entry) => (
              <DndKit.Element
                elementId={entry.id}
                styles={{ handle: "bg-white" }}
                key={entry.id}
              >
                <PhotoAlbumEntryCx.Provider entry={entry}>
                  <Entry />
                </PhotoAlbumEntryCx.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Entry = () => {
  const { image } = PhotoAlbumEntryCx.use();

  return (
    <div className="group/entry relative aspect-video rounded-lg border p-sm">
      <div className="relative aspect-video">
        <div className=" absolute h-full w-full">
          <UserSelectedImageWrapper
            dbImageId={image.dbConnections.imageId}
            placeholderText="background image"
          >
            {({ dbImageId }) => (
              <ConnectImage dbImageId={dbImageId}>
                {({ urls }) => (
                  <CustomisableImage urls={urls} position={image.position} />
                )}
              </ConnectImage>
            )}
          </UserSelectedImageWrapper>
        </div>
      </div>
      <Menu />
    </div>
  );
};

const Menu = () => {
  const { image, id } = PhotoAlbumEntryCx.use();

  const {
    photoAlbum: { entries: entriesAction },
  } = UedCx.Pages.Landing.useAction();

  const toast = useToast();

  return (
    <ComponentMenu styles="left-1 top-1 group-hover/entry:opacity-60">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(newVal) => entriesAction.image.position.x({ id, newVal })}
            updateY={(newVal) => entriesAction.image.position.y({ id, newVal })}
            styles={{ wrapper: "left-0 top-0" }}
          />

          <ComponentMenu.Divider />
        </>
      ) : null}

      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          entriesAction.image.dbConnections.imageId({
            id,
            newVal: dbImageId,
          });
          entriesAction.image.position.x({
            id,
            newVal: 50,
          });
          entriesAction.image.position.y({
            id,
            newVal: 50,
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
            tooltip="delete album entry"
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              entriesAction.delete({ id });
              closeModal();
              toast.neutral("deleted album entry");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete album entry",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

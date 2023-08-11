import { UedCx } from "~/context/user-editable-data";

import Link from "next/link";
import React from "react";
import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { ComponentMenu } from "~/components/menus";
import WorkshopsModal from "~/components/workshops-modal/+Entry";
import { Modal } from "~/components/styled-bases";
import { DbReadCx } from "~/context/db-data-read-only";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";

const WorkshopsList = () => {
  const {
    store: { data: workshops },
  } = UedCx.Workshops.use();

  return (
    <div className="group/workshops">
      <CmsLayout.EditBar className="opacity-50 transition-opacity duration-100 ease-in-out group-hover/workshops:opacity-80 hover:!opacity-100">
        <WorkshopsModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.Button.Edit
              buttonText="Edit workshops"
              onClick={openModal}
            />
          )}
        />

        {workshops.length ? (
          <CmsLayout.EditBar.Info
            infoText="Below fields are editable. Edit in depth from individual page."
            gap="xs"
          />
        ) : null}
      </CmsLayout.EditBar>

      <div className="mt-xl">
        <Workshops />
      </div>
    </div>
  );
};

export default WorkshopsList;

const Workshops = () => {
  const {
    store: { data: workshops, actions },
  } = UedCx.Workshops.use();

  const sorted = React.useMemo(() => deepSortByIndex(workshops), [workshops]);

  return (
    <div>
      {!sorted.length ? (
        <p className="text-gray-600">No workshops created yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2xl">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={actions.reorder}
          >
            {sorted.map((workshop) => (
              <DbReadCx.Workshop.Provider workshop={workshop} key={workshop.id}>
                <Workshop />
              </DbReadCx.Workshop.Provider>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Workshop = () => {
  const { id, subtitle, summary, title } = DbReadCx.Workshop.use();

  const {
    store: { actions },
    revision: { undoKey },
  } = UedCx.Workshops.use();

  const toast = useToast();

  return (
    <div className="group/workshop">
      <CmsLayout.EditBar className="opacity-40 transition-opacity duration-100 ease-in-out group-hover/workshop:opacity-80 hover:!opacity-100">
        <div>
          <Link href={`workshops/${id}`}>
            <CmsLayout.EditBar.Button
              icon={<Icon.InternalLink />}
              text="page"
            />
          </Link>
        </div>
        <div>
          <Modal.WithVisibilityProvider
            button={({ openModal }) => (
              <ComponentMenu.Button.Delete
                tooltip="delete workshop"
                onClick={openModal}
                styles={{
                  inner: "!text-gray-400 hover:!text-my-alert-content",
                }}
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
        </div>
      </CmsLayout.EditBar>

      <div className="mt-md flex gap-md">
        <div className="w-full max-w-[350px]">
          <div className="group/image relative aspect-[4/3] w-full ">
            <ImageMenu />
            <UserSelectedImageWrapper
              dbImageId={summary.image.dbConnections.imageId}
              placeholderText="summary image"
            >
              {({ dbImageId }) => (
                <DbImageWrapper dbImageId={dbImageId}>
                  {({ urls }) => (
                    <CustomisableImage
                      urls={urls}
                      position={summary.image.position}
                    />
                  )}
                </DbImageWrapper>
              )}
            </UserSelectedImageWrapper>
          </div>
        </div>
        <div className="flex-grow">
          <div className="font-display text-5xl text-brandOrange">
            <TextInputForm
              localStateValue={title}
              input={{
                placeholder: "Workshop title",
                styles: "tracking-wide font-bold",
              }}
              onSubmit={(inputValue) =>
                actions.title({ id, updatedValue: inputValue })
              }
              tooltip="Click to edit title"
              key={undoKey}
            />
          </div>
          <div className="mt-xxs font-display text-3xl text-brandOrange">
            <TextAreaForm
              localStateValue={subtitle}
              textArea={{
                placeholder: "Workshop subtitle",
                styles: "tracking-wide font-bold",
              }}
              onSubmit={(inputValue) =>
                actions.subtitle({ id, updatedValue: inputValue })
              }
              tooltip="Click to edit subtitle"
              key={undoKey}
            />
          </div>
          <div className="custom-prose_no-p-margin prose mt-xs max-w-full font-medium">
            <TextAreaForm
              localStateValue={summary.mainText}
              textArea={{
                placeholder: "Workshop summary",
                styles: "tracking-wide font-medium",
              }}
              onSubmit={(inputValue) =>
                actions.subtitle({ id, updatedValue: inputValue })
              }
              tooltip="Click to edit subtitle"
              key={undoKey}
            />
          </div>
          <div>
            <WorkshopSummaryMainText />
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageMenu = () => {
  const {
    store: {
      actions: {
        summary: { image: imageAction },
      },
    },
  } = UedCx.Workshops.use();

  const {
    id,
    summary: { image },
  } = DbReadCx.Workshop.use();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/image:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(updatedValue) =>
              imageAction.position.x({ id, updatedValue })
            }
            updateY={(updatedValue) =>
              imageAction.position.y({ id, updatedValue })
            }
            styles={{ wrapper: "right-0 top-0", menuItemsWrapper: "right-0" }}
          />

          <ComponentMenu.Divider />
        </>
      ) : null}

      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          imageAction.dbConnections.imageId({ id, updatedValue: dbImageId });

          imageAction.position.x({ id, updatedValue: 50 });
          imageAction.position.y({ id, updatedValue: 50 });
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

const WorkshopSummaryMainText = () => {
  const {
    id,
    summary: { mainText },
  } = DbReadCx.Workshop.use();

  const {
    store: {
      actions: { summary: summaryAction },
    },
    revision: { undoKey },
  } = UedCx.Workshops.use();

  return (
    <div className="mt-xs">
      <TextAreaForm
        localStateValue={mainText}
        textArea={{
          placeholder: "Summary text",
          styles: "tracking-wide leading-relaxed",
        }}
        onSubmit={(updatedValue) =>
          summaryAction.mainText({ id, updatedValue })
        }
        tooltip="Click to edit summary text"
        key={undoKey}
      />
    </div>
  );
};

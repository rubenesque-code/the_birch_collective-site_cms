import { UedCx } from "~/context/user-editable-data";

import Markdown from "markdown-to-jsx";
import Link from "next/link";
import React from "react";
import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import WorkshopsModal from "~/components/workshops-modal/+Entry";
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

      <div className="mt-lg">
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
        <div className="grid grid-cols-1 gap-xl">
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
  const { id, subtitle, summary, title, index } = DbReadCx.Workshop.use();

  const {
    store: { actions, data: workshops },
    revision: { undoKey },
  } = UedCx.Workshops.use();

  const workshopsSorted = React.useMemo(
    () => deepSortByIndex(workshops),
    [workshops],
  );

  console.log("workshopsSorted:", workshopsSorted);

  const toast = useToast();

  return (
    <div className="group/workshop">
      <CmsLayout.EditBar className="opacity-40 transition-opacity duration-100 ease-in-out group-hover/workshop:opacity-80 hover:!opacity-100">
        <div className="flex items-center gap-sm">
          <PreviewModal />
          <Link href={`workshops/${id}`}>
            <CmsLayout.EditBar.Button
              icon={<Icon.InternalLink />}
              text="page"
              tooltip="go to workshop page"
            />
          </Link>
        </div>

        <div className="flex items-center gap-sm">
          <ComponentMenu.Button
            onClick={() => {
              const nextWorkshop = workshopsSorted[index + 1];

              if (!nextWorkshop) {
                return;
              }

              actions.reorder({ activeId: id, overId: nextWorkshop.id });
            }}
            tooltip="move workshop down"
            styles={{ button: "text-gray-500 hover:text-gray-600" }}
          >
            <Icon.ArrowDown />
          </ComponentMenu.Button>

          <ComponentMenu.Button
            onClick={() => {
              const prevWorkshop = workshopsSorted[index - 1];

              if (!prevWorkshop) {
                return;
              }

              actions.reorder({ activeId: id, overId: prevWorkshop.id });
            }}
            tooltip="move workshop up"
            styles={{ button: "text-gray-500 hover:text-gray-600" }}
          >
            <Icon.ArrowUp />
          </ComponentMenu.Button>

          <ComponentMenu.Divider />

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

      <div className="mt-md">
        <div>
          <div className="font-display text-5xl text-brandLightOrange">
            <TextAreaForm
              localStateValue={title}
              textArea={{
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

          <div className="mt-xs text-lg text-brandOrange">
            <TextAreaForm
              localStateValue={subtitle}
              textArea={{
                placeholder: "Workshop subtitle (optional)",
                styles: "tracking-[0.4px]",
              }}
              onSubmit={(inputValue) =>
                actions.subtitle({ id, updatedValue: inputValue })
              }
              tooltip="Click to edit subtitle"
              key={undoKey}
            />
          </div>
        </div>

        <div className="mt-md flex gap-md">
          <div className="min-w-[280px] max-w-[350px]">
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
            <div className="custom-prose prose max-w-full">
              <TextAreaForm
                localStateValue={summary.mainText}
                textArea={{
                  placeholder: "Workshop summary",
                  styles: "tracking-wide",
                }}
                onSubmit={(inputValue) =>
                  actions.summary.mainText({ id, updatedValue: inputValue })
                }
                tooltip="Click to edit summary"
                key={undoKey}
              />
            </div>
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

const PreviewModal = () => {
  const { title, subtitle, summary } = DbReadCx.Workshop.use();

  return (
    <Modal.WithVisibilityProvider
      button={({ openModal }) => (
        <CmsLayout.EditBar.Button
          icon={<Icon.SitePreview />}
          onClick={openModal}
          text="preview"
          tooltip="preview workshop summary"
        />
      )}
      panelContent={({ closeModal }) => (
        <div className="rounded-lg bg-white p-lg shadow-xl">
          <div className="flex justify-end">
            <h2 className="flex items-center gap-xs  text-gray-400">
              <span>
                <Icon.SitePreview />
              </span>
              <span>preview</span>
            </h2>
          </div>

          <div className="">
            <div>
              <div className="font-display text-5xl text-brandOrange">
                {title.length ? <Markdown>{title}</Markdown> : "Workshop title"}
              </div>

              {subtitle.length ? (
                <div className="mt-xs text-lg text-brandOrange">
                  <Markdown>{subtitle}</Markdown>
                </div>
              ) : null}
            </div>

            <div className="mt-md flex gap-md">
              <div className="min-w-[280px] max-w-[350px]">
                <div className="group/image relative aspect-[4/3] w-full ">
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
                <div className="custom-prose prose max-w-full">
                  {summary.mainText.length ? (
                    <Markdown>{summary.mainText}</Markdown>
                  ) : (
                    "Workshop summary"
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-xl flex justify-end">
            <button
              className="my-btn my-btn-neutral"
              type="button"
              onClick={closeModal}
            >
              close
            </button>
          </div>
        </div>
      )}
    />
  );
};

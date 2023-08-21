import React from "react";

import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { IconSwith } from "~/components/IconSwitch";
import CmsLayout from "~/components/layouts/Cms";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { WarningPanel } from "~/components/WarningPanel";

import ColourModal from "./colour-modal/+Entry";
import IconModal from "./icon-modal/+Entry";
import NewSectionModal from "./new-section-modal/+Entry";
import Preview from "./preview/+Entry";

import { SectionCx } from "~/context/entities/programme/section";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { textColourSwith } from "~/helpers/data/switch-to-styles";
import { useToast } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";

const Sections = () => {
  const {
    store: {
      data: { sections },
    },
  } = UedCx.Programme.use();

  const sorted = React.useMemo(() => deepSortByIndex(sections), [sections]);

  return (
    <div>
      <CmsLayout.EditBar className="opacity-50 transition-opacity duration-100 ease-in-out hover:opacity-100">
        <div className="flex items-center gap-sm">
          {sections.length ? <PreviewModal /> : null}
          <NewSectionModal
            button={({ openModal }) => (
              <CmsLayout.EditBar.Button
                icon={<Icon.Create />}
                onClick={openModal}
                text="Add section"
              />
            )}
          />
        </div>

        <CmsLayout.EditBar.Info
          infoText="The sections below are approximate. See preview left."
          gap="xs"
        />
      </CmsLayout.EditBar>

      <div className="mt-md">
        {!sections.length ? (
          <p className="italic text-gray-600">
            No programme details sections yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-2xl">
            {sorted.map((section) => (
              <SectionCx.Provider section={section} key={section.id}>
                <Section />
              </SectionCx.Provider>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sections;

const PreviewModal = () => (
  <Modal.WithVisibilityProvider
    button={({ openModal }) => (
      <CmsLayout.EditBar.Button
        icon={<Icon.SitePreview />}
        onClick={openModal}
        text="preview sections"
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
        <Preview />
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

const Section = () => {
  const {
    store: {
      data: { sections },
    },
  } = UedCx.Programme.use();

  const sectionsSorted = React.useMemo(
    () => deepSortByIndex(sections),
    [sections],
  );

  const { id, title, bullets, colour, description, index } = SectionCx.use();

  const {
    store: {
      actions: { sections: sectionAction },
    },
    revision: { undoKey },
  } = UedCx.Programme.use();

  const bulletsSorted = React.useMemo(
    () => deepSortByIndex(bullets.entries),
    [bullets.entries],
  );

  const toast = useToast();

  return (
    <div className="group/section">
      <CmsLayout.EditBar className="opacity-40 transition-opacity duration-100 ease-in-out group-hover/section:opacity-80 hover:!opacity-100">
        <div className="flex items-center gap-sm">
          <CmsLayout.EditBar.Button
            icon={<Icon.Create />}
            onClick={() =>
              sectionAction.bullets.entries.create({
                sectionId: id,
                newEntry: {
                  id: generateUid(),
                  index: bullets.entries.length,
                  text: "",
                  title: bullets.type === "text" ? "" : null,
                },
              })
            }
            text="Add bullet"
          />

          <IconModal
            button={({ openModal }) => (
              <CmsLayout.EditBar.Button
                icon={<Icon.Update />}
                onClick={openModal}
                text="icon"
                tooltip="change icon"
              />
            )}
            currentColour={colour}
            currentIconName={bullets.icon}
            onSelect={(iconName) =>
              sectionAction.bullets.icon({ id, updatedValue: iconName })
            }
          />

          <ColourModal
            button={({ openModal }) => (
              <CmsLayout.EditBar.Button
                icon={<Icon.Update />}
                onClick={openModal}
                text="colour"
                tooltip="change colour"
              />
            )}
            currentColour={colour}
            onSelect={(colour) =>
              sectionAction.colour({ id, updatedValue: colour })
            }
          />
        </div>

        <div className="flex items-center gap-sm">
          <ComponentMenu.Button
            onClick={() => {
              const nextSection = sectionsSorted[index + 1];

              if (!nextSection) {
                return;
              }

              sectionAction.reorder({ activeId: id, overId: nextSection.id });
            }}
            tooltip="move section down"
            styles={{ button: "text-gray-500 hover:text-gray-600" }}
          >
            <Icon.ArrowDown />
          </ComponentMenu.Button>

          <ComponentMenu.Button
            onClick={() => {
              const prevSection = sectionsSorted[index - 1];

              if (!prevSection) {
                return;
              }

              sectionAction.reorder({ activeId: id, overId: prevSection.id });
            }}
            tooltip="move section up"
            styles={{ button: "text-gray-500 hover:text-gray-600" }}
          >
            <Icon.ArrowUp />
          </ComponentMenu.Button>

          <ComponentMenu.Divider />

          <Modal.WithVisibilityProvider
            button={({ openModal }) => (
              <ComponentMenu.Button.Delete
                tooltip="delete section"
                onClick={openModal}
                styles={{
                  inner: "!text-gray-400 hover:!text-my-alert-content",
                }}
              />
            )}
            panelContent={({ closeModal }) => (
              <WarningPanel
                callback={() => {
                  sectionAction.delete({ id });

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
        </div>
      </CmsLayout.EditBar>

      <div
        className={`mt-sm font-display text-6xl font-bold tracking-wide ${textColourSwith(
          colour,
        )}`}
      >
        <TextInputForm
          localStateValue={title}
          input={{
            placeholder: "Section title",
            styles: "tracking-wide",
          }}
          onSubmit={(updatedValue) => sectionAction.title({ id, updatedValue })}
          tooltip="Click to edit title"
          key={undoKey}
        />
      </div>

      <div className="custom-prose prose mt-sm max-w-full font-medium">
        <TextAreaForm
          localStateValue={description}
          textArea={{
            placeholder: "Section subtitle (optional)",
          }}
          onSubmit={(updatedValue) =>
            sectionAction.description({ id, updatedValue })
          }
          tooltip="Click to edit subtitle"
          key={undoKey}
        />
      </div>

      <div className="mt-sm grid grid-cols-1 gap-sm">
        <DndKit.Context
          elementIds={getIds(bullets.entries)}
          onReorder={(bullet) =>
            sectionAction.bullets.entries.reorder({ bullet, sectionId: id })
          }
        >
          {bulletsSorted.map((bullet) => (
            <DndKit.Element elementId={bullet.id} key={bullet.id}>
              <SectionCx.Bullet.Provider bullet={bullet}>
                <Bullet />
              </SectionCx.Bullet.Provider>
            </DndKit.Element>
          ))}
        </DndKit.Context>
      </div>
    </div>
  );
};

const Bullet = () => {
  const { id: sectionId, bullets, colour } = SectionCx.use();
  const { id: bulletId, text, title } = SectionCx.Bullet.use();

  const {
    store: {
      actions: { sections: sectionAction },
    },
    revision: { undoKey },
  } = UedCx.Programme.use();

  return (
    <div className="group/bullet flex items-center gap-sm">
      <div className={`relative text-2xl ${textColourSwith(colour)}`}>
        <IconSwith iconName={bullets.icon} />
        <BulletDeleteButton />
      </div>
      <div className="flex-grow flex-col">
        {bullets.type === "text-and-title" ? (
          <div className="custom-prose prose w-full max-w-full font-semibold">
            <TextAreaForm
              localStateValue={title}
              textArea={{
                placeholder: "Bullet header",
              }}
              onSubmit={(updatedValue) =>
                sectionAction.bullets.entries.title({
                  bulletId,
                  sectionId,
                  updatedValue,
                })
              }
              tooltip="Click to edit bullet header"
              key={undoKey}
            />
          </div>
        ) : null}
        <div className="custom-prose prose w-full max-w-full">
          <TextAreaForm
            localStateValue={text}
            textArea={{
              placeholder: "Bullet text",
              // styles: "border border-blue-400",
            }}
            onSubmit={(updatedValue) =>
              sectionAction.bullets.entries.text({
                bulletId,
                sectionId,
                updatedValue,
              })
            }
            tooltip="Click to edit bullet text"
            key={undoKey}
          />
        </div>
      </div>
    </div>
  );
};

const BulletDeleteButton = () => {
  const { id: sectionId } = SectionCx.use();
  const { id: bulletId } = SectionCx.Bullet.use();

  const {
    store: {
      actions: { sections: sectionAction },
    },
  } = UedCx.Programme.use();

  const toast = useToast();

  return (
    <div className="absolute -left-1 top-1/2 z-10 -translate-x-full -translate-y-1/2 opacity-0 transition-colors duration-75 ease-in-out group-hover/bullet:opacity-60 hover:!opacity-100">
      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            onClick={openModal}
            tooltip="delete bullet"
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              sectionAction.bullets.entries.delete({ bulletId, sectionId });

              closeModal();

              toast.neutral("deleted programme bullet");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete programme bullet",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </div>
  );
};

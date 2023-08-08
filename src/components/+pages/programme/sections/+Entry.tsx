import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { UedCx } from "~/context/user-editable-data";
import NewSectionModal from "./new-section-modal/+Entry";
import { SectionCx } from "~/context/entities/programme/section";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import React from "react";
import { deepSortByIndex } from "~/helpers/data/process";
import { textColourSwith } from "~/helpers/data/switch-to-styles";
import { generateUid } from "~/lib/external-packages-rename";
import { IconSwith } from "~/components/IconSwitch";
import { DndKit } from "~/components/dnd-kit";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";
import { Modal } from "~/components/styled-bases";
import { ComponentMenu } from "~/components/menus";
import { WarningPanel } from "~/components/WarningPanel";

const Sections = () => {
  const {
    store: {
      data: { sections },
    },
  } = UedCx.Programme.use();

  const sorted = React.useMemo(() => deepSortByIndex(sections), [sections]);

  return (
    <div>
      <CmsLayout.EditBar>
        <NewSectionModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.Button
              icon={<Icon.Create />}
              onClick={openModal}
              text="Add section"
            />
          )}
        />
      </CmsLayout.EditBar>
      <div className="mt-md">
        {!sections.length ? (
          <p className="italic text-gray-600">
            No programme details sections yet.
          </p>
        ) : (
          sorted.map((section) => (
            <SectionCx.Provider section={section} key={section.id}>
              <Section />
            </SectionCx.Provider>
          ))
        )}
      </div>
    </div>
  );
};

export default Sections;

// add bullets
// todo: bullets. preview section/bullet

const Section = () => {
  const { id, title, bullets, colour, description } = SectionCx.use();

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
  console.log("bulletsSorted:", bulletsSorted);

  return (
    <div>
      <div
        className={`font-display text-6xl font-bold tracking-wide ${textColourSwith(
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
      <div className="custom-prose prose mt-sm max-w-full  font-medium">
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
      <div className="mt-xs flex">
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
      {bullets.type === "text-and-title" ? (
        <div className="w-full">
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

import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { UedCx } from "~/context/user-editable-data";
import NewSectionModal from "./new-section-modal/+Entry";
import { SectionCx } from "~/context/entities/programme/Section";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import React, { useState } from "react";
import { deepSortByIndex } from "~/helpers/data/process";
import { textColourSwith } from "~/helpers/data/switch-to-styles";
import { generateUid } from "~/lib/external-packages-rename";

const Sections = () => {
  const {
    store: {
      data: { sections },
      actions: { sections: sectionsAction },
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

const Section = () => {
  const { id, title, bullets, colour, description } = SectionCx.use();

  const {
    store: {
      actions: { sections: sectionAction },
    },
    revision: { undoKey },
  } = UedCx.Programme.use();

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
      <div className="custom-prose prose mt-sm">
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
      <div className="flex">
        <CmsLayout.EditBar.Button
          icon={<Icon.Create />}
          onClick={() =>
            sectionAction.bullets.entries.create({
              sectionId: id,
              newEntry: {
                id: generateUid(),
                index: 1,
                text: "",
                title: bullets.type === "text" ? "" : null,
              },
            })
          }
          text="Add bullet"
        />
      </div>
    </div>
  );
};

// todo: bullets. preview section/bullet

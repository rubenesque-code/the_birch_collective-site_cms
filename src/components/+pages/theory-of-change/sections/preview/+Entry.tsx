import Markdown from "markdown-to-jsx";
import React from "react";
import { IconSwith } from "~/components/IconSwitch";
import SiteLayout from "~/components/layouts/Site";
import { DbReadCx } from "~/context/db-data-read-only";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { textColourSwith } from "~/helpers/data/switch-to-styles";

const Preview = () => {
  const {
    store: {
      data: { sections },
    },
  } = UedCx.Pages.TheoryOfChange.use();

  const sorted = React.useMemo(() => deepSortByIndex(sections), [sections]);

  return (
    <SiteLayout.Section.Spacing>
      <div className="grid grid-cols-1 gap-lg">
        {sorted.map((section) => (
          <DbReadCx.Pages.TheoryOfChange.Section.Provider
            section={section}
            key={section.id}
          >
            <div className="">
              <div
                className={`mt-sm font-display text-6xl font-bold tracking-wide ${textColourSwith(
                  section.colour,
                )}`}
              >
                {section.title}
              </div>
              {section.description ? (
                <div className="custom-prose prose mt-sm max-w-full font-medium">
                  {section.description}
                </div>
              ) : null}
              <Bullets />
            </div>
          </DbReadCx.Pages.TheoryOfChange.Section.Provider>
        ))}
      </div>
    </SiteLayout.Section.Spacing>
  );
};

export default Preview;

const Bullets = () => {
  const { bullets, colour } = DbReadCx.Pages.TheoryOfChange.Section.use();

  const bulletsSorted = React.useMemo(
    () => deepSortByIndex(bullets.entries),
    [bullets.entries],
  );

  return (
    <div className="mt-sm grid grid-cols-1 gap-sm">
      {bulletsSorted.map((bullet) => (
        <div className="group/bullet flex items-center gap-sm" key={bullet.id}>
          <div className={`relative text-2xl ${textColourSwith(colour)}`}>
            <IconSwith iconName={bullets.icon} />
          </div>
          <div className="flex-grow flex-col">
            {bullets.type === "text-and-title" ? (
              <div
                className={`custom-prose prose w-full max-w-full font-semibold ${
                  !bullet.title?.length ? "text-gray-400" : ""
                }`}
              >
                {bullet.title?.length ? bullet.title : "No heading yet"}
              </div>
            ) : null}
            <div
              className={`custom-prose prose w-full max-w-full ${
                !bullet.text.length ? "text-gray-400" : ""
              }`}
            >
              {bullet.text.length ? (
                <Markdown>{bullet.text}</Markdown>
              ) : (
                "No text yet"
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

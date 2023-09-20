import { useMemo, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { WarningPanel } from "~/components/WarningPanel";
import { WithTooltip } from "~/components/WithTooltip";

import { AboutUsEntryCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";
import { useFocused } from "~/hooks/useFocused";
import { generateUid } from "~/lib/external-packages-rename";

const AboutUs = () => {
  const {
    aboutUs: { entries },
  } = UedCx.Pages.Landing.useData();

  const {
    aboutUs: { entries: entriesAction },
  } = UedCx.Pages.Landing.useAction();

  const sorted = useMemo(() => deepSortByIndex(entries), [entries]);

  return (
    <div className="group/about flex flex-col items-center">
      <Heading />
      <div className="flex w-full flex-col items-center pl-2xl">
        {!entries.length ? (
          <div className="mb-sm">
            <p className="">No about us entries yet.</p>
          </div>
        ) : (
          <div className="mt-xl grid w-full grid-cols-1 gap-sm">
            <DndKit.Context
              elementIds={getIds(sorted)}
              onReorder={entriesAction.reorder}
            >
              {sorted.map((aboutUsEntry) => (
                <DndKit.Element
                  elementId={aboutUsEntry.id}
                  key={aboutUsEntry.id}
                >
                  <AboutUsEntryCx.Provider aboutUsEntry={aboutUsEntry}>
                    <Entry />
                  </AboutUsEntryCx.Provider>
                </DndKit.Element>
              ))}
            </DndKit.Context>
          </div>
        )}
        <div className="mt-sm w-full">
          <AddEntryForm />
        </div>
      </div>
      <div className="mt-xl">
        <GoToPageButton />
      </div>
    </div>
  );
};

export default AboutUs;

const Heading = () => {
  const { aboutUs } = UedCx.Pages.Landing.useData();

  const { aboutUs: aboutUsAction } = UedCx.Pages.Landing.useAction();

  const { undoKey } = UedCx.Pages.Landing.useRevision();

  return (
    <div className="w-full text-center font-display text-6xl font-bold text-brandGreen">
      <TextAreaForm
        localStateValue={aboutUs.heading}
        textArea={{
          placeholder: "About us heading",
          styles: "text-center",
        }}
        onSubmit={aboutUsAction.heading}
        tooltip="Click to edit about us heading"
        key={undoKey}
      />
    </div>
  );
};

const AddEntryForm = () => {
  const [text, setText] = useState("");
  const [isFocused, { focusHandlers }] = useFocused();

  const {
    aboutUs: { entries },
  } = UedCx.Pages.Landing.useData();

  const {
    aboutUs: { entries: entriesAction },
  } = UedCx.Pages.Landing.useAction();

  return (
    <div className="pl-xl opacity-50 group-hover/about:opacity-80 hover:!opacity-100">
      <div
        className={`rounded-md px-4 py-2 transition-all duration-100 ease-in-out ${
          isFocused ? "border border-blue-300" : ""
        }`}
      >
        <form
          className="flex w-full items-center gap-sm text-sm"
          onSubmit={(e) => {
            e.preventDefault();

            entriesAction.create({
              id: generateUid(),
              index: entries.length,
              text,
            });

            setText("");
          }}
        >
          <div className="text-gray-400">
            <Icon.Create />
          </div>
          <WithTooltip text="click to type in new entry">
            <ReactTextareaAutosize
              className={`z-10 w-full resize-none outline-none ${
                isFocused ? "bg-transparent" : "bg-transparent "
              }`}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              placeholder="Add Entry"
              autoComplete="off"
              {...focusHandlers}
            />
          </WithTooltip>
          {text.length ? (
            <button className="my-btn my-btn-neutral" type="submit">
              Submit
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

const Entry = () => {
  const { id, text } = AboutUsEntryCx.use();

  const {
    aboutUs: { entries: entriesAction },
  } = UedCx.Pages.Landing.useAction();

  return (
    <div className="group/entry relative flex w-full gap-sm hover:border-b">
      <EntryMenu />
      <div className="text-brandGreen">
        <Icon.AboutUs size="2xl" />
      </div>
      <div className="flex-grow text-2xl">
        <TextAreaForm
          localStateValue={text}
          textArea={{ placeholder: "About us entry text" }}
          onSubmit={(inputValue) => {
            entriesAction.updateText({
              id,
              newVal: inputValue,
            });
          }}
          tooltip="Click to edit entry"
        />
      </div>
    </div>
  );
};

const EntryMenu = () => {
  const aboutUsEntry = AboutUsEntryCx.use();

  const {
    aboutUs: { entries: entriesAction },
  } = UedCx.Pages.Landing.useAction();

  const toast = useToast();

  return (
    <div className="left-0 right-auto opacity-0 group-hover/entry:opacity-60">
      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            tooltip="delete entry"
            onClick={openModal}
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              entriesAction.delete({ id: aboutUsEntry.id });

              closeModal();

              toast.neutral("deleted entry");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete entry",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </div>
  );
};

const GoToPageButton = () => {
  const {
    aboutUs: { buttonText },
  } = UedCx.Pages.Landing.useData();

  const { aboutUs: aboutUsAction } = UedCx.Pages.Landing.useAction();

  const { undoKey } = UedCx.Pages.Landing.useRevision();

  return (
    <div className="flex cursor-pointer items-center gap-sm overflow-x-auto rounded-sm bg-brandGreen px-4 py-2 text-lg font-bold uppercase tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
      <TextInputForm
        localStateValue={buttonText}
        onSubmit={aboutUsAction.buttonText}
        input={{ placeholder: "Button text", styles: "uppercase" }}
        tooltip="Click to edit button text"
        key={undoKey}
      />
      <div className="">
        <Icon.ArrowRight />
      </div>
    </div>
  );
};

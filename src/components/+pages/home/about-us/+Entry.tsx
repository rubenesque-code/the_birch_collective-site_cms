import ReactTextareaAutosize from "react-textarea-autosize";

import { useMemo, useState } from "react";
import { WarningPanel } from "~/components/WarningPanel";
import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { AboutUsEntryCx } from "~/context/entities";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";
import { UserEditableDataCx } from "../_state";
import { RevisionCx } from "../_state/RevisionCx";

const AboutUs = () => {
  const {
    page: {
      aboutUs: { entries },
    },
  } = UserEditableDataCx.useAllData();
  const {
    page: {
      aboutUs: { entry },
    },
  } = UserEditableDataCx.useAction();

  const sorted = useMemo(() => deepSortByIndex(entries), [entries]);

  return (
    <div className="flex flex-col items-center">
      <Heading />
      {!entries.length ? (
        <div className="mb-sm">
          <p className="">No about us entries yet.</p>
        </div>
      ) : (
        <div className="mt-xl grid w-full grid-cols-1 gap-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={entry.order.update}
          >
            {sorted.map((aboutUsEntry) => (
              <DndKit.Element elementId={aboutUsEntry.id} key={aboutUsEntry.id}>
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
      <div className="mt-xl">
        <GoToPageButton />
      </div>
    </div>
  );
};

export default AboutUs;

const Heading = () => {
  const {
    data: { undoKey },
  } = RevisionCx.use();
  const { page } = UserEditableDataCx.useAllData();
  const action = UserEditableDataCx.useAction();

  return (
    <div className="w-full font-display text-6xl font-bold text-brandGreen">
      <TextAreaForm
        localStateValue={page.aboutUs.heading}
        textArea={{ placeholder: "About us heading", styles: "uppercase" }}
        onSubmit={({ inputValue }) => {
          action.page.aboutUs.heading.update(inputValue);
        }}
        tooltip="Click to edit about us heading"
        key={undoKey}
      />
    </div>
  );
};

const AddEntryForm = () => {
  const [text, setText] = useState("");

  const {
    page: {
      aboutUs: { entries },
    },
  } = UserEditableDataCx.useAllData();
  const action = UserEditableDataCx.useAction();

  return (
    <form
      className="flex w-full items-center gap-sm pl-2xl pr-xl text-base"
      onSubmit={(e) => {
        e.preventDefault();

        action.page.aboutUs.entry.create({
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
      <ReactTextareaAutosize
        className={`z-10 w-full resize-none bg-transparent outline-none`}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Add new about us entry"
        autoComplete="off"
      />
      {text.length ? (
        <button className="my-btn my-btn-neutral" type="submit">
          Add
        </button>
      ) : null}
    </form>
  );
};

const Entry = () => {
  const {
    data: { undoKey },
  } = RevisionCx.use();
  const {
    page: { aboutUs },
  } = UserEditableDataCx.useAction();
  const aboutUsEntry = AboutUsEntryCx.use();

  return (
    <div className="group/entry relative mx-xl flex w-full gap-sm hover:border-b">
      <EntryMenu />
      <div className="text-brandGreen">
        <Icon.AboutUs size="2xl" />
      </div>
      <div className="flex-grow text-2xl">
        <TextAreaForm
          localStateValue={aboutUsEntry.text}
          textArea={{ placeholder: "About us entry text" }}
          onSubmit={({ inputValue }) => {
            aboutUs.entry.updateText({
              id: aboutUsEntry.id,
              newVal: inputValue,
            });
          }}
          tooltip="Click to edit entry"
          key={undoKey}
        />
      </div>
    </div>
  );
};

const EntryMenu = () => {
  const aboutUsEntry = AboutUsEntryCx.use();

  const {
    page: { aboutUs },
  } = UserEditableDataCx.useAction();

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
              aboutUs.entry.delete({ id: aboutUsEntry.id });
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
    page: {
      aboutUs: { buttonText },
    },
  } = UserEditableDataCx.useAllData();

  const {
    page: { aboutUs },
  } = UserEditableDataCx.useAction();

  return (
    <div
      className="flex cursor-pointer items-center gap-sm rounded-sm bg-brandGreen
    px-4 py-2 text-lg font-bold uppercase tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl
    "
    >
      <TextInputForm
        localStateValue={buttonText}
        onSubmit={({ inputValue }) => aboutUs.buttonText.update(inputValue)}
        input={{ placeholder: "Button text", styles: "uppercase" }}
        tooltip="Go to about us page"
      />
      <div className="">
        <Icon.ArrowRight />
      </div>
    </div>
  );
};

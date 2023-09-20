import React from "react";

import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { WarningPanel } from "~/components/WarningPanel";

import { DbReadCx } from "~/context/db-data-read-only";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useFocused, useToast } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";

const Info = () => {
  const {
    store: {
      data: { info },
      actions: { info: infoAction },
    },
  } = UedCx.Pages.Workshop.use();

  const sorted = React.useMemo(() => deepSortByIndex(info), [info]);

  return (
    <div className="grid grid-cols-1 gap-xs">
      <DndKit.Context elementIds={getIds(info)} onReorder={infoAction.reorder}>
        {sorted.map((infoEntry) => (
          <DndKit.Element elementId={infoEntry.id} key={infoEntry.id}>
            <DbReadCx.Workshop.InfoEntry.Provider infoEntry={infoEntry}>
              <Entry />
            </DbReadCx.Workshop.InfoEntry.Provider>
          </DndKit.Element>
        ))}
      </DndKit.Context>
      <AddEntryForm />
    </div>
  );
};

export default Info;

const Entry = () => {
  const {
    store: {
      actions: { info: infoAction },
    },
    revision: { undoKey },
  } = UedCx.Pages.Workshop.use();

  const { id, text, title } = DbReadCx.Workshop.InfoEntry.use();

  return (
    <div className="group/entry relative flex flex-col gap-xxxs">
      <div className="relative font-bold">
        <EntryDeleteButton />
        <div className="overflow-x-auto">
          <TextInputForm
            localStateValue={title}
            input={{
              placeholder: "Info title",
            }}
            onSubmit={(updatedValue) => infoAction.title({ id, updatedValue })}
            tooltip="Click to edit info title"
            key={undoKey}
          />
        </div>
      </div>
      <div className="w-full text-gray-800">
        <TextAreaForm
          localStateValue={text}
          textArea={{
            placeholder: "Info text",
          }}
          onSubmit={(updatedValue) => infoAction.text({ id, updatedValue })}
          tooltip="Click to edit info text"
          key={undoKey}
        />
      </div>
    </div>
  );
};

const EntryDeleteButton = () => {
  const {
    store: {
      actions: { info: infoAction },
    },
  } = UedCx.Pages.Workshop.use();

  const { id } = DbReadCx.Workshop.InfoEntry.use();

  const toast = useToast();

  return (
    <div className="absolute -left-1 top-1/2 -translate-x-full -translate-y-1/2 opacity-0 transition-colors duration-75 ease-in-out group-hover/entry:opacity-60 hover:!opacity-100">
      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            onClick={openModal}
            tooltip="delete entry"
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              infoAction.delete({ id });

              closeModal();

              toast.neutral("deleted info entry");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete info entry",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </div>
  );
};

const AddEntryForm = () => {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  const [isFocused, { focusHandlers, setIsFocused }] = useFocused();

  const {
    store: {
      data: { info: infoEntries },
      actions: { info: infoAction },
    },
  } = UedCx.Pages.Workshop.use();

  return (
    <div
      className={`mt-md rounded-md px-4 py-2 transition-all duration-100 ease-in-out ${
        isFocused ? "border border-blue-300" : ""
      }`}
    >
      <p className="flex items-center gap-xs text-sm italic text-gray-400">
        <span>
          <Icon.Create />
        </span>
        <span>Add info</span>
      </p>

      <form
        className="mt-xxs flex w-full flex-col items-center gap-xxs text-sm"
        onSubmit={(e) => {
          e.preventDefault();

          infoAction.create({
            id: generateUid(),
            index: infoEntries.length,
            text,
            title,
          });

          setText("");
          setTitle("");

          setIsFocused(false);

          e.currentTarget.blur();
        }}
        {...focusHandlers}
      >
        <div className="w-full">
          <input
            className="w-full overflow-x-auto font-bold focus:bg-gray-100"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            value={title}
            size={1}
          />
        </div>

        <div className="w-full">
          <input
            className="w-full flex-grow overflow-x-auto focus:bg-gray-100"
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Text"
            size={1}
          />
        </div>

        {title.length && text.length ? (
          <button className="my-btn my-btn-neutral" type="submit">
            Submit
          </button>
        ) : null}
      </form>
    </div>
  );
};

import ReactTextareaAutosize from "react-textarea-autosize";

import { TextAreaForm } from "~/components/forms";
import { RevisionCx } from "../_state/RevisionCx";
import { Icon } from "~/components/icons";
import { UserEditableDataCx } from "../_state";
import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";
import { useMemo, useState } from "react";
import { DndKit } from "~/components/dnd-kit";
import { getIds } from "~/helpers/data/query";
import { deepSortByIndex } from "~/helpers/data/process";
import { Button } from "~/components/menus/component/Button";
import { Modal } from "~/components/styled-bases";
import { WarningPanel } from "~/components/WarningPanel";
import { useToast } from "~/hooks";

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
  console.log("sorted:", sorted);

  return (
    <div>
      <Heading />
      {!entries.length ? (
        <div className="mb-sm">
          <p className="">No about us entries yet.</p>
        </div>
      ) : (
        <div className="mt-md grid grid-cols-1 gap-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={entry.order.update}
          >
            {sorted.map((aboutUsEntry) => (
              <DndKit.Element elementId={aboutUsEntry.id} key={aboutUsEntry.id}>
                <Entry {...aboutUsEntry} />
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
      <div className="mt-xs">
        <AddEntryForm />
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
    <div className="font-display text-6xl font-bold text-brandGreen">
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
    <div className="flex gap-sm">
      <span />
      <div className="text-brandGreen">
        <Icon.AboutUs size="xl" />
      </div>
      <form
        className="flex items-center gap-sm text-xl"
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
        <ReactTextareaAutosize
          className={`z-10 w-full resize-none bg-transparent outline-none`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Add new about us entry..."
          autoComplete="off"
        />
        {text.length ? (
          <button className="my-btn my-btn-neutral" type="submit">
            Add
          </button>
        ) : null}
      </form>
    </div>
  );
};

const Entry = (
  props: MyDb["pages"]["landing"]["aboutUs"]["entries"][number],
) => {
  const {
    data: { undoKey },
  } = RevisionCx.use();
  const {
    page: { aboutUs },
  } = UserEditableDataCx.useAction();

  const toast = useToast();

  return (
    <div className="group/entry flex gap-sm">
      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <div className="w-0 opacity-0 transition-all duration-150 ease-in-out group-hover/entry:w-[30px] group-hover/entry:opacity-60 hover:!opacity-100">
            <Button.Delete tooltip="delete entry" onClick={openModal} />
          </div>
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              aboutUs.entry.delete({ id: props.id });
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
      <div className="text-brandGreen">
        <Icon.AboutUs size="2xl" />
      </div>
      <div className="text-2xl">
        <TextAreaForm
          localStateValue={props.text}
          textArea={{ placeholder: "About us entry text" }}
          onSubmit={({ inputValue }) => {
            aboutUs.entry.updateText({ id: props.id, newVal: inputValue });
          }}
          tooltip="Click to edit about us heading"
          key={undoKey}
        />
      </div>
    </div>
  );
};

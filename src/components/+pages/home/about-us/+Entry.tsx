import ReactTextareaAutosize from "react-textarea-autosize";

import { TextAreaForm } from "~/components/forms";
import { RevisionCx } from "../_state/RevisionCx";
import { Icon } from "~/components/icons";
import { UserEditableDataCx } from "../_state";
import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";
import { useState } from "react";

const AboutUs = () => {
  const {
    page: {
      aboutUs: { entries },
    },
  } = UserEditableDataCx.useAllData();

  return (
    <div>
      <Heading />
      {!entries.length ? (
        <div className="mb-sm">
          <p className="">No about us entries yet.</p>
        </div>
      ) : (
        <div className="mt-md">
          {entries.map((aboutUsEntry) => (
            <Entry {...aboutUsEntry} key={aboutUsEntry.id} />
          ))}
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

  return (
    <div className="flex gap-sm">
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

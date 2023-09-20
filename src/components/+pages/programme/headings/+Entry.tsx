import { TextAreaForm, TextInputForm } from "~/components/forms";

import { UedCx } from "~/context/user-editable-data";

const Headings = () => {
  const {
    store: {
      data: { title, subtitle },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Programme.use();

  return (
    <div className="">
      <div className="text-xl font-light text-display md:text-2xl">
        <TextAreaForm
          localStateValue={subtitle}
          textArea={{
            placeholder: "Programme subtitle",
            styles: "tracking-wide uppercase",
          }}
          onSubmit={actions.subtitle}
          tooltip="Click to edit subtitle"
          key={undoKey}
        />
      </div>
      <div className="overflow-x-auto font-display text-5xl font-bold tracking-wide text-displayGreen md:text-7xl">
        <TextInputForm
          localStateValue={title}
          input={{
            placeholder: "Programme title",
            styles: "tracking-wide font-bold",
          }}
          onSubmit={actions.title}
          tooltip="Click to edit title"
          key={undoKey}
        />
      </div>
    </div>
  );
};

export default Headings;

import { TextAreaForm } from "~/components/forms";
import { UedCx } from "~/context/user-editable-data";

const Headings = () => {
  const {
    store: {
      data: { title },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Workshop.use();

  return (
    <div className="font-display text-7xl text-displayGreen">
      <TextAreaForm
        localStateValue={title}
        textArea={{
          placeholder: "Workshop title",
          styles: "tracking-wide font-bold",
        }}
        onSubmit={actions.title}
        tooltip="Click to edit title"
        key={undoKey}
      />
    </div>
  );
};

export default Headings;

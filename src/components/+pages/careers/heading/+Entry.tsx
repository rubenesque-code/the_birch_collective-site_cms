import { TextInputForm } from "~/components/forms";
import { UedCx } from "~/context/user-editable-data";

const Heading = () => {
  const {
    store: {
      data: { heading },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Careers.use();

  return (
    <div className="font-display text-7xl text-displayGreen">
      <TextInputForm
        localStateValue={heading}
        input={{
          placeholder: "Page heading",
          styles: "tracking-wide font-bold",
        }}
        onSubmit={actions.heading}
        tooltip="Click to edit heading"
        key={undoKey}
      />
    </div>
  );
};

export default Heading;

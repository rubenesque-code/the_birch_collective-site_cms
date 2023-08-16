import { TextInputForm } from "~/components/forms";
import { UedCx } from "~/context/user-editable-data";

const Headings = () => {
  const {
    store: {
      data: { heading },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.TheoryOfChange.use();

  return (
    <div className="">
      <div className="font-display text-5xl font-bold tracking-wide text-displayGreen md:text-7xl">
        <TextInputForm
          localStateValue={heading}
          input={{
            placeholder: "Theory of change page heading",
            styles: "tracking-wide font-bold",
          }}
          onSubmit={actions.heading}
          tooltip="Click to edit heading"
          key={undoKey}
        />
      </div>
    </div>
  );
};

export default Headings;

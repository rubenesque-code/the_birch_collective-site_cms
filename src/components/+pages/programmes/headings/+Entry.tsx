import { TextInputForm } from "~/components/forms";
import { UedCx } from "~/context/user-editable-data";

const Headings = () => {
  const {
    store: {
      data: { heading },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Programmes.use();

  return (
    <div className="">
      <div className="text-center font-display text-5xl font-bold tracking-wide text-displayGreen md:text-7xl">
        <TextInputForm
          localStateValue={heading}
          input={{
            placeholder: "Programmes page heading",
            styles: "tracking-wide font-bold text-center",
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

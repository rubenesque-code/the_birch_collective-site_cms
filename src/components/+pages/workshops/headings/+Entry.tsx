import { TextInputForm } from "~/components/forms";

import { UedCx } from "~/context/user-editable-data";

const Heading = () => {
  const {
    store: {
      data: { heading },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Workshops.use();

  return (
    <div className="">
      <div className="overflow-x-auto text-center font-display text-7xl text-displayGreen">
        <TextInputForm
          localStateValue={heading}
          input={{
            placeholder: "Workshops page heading",
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

export default Heading;

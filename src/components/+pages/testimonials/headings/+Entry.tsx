import { TextInputForm } from "~/components/forms";

import { UedCx } from "~/context/user-editable-data";

const Headings = () => {
  const {
    store: {
      data: { heading },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Testimonials.use();

  return (
    <div className="">
      <div className="overflow-x-auto font-display text-5xl font-bold tracking-wide text-displayGreen md:text-7xl">
        <TextInputForm
          localStateValue={heading}
          input={{
            placeholder: "Testimonials page heading",
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

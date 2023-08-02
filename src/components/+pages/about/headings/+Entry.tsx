import { TextInputForm } from "~/components/forms";
import { UedCx } from "~/context/user-editable-data";

const Headings = () => {
  const {
    store: {
      data: { heading, subheading },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.AboutUs.use();

  return (
    <div className="">
      <div className="text-xl font-light text-display md:text-2xl">
        <TextInputForm
          localStateValue={subheading}
          input={{
            placeholder: "About page subheading",
            styles: "tracking-wide uppercase",
          }}
          onSubmit={actions.subheading}
          tooltip="Click to edit subheading"
          key={undoKey}
        />
      </div>
      <div className="font-display text-5xl font-bold tracking-wide text-displayGreen md:text-7xl">
        <TextInputForm
          localStateValue={heading}
          input={{
            placeholder: "About page heading",
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

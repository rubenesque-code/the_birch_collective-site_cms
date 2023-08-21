import { TextInputForm } from "~/components/forms";

import JobPosts from "./job-posts/+Entry";

import { UedCx } from "~/context/user-editable-data";

const Careers = () => (
  <div>
    <Heading />
    <div className="mt-md">
      <JobPosts />
    </div>
  </div>
);

export default Careers;

const Heading = () => {
  const {
    store: {
      data: {
        careers: { heading },
      },
      actions: {
        careers: { heading: headingAction },
      },
    },
    revision: { undoKey },
  } = UedCx.Pages.Careers.use();

  return (
    <div className="font-display text-5xl  text-brandRed">
      <TextInputForm
        localStateValue={heading}
        onSubmit={headingAction}
        input={{
          placeholder: "Careers heading",
          styles: "font-bold tracking-wide",
        }}
        tooltip="Click to edit careers heading"
        key={undoKey}
      />
    </div>
  );
};

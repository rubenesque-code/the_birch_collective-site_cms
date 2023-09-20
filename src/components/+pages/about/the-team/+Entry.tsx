import { TextAreaForm, TextInputForm } from "~/components/forms";

import Members from "./members/+Entry";

import { UedCx } from "~/context/user-editable-data";

const TheTeam = () => (
  <div>
    <Headings />
    <div className="mt-md">
      <Members />
    </div>
  </div>
);

export default TheTeam;

const Headings = () => {
  const {
    store: {
      data: {
        theTeam: { heading, text },
      },
      actions: { theTeam: theTeamActions },
    },
    revision: { undoKey },
  } = UedCx.Pages.AboutUs.use();

  return (
    <div>
      <div className="overflow-x-auto text-center font-display text-4xl font-bold text-brandOrange sm:text-5xl md:text-6xl">
        <TextInputForm
          localStateValue={heading}
          onSubmit={theTeamActions.heading}
          input={{ placeholder: "The team heading", styles: "text-center" }}
          tooltip="Click to edit the team heading"
          key={undoKey}
        />
      </div>
      <div className="custom-prose prose mt-lg w-full max-w-full overflow-x-auto">
        <TextAreaForm
          localStateValue={text}
          textArea={{
            placeholder: "The team description",
          }}
          onSubmit={theTeamActions.text}
          tooltip="Click to edit the team description"
          key={undoKey}
        />
      </div>
    </div>
  );
};

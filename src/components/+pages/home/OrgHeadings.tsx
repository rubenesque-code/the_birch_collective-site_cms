import { TextAreaForm } from "~/components/forms";
import { UedCx } from "~/context/user-editable-data";

const OrgHeadings = () => {
  const {
    orgHeadings: { byline, name },
  } = UedCx.Pages.Landing.useData();

  const { orgHeadings: orgHeadingsAction } = UedCx.Pages.Landing.useAction();

  const { undoKey } = UedCx.Pages.Landing.useRevision();

  return (
    <div className="flex justify-center">
      <div className="">
        <div className="w-full font-display text-8xl font-bold text-brandOrange">
          <TextAreaForm
            localStateValue={name}
            textArea={{
              placeholder: "Organisation name",
              styles: "text-center",
            }}
            onSubmit={orgHeadingsAction.name}
            tooltip="Click to edit title"
            key={undoKey}
          />
        </div>
        <div className="mt-4 flex w-full justify-center text-base uppercase tracking-wide text-brandOrange xs:text-xl sm:text-2xl md:mt-8 md:text-3xl lg:text-4xl">
          <TextAreaForm
            localStateValue={byline}
            textArea={{
              placeholder: "Organisation byline",
              styles: "upppercase tracking-wide text-center",
            }}
            onSubmit={orgHeadingsAction.byline}
            tooltip="Click to edit byline"
            key={undoKey}
          />
        </div>
      </div>
    </div>
  );
};

export default OrgHeadings;

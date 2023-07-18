import { TextAreaForm } from "~/components/forms";
import { UserEditableDataCx } from "./_state";
import { RevisionCx } from "./_state/RevisionCx";

const OrgHeadings = () => {
  const {
    orgHeadings: { byline, name },
  } = UserEditableDataCx.useData("page");
  const action = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="flex justify-center ">
      <div className="max-w-[96%] ">
        <div className="w-full font-display text-8xl font-bold text-brandOrange">
          <TextAreaForm
            localStateValue={name}
            textArea={{ placeholder: "Organisation name" }}
            onSubmit={({ inputValue }) => {
              action.page.orgHeadings.name.update(inputValue);
            }}
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
            onSubmit={({ inputValue }) => {
              action.page.orgHeadings.byline.update(inputValue);
            }}
            tooltip="Click to edit byline"
            key={undoKey}
          />
        </div>
      </div>
    </div>
  );
};

export default OrgHeadings;

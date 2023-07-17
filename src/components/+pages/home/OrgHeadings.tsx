import { TextAreaForm } from "~/components/forms";
import { UserEditableDataCx } from "./_state";
import { RevisionCx } from "./_state/RevisionCx";

const OrgHeadings = () => {
  const allData = UserEditableDataCx.useAllData();
  const {
    orgHeadings: { byline, name },
  } = UserEditableDataCx.useData("page");
  const userAction = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="flex flex-col items-center">
      {JSON.stringify(allData)}
      <div className="font-display text-8xl font-bold text-brandOrange">
        <TextAreaForm
          localStateValue={name}
          input={{ placeholder: "Organisation name" }}
          onSubmit={({ inputValue }) => {
            userAction.page.orgHeadings.name.update(inputValue);
          }}
          tooltip="Click to edit title"
          key={undoKey}
        />
      </div>
      <div className="mt-4 text-base uppercase tracking-wide text-brandOrange xs:text-xl sm:text-2xl md:mt-8 md:text-3xl lg:text-4xl">
        <TextAreaForm
          localStateValue={byline}
          input={{
            placeholder: "Organisation byline",
            styles: "upppercase tracking-wide",
          }}
          onSubmit={({ inputValue }) => {
            userAction.page.orgHeadings.byline.update(inputValue);
          }}
          tooltip="Click to edit byline"
          key={undoKey}
        />
      </div>
    </div>
  );
};

export default OrgHeadings;

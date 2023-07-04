import { TextInputForm } from "~/components/forms";
import { UserEditableData } from "./_state";
import { RevisionContext } from "./_state/RevisionContext";

const OrgHeadings = () => {
  const allData = UserEditableData.useAllData();
  const { byline, name } = UserEditableData.useData("orgHeadings");
  const userAction = UserEditableData.useAction();
  const {
    data: { undoKey },
  } = RevisionContext.use();

  return (
    <div className="flex flex-col items-center">
      {JSON.stringify(allData)}
      <div className="font-display text-8xl font-bold text-brandOrange">
        <TextInputForm
          localStateValue={name}
          input={{ placeholder: "Organisation name" }}
          onSubmit={({ inputValue }) => {
            userAction.orgHeadings.name.update(inputValue);
          }}
          tooltip="Click to edit title"
          key={undoKey}
        />
      </div>
      <div className="mt-4 text-base uppercase tracking-wide text-brandOrange xs:text-xl sm:text-2xl md:mt-8 md:text-3xl lg:text-4xl">
        <TextInputForm
          localStateValue={byline}
          input={{
            placeholder: "Organisation byline",
            styles: "upppercase tracking-wide",
          }}
          onSubmit={({ inputValue }) => {
            userAction.orgHeadings.byline.update(inputValue);
          }}
          tooltip="Click to edit byline"
          key={undoKey}
        />
      </div>
    </div>
  );
};

export default OrgHeadings;

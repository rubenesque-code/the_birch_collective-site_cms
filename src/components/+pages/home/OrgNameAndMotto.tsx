import { TextInputForm } from "~/components/forms";
import { UserEditableData } from "./_state";

const OrgNameAndMotto = () => {
  const allData = UserEditableData.useAllData();
  const { byline, name } = UserEditableData.useData("orgNameAndByline");
  const userAction = UserEditableData.useAction();

  return (
    <div className="flex flex-col items-center">
      {JSON.stringify(allData)}
      <div className="font-display text-8xl font-bold text-brandOrange">
        <TextInputForm
          initialValue={name}
          input={{ placeholder: "Organisation Name" }}
          onSubmit={({ inputValue }) => {
            userAction.orgNameAndByline.name(inputValue);
          }}
          tooltip="Click to edit title"
        />
      </div>
      <div className="mt-4 text-base uppercase tracking-wide text-brandOrange xs:text-xl sm:text-2xl md:mt-8 md:text-3xl lg:text-4xl">
        <TextInputForm
          initialValue={byline}
          input={{
            placeholder: "Organisation byline",
            styles: "upppercase tracking-wide",
          }}
          onSubmit={({ inputValue }) => {
            userAction.orgNameAndByline.byline(inputValue);
          }}
          tooltip="Click to edit byline"
        />
      </div>
    </div>
  );
};

export default OrgNameAndMotto;

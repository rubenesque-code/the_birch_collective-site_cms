import { TextInputForm } from "~/components/forms";
import { UserEditableData } from "./_state";

const OrgNameAndMotto = () => {
  const orgNameAndByLine = UserEditableData.useData("orgNameAndByline");
  const userAction = UserEditableData.useAction();

  return (
    <div className="flex flex-col items-center">
      {JSON.stringify(orgNameAndByLine)}
      <div className="font-display text-8xl font-bold text-orange">
        <TextInputForm
          input={{ initialValue: "hello", placeholder: "Organisation Name" }}
          onSubmit={() => null}
          tooltip={{ text: "Click to edit title" }}
        />
      </div>
      <button onClick={() => userAction.orgNameAndByline.name("UPDATED 3")}>
        Update Name
      </button>
    </div>
  );
};

export default OrgNameAndMotto;

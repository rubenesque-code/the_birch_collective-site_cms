import { TextInputForm } from "~/components/forms";
import { UserEditableDataStore } from "./_state";

const OrgNameAndMotto = () => {
  const orgNameAndByLine = UserEditableDataStore.useData("orgNameAndByline");
  const updateOrgName = UserEditableDataStore.useAction("orgName", "update");

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
      <button onClick={() => updateOrgName("UPDATED 4")}>Update Name</button>
    </div>
  );
};

export default OrgNameAndMotto;

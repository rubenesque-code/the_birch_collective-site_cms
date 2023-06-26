import { TextInputForm } from "~/components/forms";

// TODO:
// (1) Fetch and post data for below. Create data structure.
// (2) Sort out image upload

const OrgNameAndMotto = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-display text-8xl font-bold text-orange">
        <TextInputForm
          input={{ initialValue: "hello", placeholder: "Organisation Name" }}
          onSubmit={() => null}
          tooltip={{ text: "Click to edit title" }}
        />
      </div>
    </div>
  );
};

export default OrgNameAndMotto;

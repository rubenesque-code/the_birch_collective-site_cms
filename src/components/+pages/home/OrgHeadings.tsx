import { TextAreaForm } from "~/components/forms";
import { UserEditableDataCx } from "./_state";

const OrgHeadings = () => {
  const {
    orgHeadings: { byline, name },
  } = UserEditableDataCx.useData("page");
  const action = UserEditableDataCx.useAction();

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
            onSubmit={action.page.orgHeadings.name.update}
            tooltip="Click to edit title"
          />
        </div>
        <div className="mt-4 flex w-full justify-center text-base uppercase tracking-wide text-brandOrange xs:text-xl sm:text-2xl md:mt-8 md:text-3xl lg:text-4xl">
          <TextAreaForm
            localStateValue={byline}
            textArea={{
              placeholder: "Organisation byline",
              styles: "upppercase tracking-wide text-center",
            }}
            onSubmit={action.page.orgHeadings.byline.update}
            tooltip="Click to edit byline"
          />
        </div>
      </div>
    </div>
  );
};

export default OrgHeadings;

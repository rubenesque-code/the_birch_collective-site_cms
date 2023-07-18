import { TextInputForm } from "~/components/forms";
import { UserEditableDataCx } from "../_state";

const Programmes = () => {
  return <div></div>;
};

export default Programmes;

const Headings = () => {
  const {
    page: { programmes },
  } = UserEditableDataCx.useAllData();

  const {
    page: { programmes: programmesAction },
  } = UserEditableDataCx.useAction();

  return (
    <div>
      <div>
        <TextInputForm
          localStateValue={programmes.heading}
          onSubmit={({ inputValue }) =>
            programmesAction.heading.update(inputValue)
          }
        />
      </div>
    </div>
  );
};

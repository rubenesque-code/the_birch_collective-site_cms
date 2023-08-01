import { TextAreaForm } from "~/components/forms";
import { UedCx } from "~/context/user-editable-data";

const MainText = () => {
  const {
    store: {
      data: { mainText },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.AboutUs.use();

  return (
    <div className="">
      <TextAreaForm
        localStateValue={mainText}
        textArea={{
          placeholder: "Main about us text",
          styles: "custom-prose prose max-w-full",
        }}
        onSubmit={actions.mainText}
        tooltip="Click to edit main text"
        key={undoKey}
      />
    </div>
  );
};

export default MainText;

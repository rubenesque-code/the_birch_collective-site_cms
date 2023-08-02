import { TextAreaForm } from "~/components/forms";
import CmsLayout from "~/components/layouts/Cms";
import { UedCx } from "~/context/user-editable-data";

const MainText = () => {
  const {
    store: {
      data: { mainText },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Programmes.use();

  return (
    <div>
      <CmsLayout.EditBar>
        <CmsLayout.EditBar.Info infoText="The text area below is an approximation of how the text will look on the actual site." />
      </CmsLayout.EditBar>
      <div className="custom-prose prose mt-sm w-full max-w-full">
        <TextAreaForm
          localStateValue={mainText}
          textArea={{
            placeholder: "Main programmes text",
          }}
          onSubmit={actions.mainText}
          tooltip="Click to edit main text"
          key={undoKey}
        />
      </div>
    </div>
  );
};

export default MainText;

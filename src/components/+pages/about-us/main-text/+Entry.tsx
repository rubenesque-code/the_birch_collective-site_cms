import { TextAreaForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
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
    <div>
      <CmsLayout.EditBar>
        <div className="flex items-center gap-sm text-sm text-gray-400">
          <span>
            <Icon.Info />
          </span>
          <p className="">
            The text area below is an approximation of how the text will look on
            the actual site.
          </p>
        </div>
      </CmsLayout.EditBar>
      <div className="custom-prose prose mt-sm w-full max-w-full">
        <TextAreaForm
          localStateValue={mainText}
          textArea={{
            placeholder: "Main about us text",
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

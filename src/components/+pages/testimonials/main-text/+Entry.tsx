import Markdown from "markdown-to-jsx";
import { TextAreaForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { Modal } from "~/components/styled-bases";
import { UedCx } from "~/context/user-editable-data";

const MainText = () => {
  const {
    store: {
      data: { mainText },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Testimonials.use();

  return (
    <div className="group/main-text">
      <CmsLayout.EditBar className="opacity-40 group-hover/main-text:opacity-80 hover:!opacity-100">
        <PreviewModal />
        <CmsLayout.EditBar.Info
          infoText="The text below is an approximation. See preview left."
          gap="xs"
        />
      </CmsLayout.EditBar>
      <div className="custom-prose prose mt-sm w-full max-w-full">
        <TextAreaForm
          localStateValue={mainText}
          textArea={{
            placeholder: "Main testimonials page text",
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

const PreviewModal = () => {
  const {
    store: {
      data: { mainText },
    },
  } = UedCx.Pages.Testimonials.use();

  return (
    <Modal.WithVisibilityProvider
      button={({ openModal }) => (
        <CmsLayout.EditBar.Button
          icon={<Icon.SitePreview />}
          onClick={openModal}
          text="preview text"
        />
      )}
      panelContent={({ closeModal }) => (
        <div className="rounded-lg bg-white p-lg shadow-xl">
          <div className="flex justify-end">
            <h2 className="flex items-center gap-xs  text-gray-400">
              <span>
                <Icon.SitePreview />
              </span>
              <span>preview</span>
            </h2>
          </div>
          <div className="custom-prose prose mt-lg max-w-full gap-10 md:columns-2">
            <Markdown>{mainText}</Markdown>
          </div>
          <div className="mt-xl flex justify-end">
            <button
              className="my-btn my-btn-neutral"
              type="button"
              onClick={closeModal}
            >
              close
            </button>
          </div>
        </div>
      )}
    />
  );
};

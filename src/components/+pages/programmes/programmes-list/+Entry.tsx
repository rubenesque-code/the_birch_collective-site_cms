import CmsLayout from "~/components/layouts/Cms";
import ProgrammesModal from "./programmes-modal/+Entry";

const ProgrammesList = () => {
  return (
    <div>
      <CmsLayout.EditBar>
        <ProgrammesModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.EditButton
              buttonText="Edit programmes"
              onClick={openModal}
            />
          )}
        />
        <CmsLayout.EditBar.Info
          infoText="Edit fields below from pop-up (left). Edit in depth from individual page."
          gap="xs"
        />
      </CmsLayout.EditBar>
    </div>
  );
};

export default ProgrammesList;

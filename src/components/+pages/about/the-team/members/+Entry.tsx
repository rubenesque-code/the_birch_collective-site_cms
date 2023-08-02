import CmsLayout from "~/components/layouts/Cms";
import MembersModal from "./members-modal/+Entry";

export const Members = () => {
  return (
    <div>
      <CmsLayout.EditBar>
        <MembersModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.EditButton
              buttonText="Edit members"
              onClick={openModal}
            />
          )}
        />
      </CmsLayout.EditBar>
    </div>
  );
};

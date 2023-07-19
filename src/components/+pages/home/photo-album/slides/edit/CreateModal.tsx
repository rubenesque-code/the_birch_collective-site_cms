import { Icon } from "~/components/icons";
import { ImageUploadAndLibrary } from "~/components/parts/upload-image-and-library";

export const CreateModal = () => {
  return (
    <ImageUploadAndLibrary.Complete
      menuButton={
        <div
          className={`group my-btn my-btn-neutral flex items-center gap-xs`}
          // onClick={newTestimonialModal.openModal}
        >
          <span className="text-sm">
            <Icon.Create />
          </span>
          <span className="text-sm font-medium">Add image</span>
        </div>
      }
      onUploadOrSelect={({ dbImageId }) => null}
    />
  );
};

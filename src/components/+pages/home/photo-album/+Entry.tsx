import { TextInputForm } from "~/components/forms";
import { UserEditableDataCx } from "../_state";
import { RevisionCx } from "../_state/RevisionCx";
import { Icon } from "~/components/icons";
import Slides from "./slides/+Entry";
import { EditModal } from "./slides/edit/+Entry";
import { ComponentMenu } from "~/components/menus";

const PhotoAlbum = () => {
  // const { page } = UserEditableDataCx.useAllData();
  // console.log("page:", page);
  return (
    <div className="group/photo-album flex justify-end">
      <div className="w-3/4">
        <Heading />
        <Entries />
      </div>
    </div>
  );
};

export default PhotoAlbum;

const Heading = () => {
  const {
    page: {
      photoAlbum: { heading },
    },
  } = UserEditableDataCx.useAllData();

  const {
    page: { photoAlbum: photoAlbumAction },
  } = UserEditableDataCx.useAction();

  const {
    data: { undoKey },
  } = RevisionCx.use();

  return (
    <div className="flex items-center justify-end gap-xs">
      <TextInputForm
        localStateValue={heading}
        onSubmit={({ inputValue }) =>
          photoAlbumAction.heading.update(inputValue)
        }
        input={{ placeholder: "Photo album heading", styles: "uppercase" }}
        tooltip="Click to edit heading"
        key={undoKey}
      />
      <Icon.ArrowRight />
    </div>
  );
};

const Entries = () => {
  return (
    <div className="relative aspect-video overflow-visible bg-red-300">
      <ComponentMenu styles="top-1 right-1 group-hover/photo-album:opacity-40">
        <EditModal
          button={({ openModal }) => (
            <ComponentMenu.Button onClick={openModal} tooltip="Edit images">
              <Icon.Configure />
            </ComponentMenu.Button>
          )}
        />
      </ComponentMenu>
      <Slides />
    </div>
  );
};

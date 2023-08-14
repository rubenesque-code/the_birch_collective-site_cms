import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import Slides from "./slides/+Entry";
import { EditModal } from "./slides/edit/+Entry";
import { UedCx } from "~/context/user-editable-data";
import { TextInputForm } from "~/components/forms";

const PhotoAlbum = () => {
  const {
    store: {
      data: { photoAlbum },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Workshop.use();

  return (
    <div className="group/photo-album relative">
      <ComponentMenu styles="right-1 top-1 group-hover/photo-album:opacity-40">
        <EditModal
          button={({ openModal }) => (
            <ComponentMenu.Button
              tooltip="Edit photo album"
              onClick={openModal}
            >
              <Icon.Configure />
            </ComponentMenu.Button>
          )}
        />
      </ComponentMenu>
      <div className="ml-md rounded-md bg-[#b1cd84] p-sm">
        <div className="relative h-[400px] overflow-visible">
          <Slides
            heading={
              <div className="text-sm text-gray-500">
                <TextInputForm
                  localStateValue={photoAlbum.heading}
                  input={{
                    placeholder: "photo album heading",
                  }}
                  onSubmit={actions.photoAlbum.heading}
                  tooltip="Click to edit photo album heading"
                  key={undoKey}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoAlbum;

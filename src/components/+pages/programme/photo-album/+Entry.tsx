import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import Slides from "./slides/+Entry";
import { EditModal } from "./slides/edit/+Entry";
import { UedCx } from "~/context/user-editable-data";
import { TextInputForm } from "~/components/forms";

const PhotoAlbum = () => {
  return (
    <div className="group/photo-album relative grid w-full place-items-center">
      <div className="w-3/4">
        <Heading />
        <div className="relative aspect-video overflow-visible">
          <SlidesMenu />
          <Slides />
        </div>
      </div>
    </div>
  );
};

export default PhotoAlbum;

const Heading = () => {
  const {
    store: {
      data: { photoAlbum },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Programme.use();

  return (
    <div className="mb-sm font-display text-2xl text-brandBrown">
      <TextInputForm
        localStateValue={photoAlbum.heading}
        input={{
          placeholder: "photo album heading",
          styles: "font-bold tracking-wider",
        }}
        onSubmit={actions.photoAlbum.heading}
        tooltip="Click to edit photo album heading"
        key={undoKey}
      />
    </div>
  );
};

const SlidesMenu = () => (
  <ComponentMenu styles="right-1 top-1 group-hover/photo-album:opacity-40">
    <EditModal
      button={({ openModal }) => (
        <ComponentMenu.Button tooltip="Edit photo album" onClick={openModal}>
          <Icon.Configure />
        </ComponentMenu.Button>
      )}
    />
  </ComponentMenu>
);

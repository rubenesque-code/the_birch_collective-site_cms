import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";

import { UedCx } from "~/context/user-editable-data";
import { useToast } from "~/hooks";

const TopEditBar = () => {
  const {
    store: {
      data: { usePosters, photoAlbum },
      actions,
    },
  } = UedCx.Programme.use();

  const toast = useToast();

  return (
    <CmsLayout.EditBar className="opacity-40 hover:opacity-100">
      <div className="flex items-center gap-sm">
        <CmsLayout.EditBar.Button
          icon={
            <div className="relative">
              <Icon.Images />

              {!usePosters ? (
                <div className="absolute left-1/2 top-1/2 z-10 h-[14px] w-[2.5px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-400" />
              ) : null}
            </div>
          }
          onClick={() => {
            actions.usePosters(!usePosters);

            toast.neutral(usePosters ? "posters hidden" : "showing posters");
          }}
          text="posters"
          tooltip={
            usePosters ? "click to hide posters" : "click to use posters"
          }
        />

        <CmsLayout.EditBar.Button
          icon={
            <div className="relative">
              <Icon.Slides />

              {!photoAlbum.use ? (
                <div className="absolute left-1/2 top-1/2 z-10 h-[14px] w-[2.5px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-400" />
              ) : null}
            </div>
          }
          onClick={() => {
            actions.photoAlbum.use(!photoAlbum.use);

            toast.neutral(
              photoAlbum.use ? "photo album hidden" : "showing photo album",
            );
          }}
          text="photo album"
          tooltip={
            photoAlbum.use
              ? "click to hide photo album"
              : "click to use photo album"
          }
        />
      </div>
    </CmsLayout.EditBar>
  );
};

export default TopEditBar;

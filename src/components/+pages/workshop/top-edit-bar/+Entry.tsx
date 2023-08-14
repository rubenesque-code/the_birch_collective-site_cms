import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { UedCx } from "~/context/user-editable-data";

const TopEditBar = () => {
  const {
    store: {
      data: { bannerImage, type },
      actions,
    },
  } = UedCx.Pages.Workshop.use();

  return (
    <CmsLayout.EditBar className="opacity-40 hover:opacity-100">
      <div className="flex items-center gap-sm">
        <CmsLayout.EditBar.Button
          icon={
            <div className="relative">
              <Icon.Paid />

              {type === "free" ? (
                <div className="absolute left-1/2 top-1/2 z-10 h-[14px] w-[2.5px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-400" />
              ) : null}
            </div>
          }
          onClick={() => actions.type(type === "free" ? "paid" : "free")}
          text={type === "free" ? "Free" : "Paid"}
          tooltip="Click to change workshop type"
        />

        <CmsLayout.EditBar.Button
          icon={
            <div className="relative">
              <Icon.Image />

              {!bannerImage.use ? (
                <div className="absolute left-1/2 top-1/2 z-10 h-[14px] w-[2.5px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-400" />
              ) : null}
            </div>
          }
          onClick={() => actions.bannerImage.use(!bannerImage.use)}
          text="banner image"
          tooltip={
            bannerImage.use
              ? "click to hide banner image"
              : "click to use banner image"
          }
        />
      </div>

      <CmsLayout.EditBar.Info infoText="Change workshop type (left) for ticketed or free sign-up" />
    </CmsLayout.EditBar>
  );
};

export default TopEditBar;

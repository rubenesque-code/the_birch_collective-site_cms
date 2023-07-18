import type { ReactNode } from "react";

import { Button } from "./Button";
import { ImageSelectModal } from "./ImageSelectModal";
import { ImagePositionMenu } from "./ImagePositionMenu";

const ComponentMenu = ({
  children,
  styles = "",
}: {
  children: ReactNode;
  styles?: string;
}) => (
  <div
    className={`absolute z-20 flex items-center gap-sm rounded-md bg-white px-xs py-xxs opacity-0 shadow-lg transition-opacity duration-75 ease-in-out hover:!opacity-100 ${styles}`}
  >
    {children}
  </div>
);

export { ComponentMenu };

const Divider = () => <span className="h-[16px] w-[0.5px] bg-gray-200" />;

ComponentMenu.Button = Button;
ComponentMenu.Divider = Divider;

function Image() {
  throw new Error(
    "ComponentMenu.Image exists for naming purposes only and should not be used as a component",
  );
}

ComponentMenu.Image = Image;

Image.UploadAndLibraryModal = ImageSelectModal;
Image.PositionMenu = ImagePositionMenu;

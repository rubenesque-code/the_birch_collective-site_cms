import { Button } from "./Button";
import { ComponentMenuImageUploadAndLibrary } from "./ImageUploadAndLibrary";

function ComponentMenu() {
  throw new Error(
    "Menu exists for naming purposes only and should not be used as a component",
  );
}

export { ComponentMenu };

const Divider = () => <span className="h-[16px] w-[0.5px] bg-gray-200" />;

ComponentMenu.Button = Button;
ComponentMenu.Divider = Divider;
ComponentMenu.Image = ComponentMenuImageUploadAndLibrary;

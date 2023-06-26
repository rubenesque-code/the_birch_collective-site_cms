import { MenuAndModals } from "./MenuAndModals";
import { MenuAndModalsWithProvider } from "./MenuAndModalsWithProvider";
import { ModalsVisibilityContext } from "./ModalsVisibiltyContext";

const ImageUploadAndLibrary = () => {
  throw new Error(
    "ImageUploadAndLibrary exists for naming purposes only and should not be used as a component",
  );
};

export { ImageUploadAndLibrary };

ImageUploadAndLibrary.WithProvider = MenuAndModalsWithProvider;
ImageUploadAndLibrary.WithoutProvider = MenuAndModals;
ImageUploadAndLibrary.ModalsVisibilityContext = ModalsVisibilityContext;

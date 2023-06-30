import { MenuAndModals } from "./MenuAndModals";
import { MenuAndModalsWithProviders } from "./MenuAndModalsWithProvider";
import { ModalsVisibility } from "./_state/ModalsVisibiltyContext";

const ImageUploadAndLibrary = () => {
  throw new Error(
    "ImageUploadAndLibrary exists for naming purposes only and should not be used as a component",
  );
};

export { ImageUploadAndLibrary };

ImageUploadAndLibrary.Complete = MenuAndModalsWithProviders;
ImageUploadAndLibrary.WithoutProvider = MenuAndModals;
ImageUploadAndLibrary.ModalsVisibilityContext = ModalsVisibility;

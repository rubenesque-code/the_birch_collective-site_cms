import { MenuAndModals } from "./MenuAndModals";
import { MenuAndModalsWithProviders } from "./MenuAndModalsWithProvider";
import { ModalsVisibilityContext, type ComponentAPIProps } from "./_state";

const ImageUploadAndLibrary = () => {
  throw new Error(
    "ImageUploadAndLibrary exists for naming purposes only and should not be used as a component",
  );
};

export { ImageUploadAndLibrary, type ComponentAPIProps as ComponentProps };

ImageUploadAndLibrary.Complete = MenuAndModalsWithProviders;
ImageUploadAndLibrary.WithoutProvider = MenuAndModals;
ImageUploadAndLibrary.ModalsVisibilityContext = ModalsVisibilityContext;

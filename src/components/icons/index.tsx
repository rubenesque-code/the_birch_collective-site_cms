import {
  FileImage,
  Image,
  Upload,
  Check,
  WarningCircle,
  Info,
  Warning,
} from "@phosphor-icons/react";

const Icon = () => {
  throw new Error(
    "Icon exists for naming purposes only and should not be used as a component",
  );
};

export { Icon };

Icon.Image = Image;
Icon.Upload = Upload;
Icon.FileImage = FileImage;
Icon.Success = Check;
Icon.Error = WarningCircle;
Icon.Alert = Warning;
Icon.Info = Info;

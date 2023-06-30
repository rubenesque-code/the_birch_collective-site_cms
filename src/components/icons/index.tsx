import {
  FileImage,
  Image,
  Upload,
  Check,
  WarningCircle,
  Info,
  Warning,
  SignOut,
  List,
  FloppyDisk,
  ArrowCounterClockwise,
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
Icon.SignOut = SignOut;
Icon.HeaderMenu = List;
Icon.Save = FloppyDisk;
Icon.Undo = ArrowCounterClockwise;

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
  Trash,
  ArrowLineDown,
  ArrowLineUp,
  ArrowLineLeft,
  ArrowLineRight,
  ArrowsOutCardinal,
  XSquare,
  GearSix,
  Plus,
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
Icon.Delete = Trash;
Icon.PosDown = ArrowLineDown;
Icon.PosUp = ArrowLineUp;
Icon.PosRight = ArrowLineRight;
Icon.PosLeft = ArrowLineLeft;
Icon.ChangePos = ArrowsOutCardinal;
Icon.HideExpandable = XSquare;
Icon.Configure = GearSix;
Icon.Create = Plus;

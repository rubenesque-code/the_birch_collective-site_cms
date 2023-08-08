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
  DotsSixVertical,
  ArrowRight,
  CaretRight,
  CaretLeft,
  Minus,
  Tree,
  PiggyBank,
  FlowArrow,
  CaretDown,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  CaretUp,
  MonitorPlay,
  OrangeSlice,
  Leaf,
  FlowerTulip,
  PottedPlant,
  FlowerLotus,
  Feather,
  Flame,
  FishSimple,
  Mountains,
  Moon,
  Grains,
  Star,
  Tipi,
  Sun,
  Plant,
  ArrowsCounterClockwise,
  ArrowDown,
  ArrowUp,
  ArrowSquareIn,
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
Icon.DndHandle = DotsSixVertical;
Icon.ArrowRight = ArrowRight;
Icon.CaretRight = CaretRight;
Icon.CaretDown = CaretDown;
Icon.Remove = Minus;
Icon.CaretLeft = CaretLeft;
Icon.Programme = Tree;
Icon.Supporter = PiggyBank;
Icon.ConnectEntity = FlowArrow;
Icon.Facebook = FacebookLogo;
Icon.Instagram = InstagramLogo;
Icon.Linkedin = LinkedinLogo;
Icon.CaretUp = CaretUp;
Icon.SitePreview = MonitorPlay;
Icon.Update = ArrowsCounterClockwise;
Icon.ArrowDown = ArrowDown;
Icon.ArrowUp = ArrowUp;
Icon.InternalLink = ArrowSquareIn;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCottonBureau } from "@fortawesome/free-brands-svg-icons";
import type { MyOmit } from "~/types/utilities";
import type { ComponentProps } from "react";

const AboutUsIcon = (
  props: MyOmit<ComponentProps<typeof FontAwesomeIcon>, "icon">,
) => <FontAwesomeIcon icon={faCottonBureau} {...props} />;

Icon.AboutUs = AboutUsIcon;

const BulletIcon = () => {
  throw new Error(
    "BulletIcon exists for naming purposes only and should not be used as a component",
  );
};

Icon.Bullet = BulletIcon;

BulletIcon.Leaf = Leaf;
BulletIcon.Tree = Tree;
BulletIcon.Orange = OrangeSlice;
BulletIcon.Plant = Plant;
BulletIcon.PottedPlant = PottedPlant;
BulletIcon.Tulip = FlowerTulip;
BulletIcon.Lotus = FlowerLotus;
BulletIcon.Feather = Feather;
BulletIcon.Flame = Flame;
BulletIcon.Fish = FishSimple;
BulletIcon.Mountains = Mountains;
BulletIcon.Moon = Moon;
BulletIcon.Grains = Grains;
BulletIcon.Star = Star;
BulletIcon.Tipi = Tipi;
BulletIcon.Sun = Sun;

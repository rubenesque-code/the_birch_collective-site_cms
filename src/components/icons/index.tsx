import {
  ArrowCounterClockwise,
  ArrowDown,
  ArrowLineDown,
  ArrowLineLeft,
  ArrowLineRight,
  ArrowLineUp,
  ArrowRight,
  ArrowSquareIn,
  ArrowUp,
  ArrowsCounterClockwise,
  ArrowsOutCardinal,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Check,
  Clock,
  DotsSixVertical,
  Download,
  FacebookLogo,
  Feather,
  FileImage,
  FishSimple,
  Flame,
  FloppyDisk,
  FlowArrow,
  FlowerLotus,
  FlowerTulip,
  Gavel,
  GearSix,
  Grains,
  Image,
  Info,
  InstagramLogo,
  Leaf,
  LinkedinLogo,
  List,
  Minus,
  MonitorPlay,
  Moon,
  Mountains,
  OrangeSlice,
  PiggyBank,
  Plant,
  Plus,
  PottedPlant,
  ReadCvLogo,
  SignOut,
  Star,
  Sun,
  Tipi,
  ToggleLeft,
  Trash,
  Tree,
  Upload,
  Warning,
  WarningCircle,
  XSquare,
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
Icon.VolunteerPositon = Gavel;
Icon.Date = Clock;
Icon.Download = Download;
Icon.JobPost = ReadCvLogo;
Icon.ToggleOff = ToggleLeft;

import { faCottonBureau } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ComponentProps } from "react";
import type { MyOmit } from "~/types/utilities";

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

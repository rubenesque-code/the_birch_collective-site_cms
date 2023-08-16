import { ProgrammeCx } from "./ProgrammeCx";
import { PhotoAlbumEntryCx } from "./PhotoAlbumEntry";
import { SupporterCx } from "./SupporterCx";
import { PartnerCx } from "./PartnerCx";

function LandingCx() {
  throw new Error(
    "LandingCx exists for naming purposes only and should not be used as a component",
  );
}

export { LandingCx };

LandingCx.Programme = ProgrammeCx;
LandingCx.PhotoAlbumEntry = PhotoAlbumEntryCx;
LandingCx.Supporter = SupporterCx;
LandingCx.Partner = PartnerCx;

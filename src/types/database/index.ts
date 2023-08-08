import type { Footer } from "./footer";
import type { Header } from "./header";
import type { Image } from "./image";
import type { LinkLabels } from "./linkLabels";
import type { OrgDetails } from "./org-details";
import type { Pages } from "./pages";
import type { Programme } from "./programme";
import type { Supporter } from "./supporter";
import type { Testimonial } from "./testimonial";
import type { VolunteerPosition } from "./volunteerPosition";

export type MyDb = {
  pages: Pages;
  image: Image;
  testimonial: Testimonial;
  programme: Programme;
  supporter: Supporter;
  ["volunteer-positions"]: VolunteerPosition;
  singles: {
    orgDetails: OrgDetails;
    linkLabels: LinkLabels;
    header: Header;
    footer: Footer;
  };
};

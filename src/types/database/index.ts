import type { Image } from "./image";
import type { OrgDetails } from "./org-details";
import type { Pages } from "./pages";
import type { Programme } from "./programme";
import type { Supporter } from "./supporter";
import type { Testimonial } from "./testimonial";

export type MyDb = {
  orgDetails: OrgDetails;
  pages: Pages;
  image: Image;
  testimonial: Testimonial;
  programme: Programme;
  supporter: Supporter;
};

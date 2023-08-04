import { LandingPageDataCx } from "./landing-page";
import { FooterDataCx } from "./footer";
import { OrgDetailsDataCx } from "./org-details";
import { LinkLabelsDataCx } from "./link-labels";
import { HeaderDataCx } from "./header";
import { ProgrammesDataCx } from "./programmes";
import { TestimonialsDataCx } from "./testimonials";
import { SupportersDataCx } from "./supporters";
import { AboutUsPageDataCx } from "./about-us-page";
import { ProgrammesPageDataCx } from "./programmes-page";
import { ProgrammePageDataCx } from "./programme";

function UedCx() {
  throw new Error(
    "UedCx exists for naming purposes only and should not be used as a component",
  );
}

export { UedCx };

function Pages() {
  throw new Error(
    "Pages exists for naming purposes only and should not be used as a component",
  );
}

UedCx.Pages = Pages;

Pages.Landing = LandingPageDataCx;
Pages.AboutUs = AboutUsPageDataCx;
Pages.Programmes = ProgrammesPageDataCx;

UedCx.Footer = FooterDataCx;
UedCx.Header = HeaderDataCx;
UedCx.OrgDetails = OrgDetailsDataCx;
UedCx.LinkLabels = LinkLabelsDataCx;
UedCx.Programmes = ProgrammesDataCx;
UedCx.Programme = ProgrammePageDataCx;
UedCx.Testimonials = TestimonialsDataCx;
UedCx.Supporters = SupportersDataCx;

import { LandingPageDataCx } from "./landing-page";
import { FooterDataCx } from "./footer";
import { OrgDetailsDataCx } from "./org-details";
import { LinkLabelsDataCx } from "./link-labels";
import { HeaderDataCx } from "./header";
import { ProgrammesDataCx } from "./programmes";
import { ParticipantTestimonialsDataCx } from "./participant-testimonials";
import { SupportersDataCx } from "./supporters";
import { AboutUsPageDataCx } from "./about-us-page";
import { ProgrammesPageDataCx } from "./programmes-page";
import { ProgrammePageDataCx } from "./programme";
import { DonatePageDataCx } from "./donate-page";
import { VolunteerPositionsDataCx } from "./volunteer-positions";
import { VolunteerPositionsPageDataCx } from "./volunteer-positions-page";
import { CareersPageDataCx } from "./careers-page";
import { CareersDataCx } from "./careers";
import { WorkshopsPageDataCx } from "./workshops-page";
import { WorkshopsDataCx } from "./workshops";
import { WorkshopPageDataCx } from "./workshop-page";
import { PartnersDataCx } from "./partners";
import { TestimonialsPageDataCx } from "./testimonials-page";
import { ProfessionalTestimonialsDataCx } from "./professional-testimonials";

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
Pages.Testimonials = TestimonialsPageDataCx;
Pages.Programmes = ProgrammesPageDataCx;
Pages.Donate = DonatePageDataCx;
Pages.VolunteerPositions = VolunteerPositionsPageDataCx;
Pages.Careers = CareersPageDataCx;
Pages.Workshops = WorkshopsPageDataCx;
Pages.Workshop = WorkshopPageDataCx;

UedCx.Footer = FooterDataCx;
UedCx.Header = HeaderDataCx;
UedCx.OrgDetails = OrgDetailsDataCx;
UedCx.LinkLabels = LinkLabelsDataCx;
UedCx.Programmes = ProgrammesDataCx;
UedCx.Programme = ProgrammePageDataCx;
UedCx.ParticipantTestimonials = ParticipantTestimonialsDataCx;
UedCx.ProfessionalTestimonials = ProfessionalTestimonialsDataCx;
UedCx.Supporters = SupportersDataCx;
UedCx.Partners = PartnersDataCx;
UedCx.VolunteerPositions = VolunteerPositionsDataCx;
UedCx.Careers = CareersDataCx;
UedCx.Workshops = WorkshopsDataCx;

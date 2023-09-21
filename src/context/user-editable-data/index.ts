import { AboutUsPageDataCx } from "./about-us-page";
import { CareersDataCx } from "./careers";
import { CareersPageDataCx } from "./careers-page";
import { DonatePageDataCx } from "./donate-page";
import { DonateSuccessPageDataCx } from "./donate-success-page";
import { FooterDataCx } from "./footer";
import { HeaderDataCx } from "./header";
import { ImagesDataCx } from "./images";
import { KeywordDataCx } from "./keywords";
import { LandingPageDataCx } from "./landing-page";
import { LinkLabelsDataCx } from "./link-labels";
import { OrgDetailsDataCx } from "./org-details";
import { ParticipantTestimonialsDataCx } from "./participant-testimonials";
import { PartnersDataCx } from "./partners";
import { ProfessionalTestimonialsDataCx } from "./professional-testimonials";
import { ProgrammePageDataCx } from "./programme";
import { ProgrammesDataCx } from "./programmes";
import { ProgrammesPageDataCx } from "./programmes-page";
import { SupportersDataCx } from "./supporters";
import { TestimonialsPageDataCx } from "./testimonials-page";
import { TheoryOfChangePageDataCx } from "./theory-of-change-page";
import { VolunteerPositionsDataCx } from "./volunteer-positions";
import { VolunteerPositionsPageDataCx } from "./volunteer-positions-page";
import { WorkshopPageDataCx } from "./workshop-page";
import { WorkshopsDataCx } from "./workshops";
import { WorkshopsPageDataCx } from "./workshops-page";

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
Pages.TheoryOfChange = TheoryOfChangePageDataCx;
Pages.Programmes = ProgrammesPageDataCx;
Pages.Donate = DonatePageDataCx;
Pages.DonateSuccess = DonateSuccessPageDataCx;
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
UedCx.Images = ImagesDataCx;
UedCx.Keywords = KeywordDataCx;

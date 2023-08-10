import { Career, DocLinkButton } from "./career";
import { CareersPage } from "./careers-page";

function DbReadCx() {
  throw new Error(
    "DbReadCx exists for naming purposes only and should not be used as a component",
  );
}

export { DbReadCx };

DbReadCx.Career = Career;

Career.DocLinkButton = DocLinkButton;

function Pages() {
  throw new Error(
    "Pages exists for naming purposes only and should not be used as a component",
  );
}

DbReadCx.Pages = Pages;

Pages.Careers = CareersPage;

import { Career } from "./career";
import { CareersPage } from "./careers-page";
import { TheoryOfChangePage } from "./theory-of-change-page";
import { Workshop } from "./workshop";

function DbReadCx() {
  throw new Error(
    "DbReadCx exists for naming purposes only and should not be used as a component",
  );
}

export { DbReadCx };

DbReadCx.Career = Career;

DbReadCx.Workshop = Workshop;

DbReadCx.Image = Image;

function Pages() {
  throw new Error(
    "Pages exists for naming purposes only and should not be used as a component",
  );
}

DbReadCx.Pages = Pages;

Pages.Careers = CareersPage;
Pages.TheoryOfChange = TheoryOfChangePage;

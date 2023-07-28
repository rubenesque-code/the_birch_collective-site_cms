import { LandingPageDataCx } from "./landing-page";

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

import type { ReactNode } from "react";

function PageLayout() {
  throw new Error(
    "PageSectionLayout exists for naming purposes only and should not be used as a component",
  );
}

export default PageLayout;

const Body = ({ children }: { children: ReactNode }) => (
  <div className="grid place-items-center">
    <div className="div w-screen max-w-[1200px] items-center">{children}</div>
  </div>
);

PageLayout.Body = Body;

const SectionHorizontalSpacing = ({ children }: { children: ReactNode }) => (
  <div className="px-4 xs:px-8 sm:px-12 md:px-16 lg:px-24">{children}</div>
);

const SectionVerticalSpacing = ({ children }: { children: ReactNode }) => (
  <div className="py-4 xs:py-8 lg:py-12">{children}</div>
);

const Section = () => {
  throw new Error(
    "PageLayout.Section exists for naming purposes only and should not be used as a component",
  );
};

PageLayout.Section = Section;

function SectionDefault({ children }: { children: ReactNode }) {
  return (
    <SectionVerticalSpacing>
      <SectionHorizontalSpacing>{children}</SectionHorizontalSpacing>
    </SectionVerticalSpacing>
  );
}

Section.Default = SectionDefault;

const SectionSpacing = () => {
  throw new Error(
    "PageLayout.Section.Spacing exists for naming purposes only and should not be used as a component",
  );
};

Section.Spacing = SectionSpacing;

SectionSpacing.Horizontal = SectionHorizontalSpacing;
SectionSpacing.Vertical = SectionVerticalSpacing;

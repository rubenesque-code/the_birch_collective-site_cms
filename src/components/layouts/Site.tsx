import type { ReactNode } from "react";

function SiteLayout() {
  throw new Error(
    "PageSectionLayout exists for naming purposes only and should not be used as a component",
  );
}

export default SiteLayout;

const Body = ({
  children,
  styles,
}: {
  children: ReactNode;
  styles?: {
    outer?: string;
    inner?: string;
  };
}) => (
  <div
    className={`grid h-full flex-grow place-items-center overflow-y-auto overflow-x-hidden bg-gray-100 scrollbar-thin
  ${styles?.outer || ""}`}
  >
    <div
      className={`div w-screen max-w-[1200px] p-sm pr-md
       ${styles?.inner || ""}`}
    >
      <div className="bg-white">{children}</div>
    </div>
  </div>
);

SiteLayout.Body = Body;

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

SiteLayout.Section = Section;

function SectionSpacing({ children }: { children: ReactNode }) {
  return (
    <SectionVerticalSpacing>
      <SectionHorizontalSpacing>{children}</SectionHorizontalSpacing>
    </SectionVerticalSpacing>
  );
}

Section.Spacing = SectionSpacing;

SectionSpacing.Horizontal = SectionHorizontalSpacing;
SectionSpacing.Vertical = SectionVerticalSpacing;

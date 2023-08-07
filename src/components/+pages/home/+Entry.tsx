// logo, org name - not editable
// banner image + title needn't be movable
import { type ReactElement } from "react";
import { useQuery } from "react-query";

import { myDb } from "~/my-firebase/firestore";

import { RevisionCx } from "./_state/RevisionCx";

import { PageDataFetch } from "~/components/PageDataFetch";
import CmsHeader from "~/components/parts/cms-header/+Entry";
import SiteFooter from "~/components/parts/site-footer/+Entry";
import SiteHeader from "~/components/parts/site-header/+Entry";

import CmsLayout from "~/components/layouts/Cms";
import SiteLayout from "~/components/layouts/Site";
import { UedCx } from "~/context/user-editable-data";
import BannerImage from "./BannerImage";
import OrgHeadings from "./OrgHeadings";
import AboutUs from "./about-us/+Entry";
import PhotoAlbum from "./photo-album/+Entry";
import Programmes from "./programmes/+Entry";
import SupportUs from "./support-us/+Entry";
import Supporters from "./supporters/+Entry";
import Testimonials from "./testimonials/+Entry";
import Workshops from "./workshops/+Entry";
import type { MyDb } from "~/types/database";

// CHECK
// □ check image blur up works.

// REFACTOR
// □ abstraction for react-query onMutate, onSuccess, etc.?
// □ image abstraction?
// □ abstraction for unfound entity: e.g. image, programme, supporter.
// □ programmes modal on home page should be different. Same as one on programmes page?

// OTHER
// □ need to have production values in env.local?
// □ use zod in saving to db?
// □ should be able to work out by aspect ratio of image container and aspect ratio of image natural dimensions whether can move up/down and/or left/right.
// □ in revision.cx, on save success should use func input to update 'current db data'
// □ UserEditableDataCx should be renamed - have other editable Cx e.g. new testimonial. Rename to e.g. page editable cx
// □ missed toasts - e.g. on reorder
// □ should derive e.g. testimonial type from state used rather than db?
// □ ideally, don't want to show position buttons if there's an image error (unfound image) either. Would need to recomposoe image state or equivalent.
// □ Should have a subtle emboss of section name in each section? Maybe only if one/more text elements have no text
// □ supporters modal tooltip for 'add to landing' is incorrect since modal is for all supporters
// □ should memoise in revisionCx?
// □ rework process entity logic + types. Want to keep ids. Types could be improved. Must be a lodash helper? lodash.set as used in UedCx?
// □ on could not find entity page, etc., have cms header there + bg, though no revision buttons
// □ should show preview of e.g. programme main text if can't display how text will look within text-area

// STATE
// □ could have a queryOne in state data e.g. for programmes/testimonials

// todo: Will have to remove undo keys from text-input/area form? Re-work revision daat? make an unod key context?

const HomePage = () => (
  <InitDbData>
    {(initDbData) => (
      <UedProviders initDbData={initDbData}>
        <RevisionCx.Provider>
          {(revisionState) => (
            <CmsLayout.Body>
              <CmsHeader
                actions={revisionState.actions}
                data={{ isChange: revisionState.data.isChange }}
              />
              <SiteLayout.Body>
                <SiteHeader />
                <BannerImage />
                <SiteLayout.Section.Spacing>
                  <OrgHeadings />
                </SiteLayout.Section.Spacing>
                <SiteLayout.Section.Spacing>
                  <Testimonials />
                </SiteLayout.Section.Spacing>
                <SiteLayout.Section.Spacing>
                  <AboutUs />
                </SiteLayout.Section.Spacing>
                <SiteLayout.Section.Spacing>
                  <Workshops />
                </SiteLayout.Section.Spacing>
                <SiteLayout.Section.Spacing>
                  <Programmes />
                </SiteLayout.Section.Spacing>
                <SiteLayout.Section.Spacing.Vertical>
                  <PhotoAlbum />
                </SiteLayout.Section.Spacing.Vertical>
                <SiteLayout.Section.Spacing>
                  <SupportUs />
                </SiteLayout.Section.Spacing>
                <SiteLayout.Section.Spacing>
                  <Supporters />
                </SiteLayout.Section.Spacing>
                <SiteLayout.Section.Spacing.Horizontal>
                  <div className="mt-2xl pb-xl">
                    <SiteFooter />
                  </div>
                </SiteLayout.Section.Spacing.Horizontal>
              </SiteLayout.Body>
            </CmsLayout.Body>
          )}
        </RevisionCx.Provider>
      </UedProviders>
    )}
  </InitDbData>
);

export default HomePage;

type DbData = {
  page: MyDb["pages"]["landing"];
  testimonials: MyDb["testimonial"][];
  programmes: MyDb["programme"][];
  supporters: MyDb["supporter"][];
  orgDetails: MyDb["singles"]["orgDetails"];
  linkLabels: MyDb["singles"]["linkLabels"];
  header: MyDb["singles"]["header"];
  footer: MyDb["singles"]["footer"];
};

const InitDbData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const pageQuery = useQuery("landing", myDb.pages.landing.fetch);

  const footerQuery = useQuery("footer", myDb.footer.fetch);
  const headerQuery = useQuery("header", myDb.header.fetch);
  const linkLabelsQuery = useQuery("link-labels", myDb.linkLabels.fetch);
  const orgDetailsQuery = useQuery("org-details", myDb.orgDetails.fetch);

  const testimonialsQuery = useQuery("testimonials", myDb.testimonial.fetchAll);
  const programmesQuery = useQuery("programmes", myDb.programme.fetchAll);
  const supportersQuery = useQuery("supporters", myDb.supporter.fetchAll);

  if (
    pageQuery.isLoading ||
    testimonialsQuery.isLoading ||
    programmesQuery.isLoading ||
    supportersQuery.isLoading ||
    linkLabelsQuery.isLoading ||
    headerQuery.isLoading ||
    footerQuery.isLoading ||
    orgDetailsQuery.isLoading
  ) {
    return <PageDataFetch.Loading />;
  }

  if (
    pageQuery.isError ||
    !pageQuery.data ||
    testimonialsQuery.isError ||
    !testimonialsQuery.data ||
    programmesQuery.isError ||
    !programmesQuery.data ||
    supportersQuery.isError ||
    !supportersQuery.data ||
    linkLabelsQuery.isError ||
    !linkLabelsQuery.data ||
    headerQuery.isError ||
    !headerQuery.data ||
    footerQuery.isError ||
    !footerQuery.data ||
    orgDetailsQuery.isError ||
    !orgDetailsQuery.data
  ) {
    return <PageDataFetch.Error />;
  }

  return children({
    page: pageQuery.data,
    testimonials: testimonialsQuery.data,
    programmes: programmesQuery.data,
    supporters: supportersQuery.data,
    orgDetails: orgDetailsQuery.data,
    linkLabels: linkLabelsQuery.data,
    header: headerQuery.data,
    footer: footerQuery.data,
  });
};

const UedProviders = ({
  initDbData,
  children,
}: {
  initDbData: DbData;
  children: ReactElement;
}) => {
  return (
    <UedCx.Pages.Landing.Provider initData={initDbData.page}>
      <UedCx.OrgDetails.Provider initData={initDbData.orgDetails}>
        <UedCx.LinkLabels.Provider initData={initDbData.linkLabels}>
          <UedCx.Header.Provider initData={initDbData.header}>
            <UedCx.Footer.Provider initData={initDbData.footer}>
              <UedCx.Programmes.Provider initData={initDbData.programmes}>
                <UedCx.Testimonials.Provider initData={initDbData.testimonials}>
                  <UedCx.Supporters.Provider initData={initDbData.supporters}>
                    {children}
                  </UedCx.Supporters.Provider>
                </UedCx.Testimonials.Provider>
              </UedCx.Programmes.Provider>
            </UedCx.Footer.Provider>
          </UedCx.Header.Provider>
        </UedCx.LinkLabels.Provider>
      </UedCx.OrgDetails.Provider>
    </UedCx.Pages.Landing.Provider>
  );
};

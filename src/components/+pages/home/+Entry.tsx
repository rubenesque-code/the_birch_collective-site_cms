import { type ReactElement } from "react";
import { useQuery } from "react-query";

import { PageFramework } from "~/components/frameworks";
import SiteLayout from "~/components/layouts/Site";
import { PageDataFetch } from "~/components/PageDataFetch";
import CmsHeader from "~/components/parts/cms-header/+Entry";

import { CommonData, type CommonDbData } from "../_containers";
import { RevisionCx } from "./_state";
import AboutUs from "./about-us/+Entry";
import BannerImage from "./BannerImage";
import OrgHeadings from "./OrgHeadings";
import ParticipantTestimonials from "./participant-testimonials/+Entry";
import Partners from "./partners/+Entry";
import PhotoAlbum from "./photo-album/+Entry";
import Programmes from "./programmes/+Entry";
import SupportUs from "./support-us/+Entry";
import Supporters from "./supporters/+Entry";
import Workshops from "./workshops/+Entry";

import { UedCx } from "~/context/user-editable-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

// MUST DO

// CHECK
// □ check image blur up works
// □ remove sheet url from .env.local
// □ firestore + storage rules - open reads is unavoidable?
// □ remove unneeded users (ruben@virt....com) from firebase console

// TO DO
// □ go over connect image logic - don't need to fetch anymore since is all images fetched on page load. But do need to connect.
// □ need to delete storage image when delete fb image on save
// □ images page
// □ ability to edit image keywords
// □ delete firestore images that came from now deleted storage image (when playing around with compression)

// REFACTOR
// □ abstraction for react-query onMutate, onSuccess, etc.?
// □ image abstraction?
// □ abstraction for unfound entity: e.g. image, programme, supporter.

// OTHER

// □ On toggleable elements, can put toggle on actual element menu as well as top bar.
// □ Should have cancel deploy button
// □ Could poll for latest deploy data (take poll function from image upload)
// □ On images, make image name part of the entity + use for searches
// □ Programmes + workshops - toggle info section?
// □ AuthContext logic, along with firebase initauthstate, seems flawed. Probs need to extract initauthstate into its own context
// □ need to have production values in env.local?
// □ use zod in saving to db?
// □ careersPage.careers.text is never used? Should be?
// □ site header overflows. Visible if placeholders there, since they are long.
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
// □ make preview modal abstraction. Apply to each page.
// □ Is a double scroll bar in edit team members
// □ prop Option to have darker bg
// □ autofocus still triggers on textinputform
// □ option to toggle programme subtitle
// □ component menu delete button. Need span around icon? Want to be able to have text-gray-400 on cms.editbar. text needs to go red when hover on outer wrapper - not working properly.
// □ previews, e.g. programme section spreview, is vertically responsive?
// □ abstraction for preview. Apply sitelayout width
// □ dbreadcx is misnamed I think. It doesn't receive data from db directly. It just passes data.
// □ add info on programme and workshop pg should be a modal
// □ make form nicer. Only silde the text. Keep button in place but animate text within.
// □ workshop subtitle option on workshops page. put toggle button? Would have to be on modal too.
// □ short main texts shouldn't go to double columns
// □ apply e.g. responsive changes form frontend to this cms.
// □ clean up firestore functs. Some unneccessary. Apply helpers.
// □ ui feedback for e.g. image upload timeout.

// STATE
// □ could have a queryOne in state data e.g. for programmes/testimonials

// NEW SITE (if funding)
// □ living wage employer section in about us

// todo: Will have to remove undo keys from text-input/area form? Re-work revision daat? make an unod key context?

const HomePage = () => (
  <InitDbData>
    {(initDbData) => (
      <UserEditProviders dbData={initDbData}>
        <RevisionCx.Provider>
          {(revisionState) => (
            <PageFramework
              cmsHeader={
                <CmsHeader
                  actions={revisionState.actions}
                  data={{ isChange: revisionState.data.isChange }}
                />
              }
              pageSpecificComponents={<PageSpecificComponents />}
            />
          )}
        </RevisionCx.Provider>
      </UserEditProviders>
    )}
  </InitDbData>
);

export default HomePage;

const PageSpecificComponents = () => (
  <>
    <BannerImage />

    <SiteLayout.Section.Spacing>
      <OrgHeadings />
    </SiteLayout.Section.Spacing>

    <SiteLayout.Section.Spacing>
      <ParticipantTestimonials />
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
      <Partners />
    </SiteLayout.Section.Spacing>

    <SiteLayout.Section.Spacing>
      <Supporters />
    </SiteLayout.Section.Spacing>
  </>
);

type PageDbData = {
  page: MyDb["pages"]["landing"];

  "participant-testimonials": MyDb["participant-testimonial"][];
  programmes: MyDb["programme"][];
  supporters: MyDb["supporter"][];
  partners: MyDb["partner"][];
};

type DbData = {
  common: CommonDbData;

  page: PageDbData;
};

const usePageDbDataInit = () => {
  const pageQuery = useQuery("landing", myDb.pages.landing.fetch);

  const participantTestimonialsQuery = useQuery(
    "participant-testimonials",
    myDb["participant-testimonial"].fetchAll,
  );
  const partnersQuery = useQuery("partners", myDb.partner.fetchAll);
  const programmesQuery = useQuery("programmes", myDb.programme.fetchAll);
  const supportersQuery = useQuery("supporters", myDb.supporter.fetchAll);

  return {
    pageQuery,
    participantTestimonialsQuery,
    partnersQuery,
    programmesQuery,
    supportersQuery,
  };
};

const InitDbData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const {
    footerQuery,
    headerQuery,
    imagesQuery,
    keywordsQuery,
    linkLabelsQuery,
    orgDetailsQuery,
  } = CommonData.useQueries();

  const {
    pageQuery,
    participantTestimonialsQuery,
    partnersQuery,
    programmesQuery,
    supportersQuery,
  } = usePageDbDataInit();

  if (
    pageQuery.isLoading ||
    participantTestimonialsQuery.isLoading ||
    programmesQuery.isLoading ||
    supportersQuery.isLoading ||
    partnersQuery.isLoading ||
    linkLabelsQuery.isLoading ||
    headerQuery.isLoading ||
    footerQuery.isLoading ||
    imagesQuery.isLoading ||
    keywordsQuery.isLoading ||
    orgDetailsQuery.isLoading
  ) {
    return <PageDataFetch.Loading />;
  }

  if (
    pageQuery.isError ||
    !pageQuery.data ||
    participantTestimonialsQuery.isError ||
    !participantTestimonialsQuery.data ||
    programmesQuery.isError ||
    !programmesQuery.data ||
    supportersQuery.isError ||
    !supportersQuery.data ||
    partnersQuery.isError ||
    !partnersQuery.data ||
    linkLabelsQuery.isError ||
    !linkLabelsQuery.data ||
    headerQuery.isError ||
    !headerQuery.data ||
    footerQuery.isError ||
    !footerQuery.data ||
    orgDetailsQuery.isError ||
    !orgDetailsQuery.data ||
    imagesQuery.isError ||
    !imagesQuery.data ||
    keywordsQuery.isError ||
    !keywordsQuery.data
  ) {
    return <PageDataFetch.Error />;
  }

  return children({
    common: {
      footer: footerQuery.data,
      header: headerQuery.data,
      images: imagesQuery.data,
      keywords: keywordsQuery.data,
      linkLabels: linkLabelsQuery.data,
      orgDetails: orgDetailsQuery.data,
    },

    page: {
      page: pageQuery.data,
      "participant-testimonials": participantTestimonialsQuery.data,
      partners: partnersQuery.data,
      programmes: programmesQuery.data,
      supporters: supportersQuery.data,
    },
  });
};

const PageUserEditProviders = ({
  children,
  dbData,
}: {
  children: ReactElement;
  dbData: PageDbData;
}) => (
  <UedCx.Pages.Landing.Provider initData={dbData.page}>
    <UedCx.Programmes.Provider initData={dbData.programmes}>
      <UedCx.ParticipantTestimonials.Provider
        initData={dbData["participant-testimonials"]}
      >
        <UedCx.Supporters.Provider initData={dbData.supporters}>
          <UedCx.Partners.Provider initData={dbData.partners}>
            {children}
          </UedCx.Partners.Provider>
        </UedCx.Supporters.Provider>
      </UedCx.ParticipantTestimonials.Provider>
    </UedCx.Programmes.Provider>
  </UedCx.Pages.Landing.Provider>
);

const UserEditProviders = ({
  dbData,
  children,
}: {
  dbData: DbData;
  children: ReactElement;
}) => (
  <CommonData.UserEditProviders dbData={dbData.common}>
    <PageUserEditProviders dbData={dbData.page}>
      {children}
    </PageUserEditProviders>
  </CommonData.UserEditProviders>
);

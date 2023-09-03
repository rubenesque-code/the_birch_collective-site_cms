/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type ReactElement } from "react";
import { useQuery } from "react-query";

import { PageFramework } from "~/components/frameworks";
import SiteLayout from "~/components/layouts/Site";
import { PageDataFetch } from "~/components/PageDataFetch";
import CmsHeader from "~/components/parts/cms-header/+Entry";

import { CommonData, type CommonDbData } from "../_containers";
import { RevisionCx } from "./_state";
import BannerImage from "./banner-image/+Entry";
import Headings from "./headings/+Entry";
import MainText from "./main-text/+Entry";
import ParticipantTestimonials from "./participant-testimonials/+Entry";
import ProfessionalTestimonials from "./professional-testimonials/+Entry";

import { UedCx } from "~/context/user-editable-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

const TestimonialsPage = () => (
  <InitDbData>
    {(dbData) => (
      <UserEditProviders dbData={dbData}>
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

export default TestimonialsPage;

const PageSpecificComponents = () => (
  <>
    <BannerImage />

    <div className="mt-xl">
      <SiteLayout.Section.Spacing.Horizontal>
        <Headings />
      </SiteLayout.Section.Spacing.Horizontal>
    </div>

    <SiteLayout.Section.Spacing>
      <MainText />
    </SiteLayout.Section.Spacing>

    <SiteLayout.Section.Spacing>
      <ProfessionalTestimonials />
    </SiteLayout.Section.Spacing>

    <SiteLayout.Section.Spacing>
      <ParticipantTestimonials />
    </SiteLayout.Section.Spacing>
  </>
);

type PageDbData = {
  page: MyDb["pages"]["testimonials"];

  "participant-testimonials": MyDb["participant-testimonial"][];
  "professional-testimonials": MyDb["professional-testimonial"][];
};

const usePageSpecificDbDataInit = () => {
  const pageQuery = useQuery("testimonials", myDb.pages.testimonials.fetch);

  const participantTestimonialsQuery = useQuery(
    "participant-testimonials",
    myDb["participant-testimonial"].fetchAll,
  );
  const professionalTestimonialsQuery = useQuery(
    "professional-testimonials",
    myDb["professional-testimonial"].fetchAll,
  );

  return {
    pageQuery,
    participantTestimonialsQuery,
    professionalTestimonialsQuery,
  };
};

type DbData = {
  page: PageDbData;

  common: CommonDbData;
};

const InitDbData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const {
    pageQuery,
    participantTestimonialsQuery,
    professionalTestimonialsQuery,
  } = usePageSpecificDbDataInit();

  const {
    footerQuery,
    headerQuery,
    imagesQuery,
    keywordsQuery,
    linkLabelsQuery,
    orgDetailsQuery,
  } = CommonData.useQueries();

  const queriesArr = [
    ...[
      footerQuery,
      headerQuery,
      imagesQuery,
      keywordsQuery,
      linkLabelsQuery,
      orgDetailsQuery,
    ],
    ...[pageQuery, participantTestimonialsQuery, professionalTestimonialsQuery],
  ];

  if (queriesArr.some((query) => query.isLoading)) {
    return <PageDataFetch.Loading />;
  }

  if (
    queriesArr.some((query) => query.isError) ||
    queriesArr.some((query) => !query.data)
  ) {
    return <PageDataFetch.Error />;
  }

  return children({
    page: {
      page: pageQuery.data!,
      "participant-testimonials": participantTestimonialsQuery.data!,
      "professional-testimonials": professionalTestimonialsQuery.data!,
    },

    common: {
      footer: footerQuery.data!,
      header: headerQuery.data!,
      images: imagesQuery.data!,
      keywords: keywordsQuery.data!,
      linkLabels: linkLabelsQuery.data!,
      orgDetails: orgDetailsQuery.data!,
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
  <UedCx.Pages.Testimonials.Provider initData={dbData.page}>
    <UedCx.ParticipantTestimonials.Provider
      initData={dbData["participant-testimonials"]}
    >
      <UedCx.ProfessionalTestimonials.Provider
        initData={dbData["professional-testimonials"]}
      >
        {children}
      </UedCx.ProfessionalTestimonials.Provider>
    </UedCx.ParticipantTestimonials.Provider>
  </UedCx.Pages.Testimonials.Provider>
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

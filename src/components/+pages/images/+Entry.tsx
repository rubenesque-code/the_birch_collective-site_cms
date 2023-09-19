/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type ReactElement } from "react";
import { useQuery } from "react-query";

import CmsLayout from "~/components/layouts/Cms";
import { PageDataFetch } from "~/components/PageDataFetch";
import CmsHeader from "~/components/parts/cms-header/+Entry";

import { RevisionCx, SearchCx } from "./_state";
import ImageGrid from "./image-grid/+Entry";
import Search from "./search/+Entry";
import Upload from "./upload/+Entry";

import { UedCx } from "~/context/user-editable-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

const HomePage = () => (
  <InitDbData>
    {(dbData) => (
      <UserEditProviders dbData={dbData}>
        <RevisionCx.Provider>
          {(revisionState) => (
            <CmsLayout.Page>
              <CmsHeader
                actions={revisionState.actions}
                data={{ isChange: revisionState.data.isChange }}
              />

              <div className="h-full flex-grow  overflow-y-auto overflow-x-hidden px-lg pt-lg scrollbar-thin">
                <PageSpecificComponents />
              </div>
            </CmsLayout.Page>
          )}
        </RevisionCx.Provider>
      </UserEditProviders>
    )}
  </InitDbData>
);

export default HomePage;

const PageSpecificComponents = () => (
  <SearchCx.Provider>
    <>
      <Upload />

      <div className="mt-lg">
        <Search />
      </div>

      <div className="mt-lg">
        <ImageGrid />
      </div>
    </>
  </SearchCx.Provider>
);

type DbData = {
  images: MyDb["image"][];
  keywords: MyDb["keyword"][];
};

const InitDbData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const imagesQuery = useQuery("images", myDb.image.fetchAll);
  console.log("imagesQuery:", imagesQuery.data);
  const keywordsQuery = useQuery("keywords", myDb.keyword.fetchAll);

  const landingPageQuery = useQuery("landing-page", myDb.pages.landing.fetch);
  const aboutPageQuery = useQuery("about-page", myDb.pages.aboutUs.fetch);
  const programmesPageQuery = useQuery(
    "programmes-page",
    myDb.pages.landing.fetch,
  );
  const donatePageQuery = useQuery("donate-page", myDb.pages.donate.fetch);
  const volunteerPageQuery = useQuery(
    "volunteer-page",
    myDb.pages.landing.fetch,
  );
  const careersPageQuery = useQuery("careers-page", myDb.pages.career.fetch);
  const workshopsPageQuery = useQuery(
    "workshops-page",
    myDb.pages.workshops.fetch,
  );
  const testimonialsPageQuery = useQuery(
    "testimonials-page",
    myDb.pages.testimonials.fetch,
  );
  const theoryOfChangePageQuery = useQuery(
    "theory-of-change-page",
    myDb.pages["theory-of-change"].fetch,
  );

  const participantTestimonialsQuery = useQuery(
    "participant-testimonials",
    myDb["participant-testimonial"].fetchAll,
  );
  const professionalTestimonialsQuery = useQuery(
    "professional-testimonials",
    myDb["professional-testimonial"].fetchAll,
  );
  const programmesQuery = useQuery("programmes", myDb["programme"].fetchAll);
  const supportersQuery = useQuery("supporters", myDb["supporter"].fetchAll);
  const partnersQuery = useQuery("partners", myDb["partner"].fetchAll);
  const workshopsQuery = useQuery("workshops", myDb["workshop"].fetchAll);
  const orgDetailsQuery = useQuery("org-details", myDb["orgDetails"].fetch);

  const queriesArr = [
    imagesQuery,
    keywordsQuery,

    landingPageQuery,
    aboutPageQuery,
    programmesPageQuery,
    donatePageQuery,
    volunteerPageQuery,
    careersPageQuery,
    workshopsPageQuery,
    testimonialsPageQuery,
    theoryOfChangePageQuery,

    participantTestimonialsQuery,
    professionalTestimonialsQuery,
    programmesQuery,
    supportersQuery,
    partnersQuery,
    workshopsQuery,
    orgDetailsQuery,
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
    images: imagesQuery.data!,
    keywords: keywordsQuery.data!,
  });
};

const UserEditProviders = ({
  dbData,
  children,
}: {
  dbData: DbData;
  children: ReactElement;
}) => (
  <UedCx.Images.Provider dbData={dbData.images}>
    <UedCx.Keywords.Provider initData={dbData.keywords}>
      {children}
    </UedCx.Keywords.Provider>
  </UedCx.Images.Provider>
);

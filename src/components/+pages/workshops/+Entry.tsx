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
import Heading from "./headings/+Entry";
import MainText from "./main-text/+Entry";
import WorkshopsList from "./workshops-list/+Entry";

import { UedCx } from "~/context/user-editable-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

const WorkshopsPage = () => (
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

export default WorkshopsPage;

const PageSpecificComponents = () => (
  <>
    <BannerImage />

    <div className="mt-xl">
      <SiteLayout.Section.Spacing.Horizontal>
        <Heading />
      </SiteLayout.Section.Spacing.Horizontal>
    </div>

    <SiteLayout.Section.Spacing>
      <MainText />
    </SiteLayout.Section.Spacing>

    <SiteLayout.Section.Spacing>
      <WorkshopsList />
    </SiteLayout.Section.Spacing>
  </>
);

type PageSpecificDbData = {
  page: MyDb["pages"]["workshops"];

  workshops: MyDb["workshop"][];
};

type DbData = {
  page: PageSpecificDbData;

  common: CommonDbData;
};

const usePageDbDataInit = () => {
  const pageQuery = useQuery("workshops-page", myDb.pages.workshops.fetch);

  const workshopsQuery = useQuery("workshops", myDb.workshop.fetchAll);

  return {
    pageQuery,
    workshopsQuery,
  };
};

const InitDbData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const { pageQuery, workshopsQuery } = usePageDbDataInit();

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
    ...[pageQuery, workshopsQuery],
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
      workshops: workshopsQuery.data!,
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
  dbData: PageSpecificDbData;
}) => (
  <UedCx.Pages.Workshops.Provider initData={dbData.page}>
    <UedCx.Workshops.Provider initData={dbData.workshops}>
      {children}
    </UedCx.Workshops.Provider>
  </UedCx.Pages.Workshops.Provider>
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

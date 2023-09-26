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
import ProgrammesList from "./programmes-list/+Entry";

import { UedCx } from "~/context/user-editable-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

const ProgrammesPage = () => (
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

export default ProgrammesPage;

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
      <ProgrammesList />
    </SiteLayout.Section.Spacing>
  </>
);

type PageDbData = {
  page: MyDb["pages"]["programmes"];

  programmes: MyDb["programme"][];
};

type DbData = {
  page: PageDbData;

  common: CommonDbData;
};

const usePageSpecificDbDataInit = () => {
  const pageQuery = useQuery("programmes-page", myDb.pages.programmes.fetch);

  const programmesQuery = useQuery("programmes", myDb.programme.fetchAll);

  return {
    pageQuery,
    programmesQuery,
  };
};

const InitDbData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const { pageQuery, programmesQuery } = usePageSpecificDbDataInit();

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
    ...[pageQuery, programmesQuery],
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
      programmes: programmesQuery.data!,
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
  <UedCx.Pages.Programmes.Provider initData={dbData.page}>
    <UedCx.Programmes.Provider initData={dbData.programmes}>
      {children}
    </UedCx.Programmes.Provider>
  </UedCx.Pages.Programmes.Provider>
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

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
import Careers from "./careers/+Entry";
import Heading from "./heading/+Entry";
import MainText from "./main-text/+Entry";

import { UedCx } from "~/context/user-editable-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

const CareersPage = () => (
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

export default CareersPage;

const PageSpecificComponents = () => (
  <>
    <BannerImage />

    <SiteLayout.Section.Spacing>
      <Heading />
    </SiteLayout.Section.Spacing>

    <SiteLayout.Section.Spacing.Horizontal>
      <MainText />
    </SiteLayout.Section.Spacing.Horizontal>

    <SiteLayout.Section.Spacing>
      <Careers />
    </SiteLayout.Section.Spacing>
  </>
);

type PageDbData = {
  page: MyDb["pages"]["careers"];

  careers: MyDb["career"][];
};

type DbData = {
  page: PageDbData;

  common: CommonDbData;
};

const usePageSpecificDbDataInit = () => {
  const pageQuery = useQuery("careers-page", myDb.pages["career"].fetch);

  const careersQuery = useQuery("careers", myDb["career"].fetchAll);

  return {
    pageQuery,
    careersQuery,
  };
};

const InitDbData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const { pageQuery, careersQuery } = usePageSpecificDbDataInit();

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
    ...[pageQuery, careersQuery],
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
      careers: careersQuery.data!,
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
  <UedCx.Pages.Careers.Provider initData={dbData.page}>
    <UedCx.Careers.Provider initData={dbData.careers}>
      {children}
    </UedCx.Careers.Provider>
  </UedCx.Pages.Careers.Provider>
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

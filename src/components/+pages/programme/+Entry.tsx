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
import Info from "./info/+Entry";
import MainText from "./main-text/+Entry";
import PhotoAlbum from "./photo-album/+Entry";
import Posters from "./posters/+Entry";
import Sections from "./sections/+Entry";
import SignUp from "./sign-up/+Entry";
import TopEditBar from "./top-edit-bar/+Entry";

import { UedCx } from "~/context/user-editable-data";
import { useDynamicRouteParams } from "~/hooks";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

const AboutPage = () => (
  <AwaitParams>
    {({ paramId }) => (
      <InitDbData idParam={paramId}>
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
    )}
  </AwaitParams>
);

export default AboutPage;

const PageSpecificComponents = () => {
  const {
    store: {
      data: { usePosters, photoAlbum },
    },
  } = UedCx.Programme.use();

  return (
    <>
      <SiteLayout.Section.Spacing.Horizontal>
        <TopEditBar />
      </SiteLayout.Section.Spacing.Horizontal>

      <div className="mt-sm">
        <BannerImage />
      </div>

      <SiteLayout.Section.Spacing>
        <Headings />
      </SiteLayout.Section.Spacing>

      <SiteLayout.Section.Spacing.Horizontal>
        <MainText />
      </SiteLayout.Section.Spacing.Horizontal>

      <SiteLayout.Section.Spacing>
        <SignUp />
      </SiteLayout.Section.Spacing>

      <SiteLayout.Section.Spacing>
        <div className="grid grid-cols-2 gap-lg">
          <div className="">
            <Info />
          </div>
          {usePosters ? (
            <div className="">
              <Posters />
            </div>
          ) : null}
        </div>
      </SiteLayout.Section.Spacing>

      {photoAlbum.use ? (
        <SiteLayout.Section.Spacing>
          <PhotoAlbum />
        </SiteLayout.Section.Spacing>
      ) : null}

      <SiteLayout.Section.Spacing>
        <Sections />
      </SiteLayout.Section.Spacing>
    </>
  );
};

type PageDbData = {
  page: MyDb["programme"];
};

type DbData = {
  page: PageDbData;

  common: CommonDbData;
};

const usePageSpecificDbDataInit = (idParam: string) => {
  const pageQuery = useQuery(
    ["programme", idParam],
    async () => await myDb.programme.fetchOne(idParam),
  );

  return {
    pageQuery,
  };
};

const AwaitParams = ({
  children,
}: {
  children: (arg0: { paramId: string }) => ReactElement;
}) => {
  const params = useDynamicRouteParams();

  if (params === "pending" || !params.idParam) {
    return <PageDataFetch.Loading />;
  }

  return children({ paramId: params.idParam });
};

const InitDbData = ({
  children,
  idParam,
}: {
  children: (data: DbData) => ReactElement;
  idParam: string;
}) => {
  const { pageQuery } = usePageSpecificDbDataInit(idParam);

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
    ...[pageQuery],
  ];

  if (queriesArr.some((query) => query.isLoading)) {
    return <PageDataFetch.Loading />;
  }

  if (!pageQuery.data) {
    return <PageDataFetch.NotFound entityName="programme" />;
  }

  if (
    queriesArr.some((query) => query.isError) ||
    queriesArr.some((query) => !query.data)
  ) {
    return <PageDataFetch.Error />;
  }

  return children({
    page: {
      page: pageQuery.data,
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
  <UedCx.Programme.Provider initData={dbData.page}>
    {children}
  </UedCx.Programme.Provider>
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

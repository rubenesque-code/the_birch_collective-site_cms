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
import Sections from "./sections/+Entry";
import SignUp from "./sign-up/+Entry";
import Tickets from "./tickets/+Entry";
import TopEditBar from "./top-edit-bar/+Entry";

import { UedCx } from "~/context/user-editable-data";
import { useDynamicRouteParams } from "~/hooks";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

const WorkshopPage = () => (
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

export default WorkshopPage;

const PageSpecificComponents = () => {
  const {
    store: {
      data: { type, photoAlbum },
    },
  } = UedCx.Pages.Workshop.use();

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
        {type === "paid" ? <Tickets /> : <SignUp />}
      </SiteLayout.Section.Spacing>

      <SiteLayout.Section.Spacing>
        <div className="mt-md flex gap-lg">
          <div className="">
            <Info />
          </div>
          {photoAlbum.use ? (
            <div className="flex-grow">
              <PhotoAlbum />
            </div>
          ) : null}
        </div>
      </SiteLayout.Section.Spacing>

      <SiteLayout.Section.Spacing>
        <Sections />
      </SiteLayout.Section.Spacing>
    </>
  );
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

type PageDbData = {
  page: MyDb["workshop"];
};

type DbData = {
  common: CommonDbData;

  page: PageDbData;
};

const usePageDbDataInit = (idParam: string) => {
  const pageQuery = useQuery(
    ["workshop", idParam],
    async () => await myDb.workshop.fetchOne(idParam),
  );

  return {
    pageQuery,
  };
};

const InitDbData = ({
  children,
  idParam,
}: {
  children: (data: DbData) => ReactElement;
  idParam: string;
}) => {
  const { pageQuery } = usePageDbDataInit(idParam);

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
    return <PageDataFetch.NotFound entityName="workshop" />;
  }

  if (
    queriesArr.some((query) => query.isError) ||
    queriesArr.some((query) => !query.data)
  ) {
    return <PageDataFetch.Error />;
  }

  return children({
    page: { page: pageQuery.data },

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
  <UedCx.Pages.Workshop.Provider initData={dbData.page}>
    {children}
  </UedCx.Pages.Workshop.Provider>
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

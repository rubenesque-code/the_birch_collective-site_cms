import { type ReactElement } from "react";
import { useQuery } from "react-query";

import { myDb } from "~/my-firebase/firestore";

import { RevisionCx } from "./_state";

import { PageDataFetch } from "~/components/PageDataFetch";
import CmsHeader from "~/components/parts/cms-header/+Entry";
import SiteFooter from "~/components/parts/site-footer/+Entry";
import SiteHeader from "~/components/parts/site-header/+Entry";

import CmsLayout from "~/components/layouts/Cms";
import SiteLayout from "~/components/layouts/Site";
import { UedCx } from "~/context/user-editable-data";
import type { MyDb } from "~/types/database";
import BannerImage from "./banner-image/+Entry";
import Headings from "./headings/+Entry";
import MainText from "./main-text/+Entry";
import ProgrammesList from "./programmes-list/+Entry";

const AboutPage = () => (
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
                <PageSpecificContent />
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

export default AboutPage;

const PageSpecificContent = () => (
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

type DbData = {
  page: MyDb["pages"]["programmes"];
  orgDetails: MyDb["singles"]["orgDetails"];
  linkLabels: MyDb["singles"]["linkLabels"];
  header: MyDb["singles"]["header"];
  footer: MyDb["singles"]["footer"];
  programmes: MyDb["programme"][];
};

const InitDbData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const pageQuery = useQuery("programmes-page", myDb.pages.programmes.fetch);

  const footerQuery = useQuery("footer", myDb.footer.fetch);
  const headerQuery = useQuery("header", myDb.header.fetch);
  const linkLabelsQuery = useQuery("link-labels", myDb.linkLabels.fetch);
  const orgDetailsQuery = useQuery("org-details", myDb.orgDetails.fetch);

  const programmesQuery = useQuery("programmes", myDb.programme.fetchAll);

  if (
    pageQuery.isLoading ||
    linkLabelsQuery.isLoading ||
    headerQuery.isLoading ||
    footerQuery.isLoading ||
    orgDetailsQuery.isLoading ||
    programmesQuery.isLoading
  ) {
    return <PageDataFetch.Loading />;
  }

  if (
    pageQuery.isError ||
    !pageQuery.data ||
    linkLabelsQuery.isError ||
    !linkLabelsQuery.data ||
    headerQuery.isError ||
    !headerQuery.data ||
    footerQuery.isError ||
    !footerQuery.data ||
    orgDetailsQuery.isError ||
    !orgDetailsQuery.data ||
    programmesQuery.isError ||
    !programmesQuery.data
  ) {
    return <PageDataFetch.Error />;
  }

  return children({
    page: pageQuery.data,
    orgDetails: orgDetailsQuery.data,
    linkLabels: linkLabelsQuery.data,
    header: headerQuery.data,
    footer: footerQuery.data,
    programmes: programmesQuery.data,
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
    <UedCx.Pages.Programmes.Provider initData={initDbData.page}>
      <UedCx.OrgDetails.Provider initData={initDbData.orgDetails}>
        <UedCx.LinkLabels.Provider initData={initDbData.linkLabels}>
          <UedCx.Header.Provider initData={initDbData.header}>
            <UedCx.Footer.Provider initData={initDbData.footer}>
              <UedCx.Programmes.Provider initData={initDbData.programmes}>
                {children}
              </UedCx.Programmes.Provider>
            </UedCx.Footer.Provider>
          </UedCx.Header.Provider>
        </UedCx.LinkLabels.Provider>
      </UedCx.OrgDetails.Provider>
    </UedCx.Pages.Programmes.Provider>
  );
};

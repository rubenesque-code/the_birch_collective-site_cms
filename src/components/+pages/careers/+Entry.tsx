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
import type { MyDb } from "~/types/database";
import BannerImage from "./banner-image/+Entry";
import Heading from "./heading/+Entry";
import MainText from "./main-text/+Entry";
import Careers from "./careers/+Entry";

const CareersPage = () => (
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

export default CareersPage;

const PageSpecificContent = () => (
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

type DbData = {
  page: MyDb["pages"]["careers"];

  orgDetails: MyDb["singles"]["orgDetails"];
  linkLabels: MyDb["singles"]["linkLabels"];
  header: MyDb["singles"]["header"];
  footer: MyDb["singles"]["footer"];

  careers: MyDb["career"][];
};

const InitDbData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const pageQuery = useQuery("careers-page", myDb.pages["career"].fetch);

  const footerQuery = useQuery("footer", myDb.footer.fetch);
  const headerQuery = useQuery("header", myDb.header.fetch);
  const linkLabelsQuery = useQuery("link-labels", myDb.linkLabels.fetch);
  const orgDetailsQuery = useQuery("org-details", myDb.orgDetails.fetch);

  const careersQuery = useQuery("careers", myDb["career"].fetchAll);

  if (
    pageQuery.isLoading ||
    linkLabelsQuery.isLoading ||
    headerQuery.isLoading ||
    footerQuery.isLoading ||
    orgDetailsQuery.isLoading ||
    careersQuery.isLoading
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
    careersQuery.isError ||
    !careersQuery.data
  ) {
    return <PageDataFetch.Error />;
  }

  return children({
    page: pageQuery.data,

    orgDetails: orgDetailsQuery.data,
    linkLabels: linkLabelsQuery.data,
    header: headerQuery.data,
    footer: footerQuery.data,

    careers: careersQuery.data,
  });
};

const UedProviders = ({
  initDbData,
  children,
}: {
  initDbData: DbData;
  children: ReactElement;
}) => (
  <UedCx.Pages.Careers.Provider initData={initDbData.page}>
    <UedCx.OrgDetails.Provider initData={initDbData.orgDetails}>
      <UedCx.LinkLabels.Provider initData={initDbData.linkLabels}>
        <UedCx.Header.Provider initData={initDbData.header}>
          <UedCx.Footer.Provider initData={initDbData.footer}>
            <UedCx.Careers.Provider initData={initDbData.careers}>
              {children}
            </UedCx.Careers.Provider>
          </UedCx.Footer.Provider>
        </UedCx.Header.Provider>
      </UedCx.LinkLabels.Provider>
    </UedCx.OrgDetails.Provider>
  </UedCx.Pages.Careers.Provider>
);

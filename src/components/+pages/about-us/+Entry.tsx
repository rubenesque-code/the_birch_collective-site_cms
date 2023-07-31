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

const HomePage = () => (
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
                About Us Page
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

export default HomePage;

type DbData = {
  page: MyDb["pages"]["aboutUs"];
  orgDetails: MyDb["singles"]["orgDetails"];
  linkLabels: MyDb["singles"]["linkLabels"];
  header: MyDb["singles"]["header"];
  footer: MyDb["singles"]["footer"];
};

const InitDbData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const pageQuery = useQuery("about-us", myDb.pages.aboutUs.fetch);

  const footerQuery = useQuery("footer", myDb.footer.fetch);
  const headerQuery = useQuery("header", myDb.header.fetch);
  const linkLabelsQuery = useQuery("link-labels", myDb.linkLabels.fetch);
  const orgDetailsQuery = useQuery("org-details", myDb.orgDetails.fetch);

  if (
    pageQuery.isLoading ||
    linkLabelsQuery.isLoading ||
    headerQuery.isLoading ||
    footerQuery.isLoading ||
    orgDetailsQuery.isLoading
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
    !orgDetailsQuery.data
  ) {
    return <PageDataFetch.Error />;
  }

  return children({
    page: pageQuery.data,
    orgDetails: orgDetailsQuery.data,
    linkLabels: linkLabelsQuery.data,
    header: headerQuery.data,
    footer: footerQuery.data,
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
    <UedCx.Pages.AboutUs.Provider initData={initDbData.page}>
      <UedCx.OrgDetails.Provider initData={initDbData.orgDetails}>
        <UedCx.LinkLabels.Provider initData={initDbData.linkLabels}>
          <UedCx.Header.Provider initData={initDbData.header}>
            <UedCx.Footer.Provider initData={initDbData.footer}>
              {children}
            </UedCx.Footer.Provider>
          </UedCx.Header.Provider>
        </UedCx.LinkLabels.Provider>
      </UedCx.OrgDetails.Provider>
    </UedCx.Pages.AboutUs.Provider>
  );
};

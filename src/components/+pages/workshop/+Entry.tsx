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
import { useDynamicRouteParams } from "~/hooks";
import BannerImage from "./banner-image/+Entry";
import Headings from "./headings/+Entry";
import MainText from "./main-text/+Entry";
import Info from "./info/+Entry";
import Posters from "./posters/+Entry";
import Sections from "./sections/+Entry";

const WorkshopPage = () => (
  <AwaitParams>
    {({ paramId }) => (
      <InitDbData idParam={paramId}>
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
    )}
  </AwaitParams>
);

export default WorkshopPage;

const PageSpecificContent = () => (
  <>
    <BannerImage />

    <SiteLayout.Section.Spacing>
      <Headings />
    </SiteLayout.Section.Spacing>

    <SiteLayout.Section.Spacing.Horizontal>
      <MainText />
    </SiteLayout.Section.Spacing.Horizontal>

    {/* <SiteLayout.Section.Spacing>
      <div className="grid grid-cols-2 gap-lg">
        <div className="">
          <Info />
        </div>
        <div className="">
          <Posters />
        </div>
      </div>
    </SiteLayout.Section.Spacing> */}

    {/* <SiteLayout.Section.Spacing.Horizontal>
      <Sections />
    </SiteLayout.Section.Spacing.Horizontal> */}
  </>
);

type DbData = {
  workshop: MyDb["workshop"];

  orgDetails: MyDb["singles"]["orgDetails"];
  linkLabels: MyDb["singles"]["linkLabels"];
  header: MyDb["singles"]["header"];
  footer: MyDb["singles"]["footer"];
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
  const workshopQuery = useQuery(
    "workshop",
    async () => await myDb.workshop.fetchOne(idParam),
  );

  const footerQuery = useQuery("footer", myDb.footer.fetch);
  const headerQuery = useQuery("header", myDb.header.fetch);
  const linkLabelsQuery = useQuery("link-labels", myDb.linkLabels.fetch);
  const orgDetailsQuery = useQuery("org-details", myDb.orgDetails.fetch);

  if (
    workshopQuery.isLoading ||
    linkLabelsQuery.isLoading ||
    headerQuery.isLoading ||
    footerQuery.isLoading ||
    orgDetailsQuery.isLoading ||
    workshopQuery.isLoading
  ) {
    return <PageDataFetch.Loading />;
  }

  if (workshopQuery.isError) {
    return <PageDataFetch.Error />;
  }

  if (!workshopQuery.data) {
    return <PageDataFetch.NotFound entityName="workshop" />;
  }

  if (
    linkLabelsQuery.isError ||
    !linkLabelsQuery.data ||
    headerQuery.isError ||
    !headerQuery.data ||
    footerQuery.isError ||
    !footerQuery.data ||
    orgDetailsQuery.isError ||
    !orgDetailsQuery.data ||
    workshopQuery.isError ||
    !workshopQuery.data
  ) {
    return <PageDataFetch.Error />;
  }

  return children({
    workshop: workshopQuery.data,

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
}) => (
  <UedCx.OrgDetails.Provider initData={initDbData.orgDetails}>
    <UedCx.LinkLabels.Provider initData={initDbData.linkLabels}>
      <UedCx.Header.Provider initData={initDbData.header}>
        <UedCx.Footer.Provider initData={initDbData.footer}>
          <UedCx.Pages.Workshop.Provider initData={initDbData.workshop}>
            {children}
          </UedCx.Pages.Workshop.Provider>
        </UedCx.Footer.Provider>
      </UedCx.Header.Provider>
    </UedCx.LinkLabels.Provider>
  </UedCx.OrgDetails.Provider>
);

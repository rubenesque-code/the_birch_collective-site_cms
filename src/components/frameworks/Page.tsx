import type { ReactElement } from "react";

import CmsLayout from "../layouts/Cms";
import SiteLayout from "../layouts/Site";
import SiteFooter from "../parts/site-footer/+Entry";
import SiteHeader from "../parts/site-header/+Entry";

const PageFramework = ({
  cmsHeader,
  pageSpecificComponents,
}: {
  pageSpecificComponents: ReactElement;
  cmsHeader: ReactElement;
}) => (
  <CmsLayout.Page>
    {cmsHeader}

    <CmsLayout.Body>
      <SiteLayout.Page>
        <SiteHeader />

        {pageSpecificComponents}

        <SiteLayout.Section.Spacing.Horizontal>
          <div className="mt-2xl pb-xl">
            <SiteFooter />
          </div>
        </SiteLayout.Section.Spacing.Horizontal>
      </SiteLayout.Page>
    </CmsLayout.Body>
  </CmsLayout.Page>
);

export { PageFramework };

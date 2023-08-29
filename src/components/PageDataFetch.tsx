import React from "react";

import CmsLayout from "./layouts/Cms";
import SiteLayout from "./layouts/Site";
import CmsHeader from "./parts/cms-header/+Entry";
import { Spinner } from "./Spinner";

const LayoutDummy = () => (
  <CmsLayout.Page>
    <CmsHeader
      actions={{ save: () => null, undo: () => null }}
      data={{ isChange: false }}
    />
    <CmsLayout.Body styles={{ inner: "h-full" }}>
      <SiteLayout.Page className="h-full">
        <></>
      </SiteLayout.Page>
    </CmsLayout.Body>
  </CmsLayout.Page>
);

const Loading = () => (
  <>
    <LayoutDummy />

    <div className="fixed inset-0 z-10 grid cursor-wait place-items-center bg-white/10">
      <div className="flex flex-col items-center gap-md">
        <Spinner />
        <p className="">Loading data...</p>
      </div>
    </div>
  </>
);

const MyError = () => (
  <>
    <LayoutDummy />

    <div className="fixed inset-0 z-10 grid place-items-center">
      <div className="max-w-lg">
        <h3 className="font-medium">Something went wrong fetching the data.</h3>
        <p className="mt-xs text-gray-600">
          Try refreshing the page. If the problem persists, please contact the
          developer.
        </p>
      </div>
    </div>
  </>
);

const DynamicRouteEntityNotFound = ({ entityName }: { entityName: string }) => (
  <>
    <LayoutDummy />

    <div className="fixed inset-0 grid place-items-center">
      <div className="max-w-lg">
        <h3 className="font-medium">Could not find {entityName}</h3>
        <p className="mt-xs text-gray-600">
          The {entityName} from the entered address could not be found. It may
          have been deleted.
        </p>
      </div>
    </div>
  </>
);

const PageDataFetch = () => {
  throw new Error(
    "PageDataFetch exists for naming purposes only and should not be used as a component",
  );
};

export { PageDataFetch };

PageDataFetch.Loading = Loading;
PageDataFetch.Error = MyError;
PageDataFetch.NotFound = DynamicRouteEntityNotFound;

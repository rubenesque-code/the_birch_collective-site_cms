import { Spinner } from "./Spinner";

const Loading = () => (
  <div className="fixed inset-0 grid place-items-center">
    <div className="flex flex-col items-center gap-md">
      <Spinner />
      <p className="">Loading data...</p>
    </div>
  </div>
);

const MyError = () => (
  <div className="fixed inset-0 grid place-items-center">
    <div className="max-w-lg">
      <h3 className="font-medium">Something went wrong fetching the data.</h3>
      <p className="mt-xs text-gray-600">
        Try refreshing the page. If the problem persists, please contact the
        developer.
      </p>
    </div>
  </div>
);

const DynamicRouteEntityNotFound = ({ entityName }: { entityName: string }) => (
  <div className="fixed inset-0 grid place-items-center">
    <div className="max-w-lg">
      <h3 className="font-medium">Could not find {entityName}</h3>
      <p className="mt-xs text-gray-600">
        The {entityName} from the entered address could not be found. It may
        have been deleted.
      </p>
    </div>
  </div>
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

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
  <div className="my-screen-center">
    <div className="max-w-xl">
      <h3 className="font-medium">Something went wrong fetching the data.</h3>
      <p className="mt-xs text-gray-600">
        Try refreshing the page. If the problem persists and it&apos;s not to do
        with the internet, contact the developer.
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

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useQuery } from "react-query";

import { Icon } from "~/components/icons";
import { WithTooltip } from "~/components/WithTooltip";

import { timeAgo } from "~/helpers/time-ago";
import { vercel, type VercelDeploy } from "~/lib";

const LatestDeploy = () => {
  const latestDeployQuery = useQuery(
    "latest-deploy",
    async () => await vercel.fetchLatestDeploy(),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="mt-8">
      <div className="flex items-end gap-6">
        <div className="flex items-center gap-4">
          <h5 className="flex items-center gap-2">
            <span className="grid place-items-center text-lg text-blue-600">
              <Icon.Info />
            </span>
            <span className="text-sm text-gray-600">Last update</span>
          </h5>

          <div className="flex items-center gap-sm">
            <WithTooltip text="click to see how the deploy is doing">
              <button
                className={`text-xs text-gray-400 ${
                  latestDeployQuery.isFetching
                    ? "cursor-auto opacity-40"
                    : "opacity-100"
                }`}
                onClick={() => {
                  if (latestDeployQuery.isFetching) {
                    return;
                  }
                  void latestDeployQuery.refetch();
                }}
              >
                <Icon.Refresh />
              </button>
            </WithTooltip>

            <div className="flex items-center gap-xs text-xs text-gray-400">
              <span>Click to see how the latest deploy is doing.</span>
            </div>
          </div>
        </div>

        <span
          className={`font-mono text-xs text-gray-400 transition-opacity duration-75 ease-in-out ${
            latestDeployQuery.isRefetching ? "opacity-100" : "opacity-0"
          }`}
        >
          updating...
        </span>
      </div>
      <div className="mt-4">
        {latestDeployQuery.isLoading ? (
          <div className="flex items-center gap-2 pl-6">
            <span className="font-mono text-xs text-gray-400">Loading</span>
            <span className="text-gray-400">
              <Icon.Loading />
            </span>
          </div>
        ) : !latestDeployQuery.data ? (
          <p className="text-sm text-gray-600">Something went wrong...</p>
        ) : (
          <LatestDeployData data={latestDeployQuery.data} />
        )}
      </div>
    </div>
  );
};

export default LatestDeploy;

const LatestDeployData = ({ data }: { data: NonNullable<VercelDeploy> }) => (
  <div className="flex items-center gap-12">
    <div className="flex items-center gap-2">
      <span
        className={`aspect-square w-[8px] rounded-full ${
          data.readyState === "READY"
            ? "bg-my-success-content"
            : data.readyState === "ERROR"
            ? "bg-my-error-content"
            : data.readyState === "CANCELED"
            ? "bg-gray-400"
            : "bg-blue-500"
        }`}
      />
      <p className="text-sm font-medium capitalize text-gray-600">
        <span>{data.readyState.slice(0, 1)}</span>
        <span className="lowercase">
          {data.readyState.slice(1, data.readyState.length)}
        </span>
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-500">
        {timeAgo(new Date(data.createdAt))}
      </p>
    </div>
  </div>
);

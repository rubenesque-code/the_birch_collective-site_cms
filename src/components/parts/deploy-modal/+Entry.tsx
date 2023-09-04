/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { type ReactElement } from "react";
import { useMutation, useQuery } from "react-query";

import { Icon } from "~/components/icons";
import ModalLayout from "~/components/layouts/Modal";
import { Spinner } from "~/components/Spinner";
import { Modal } from "~/components/styled-bases";

import LatestDeploy from "./LatestDeploy";

import { vercel } from "~/lib";

const DeployModal = ({
  button,
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
}) => <Modal.WithVisibilityProvider button={button} panelContent={<Panel />} />;

export default DeployModal;

const Panel = () => (
  <ModalLayout.Standard
    body={
      <div className="">
        <p className="text-gray-600">
          When you&apos;re ready to upload any changes you&apos;ve made, press
          the upload button below.
        </p>
        <p className="mt-xxs text-gray-400">
          The process usually takes 1-4 minutes.
        </p>

        <div className="mt-lg">
          <UploadButton />
        </div>

        <div className="mt-lg">
          <LatestDeploy />
        </div>
      </div>
    }
    title="Upload changes"
    styles={{ outerWrapper: "max-w-[600px] h-auto" }}
  />
);

const UploadButton = () => {
  // · wait so that latest deploy refers to triggered deploy.
  const latestDeployQuery = useQuery(
    "latest-deploy",
    async () => await vercel.fetchLatestDeploy({ wait: 1400 }),
    { enabled: false },
  );

  const deployMutation = useMutation(vercel.triggerDeploy, {
    onSettled() {
      void latestDeployQuery.refetch();
    },
  });

  return (
    <div>
      <div
        className={`relative inline-flex cursor-pointer items-center gap-3 rounded-sm border border-blue-500 bg-blue-100 px-3 py-1 text-blue-500 transition-colors duration-75 ease-in-out hover:bg-blue-200`}
        onClick={() => deployMutation.mutate()}
      >
        <span>
          <Icon.Deploy />
        </span>
        <span className="font-sans text-sm">upload changes</span>
        {deployMutation.isLoading ? (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center gap-3 rounded-sm bg-gray-50/70 pl-2">
            <span>
              <Spinner size={16} />
            </span>
            <span className="font-mono text-xs text-gray-400">
              Connecting...
            </span>
          </div>
        ) : null}
      </div>
      {deployMutation.error ? (
        <p className="mt-1 text-sm lowercase text-my-error-content">
          Something went wrong with the deploy.
        </p>
      ) : null}
    </div>
  );
};

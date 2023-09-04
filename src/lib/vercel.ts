/* eslint-disable @typescript-eslint/no-non-null-assertion */

import axios from "axios";

import { wait } from "~/helpers/async";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_AUTH_KEY!}`,
};

export type VercelDeploy = {
  id: string;
  readyState:
    | "INITIALIZING"
    | "BUILDING"
    | "READY"
    | "ERROR"
    | "QUEUED"
    | "CANCELED"
    | "PENDING";
  createdAt: number;
};

const fetchLatestDeploy = async (input?: { wait?: number }) => {
  if (input?.wait) {
    await wait(input.wait);
  }

  const res = (await axios.get(
    `https://api.vercel.com/v8/projects/${process.env
      .NEXT_PUBLIC_VERCEL_FRONTEND_PROJECT_ID!}`,
    {
      headers,
    },
  )) as unknown as { data: { latestDeployments: VercelDeploy[] } };

  return res.data.latestDeployments[0];
};

const triggerDeploy = async () =>
  await axios.post(
    `https://api.vercel.com/v1/integrations/deploy/${process.env
      .NEXT_PUBLIC_VERCEL_FRONTEND_PROJECT_ID!}/${process.env
      .NEXT_PUBLIC_VERCEL_FRONTEND_DEPLOY_HOOK_KEY!}`,
  );

export const vercel = {
  fetchLatestDeploy,
  triggerDeploy,
};

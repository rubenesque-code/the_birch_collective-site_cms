import { isDevMode } from "~/helpers/environment";

export const domain = isDevMode
  ? "http://localhost:3000"
  : "https://the-birch-collective-cms.vercel.app/";

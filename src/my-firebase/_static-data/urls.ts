/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { storage_file_system_names } from "./collections-and-docs";
import { isDevMode } from "~/static-data/process";

// □ use env.mjs

const storage_domain = isDevMode
  ? "http://localhost:9199/"
  : "https://firebasestorage.googleapis.com/";

const image_base =
  storage_domain +
  "v0/b/" +
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET +
  "/o/" +
  storage_file_system_names.folders.resized +
  "%";

export const storage_urls = {
  image_base,
};

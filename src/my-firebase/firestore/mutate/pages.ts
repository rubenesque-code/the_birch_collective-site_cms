import { type WriteBatch } from "firebase/firestore/lite";
import type { MyDb } from "~/types/database";
import { getDocRef } from "../_helpers";

export const batchUpdateLandingPage = (
  data: Partial<MyDb["pages"]["landing"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "landing");

  batch.update(docRef, data);
};

export const batchUpdateAboutUsPage = (
  data: Partial<MyDb["pages"]["aboutUs"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "aboutUs");

  batch.update(docRef, data);
};

export const batchUpdateProgrammesPage = (
  data: Partial<MyDb["pages"]["programmes"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "programmes");

  batch.update(docRef, data);
};

export const batchUpdateDonatePage = (
  data: Partial<MyDb["pages"]["donate"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "donate");

  batch.update(docRef, data);
};

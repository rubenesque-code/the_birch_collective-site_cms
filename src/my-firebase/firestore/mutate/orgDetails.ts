import { updateDoc, type WriteBatch } from "firebase/firestore/lite";
import type { MyDb } from "~/types/database";
import { getDocRef } from "../_helpers";

export const updateOrgDetails = async (
  data: Partial<MyDb["singles"]["orgDetails"]>,
) => {
  const docRef = getDocRef("singles", "orgDetails");

  await updateDoc(docRef, data);
};

export const batchUpdateOrgDetails = (
  data: Partial<MyDb["singles"]["orgDetails"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("singles", "orgDetails");

  batch.update(docRef, data);
};

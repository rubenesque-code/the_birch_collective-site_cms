import { updateDoc, type WriteBatch } from "firebase/firestore/lite";
import type { MyDb } from "~/types/database";
import { getDocRef } from "../_helpers";

export const updateLinkLabels = async (
  data: Partial<MyDb["singles"]["linkLabels"]>,
) => {
  const docRef = getDocRef("singles", "linkLabels");

  await updateDoc(docRef, data);
};

export const batchUpdateLinkLabels = (
  data: Partial<MyDb["singles"]["linkLabels"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("singles", "linkLabels");

  batch.update(docRef, data);
};

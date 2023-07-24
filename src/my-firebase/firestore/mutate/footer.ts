import { updateDoc, type WriteBatch } from "firebase/firestore/lite";

import type { MyDb } from "~/types/database";
import { getDocRef } from "../_helpers";

export const updateFooter = async (
  data: Partial<MyDb["singles"]["footer"]>,
) => {
  const docRef = getDocRef("singles", "footer");

  await updateDoc(docRef, data);
};

export const batchUpdateFooter = (
  data: Partial<MyDb["singles"]["footer"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("singles", "footer");

  batch.update(docRef, data);
};

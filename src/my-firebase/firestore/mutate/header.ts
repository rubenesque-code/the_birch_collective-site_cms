import { updateDoc, type WriteBatch } from "firebase/firestore/lite";
import type { MyDb } from "~/types/database";
import { getDocRef } from "../_helpers";

export const updateHeader = async (
  data: Partial<MyDb["singles"]["header"]>,
) => {
  const docRef = getDocRef("singles", "header");

  await updateDoc(docRef, data);
};

export const batchUpdateHeader = (
  data: Partial<MyDb["singles"]["header"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("singles", "header");

  batch.update(docRef, data);
};

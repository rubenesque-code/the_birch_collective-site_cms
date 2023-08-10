import { type WriteBatch } from "firebase/firestore/lite";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";
import { getDocRef } from "../_helpers";

export const batchCreateWorkshop = (
  input: MyDb["workshop"],
  batch: WriteBatch,
) => {
  const docRef = getDocRef("workshops", input.id);

  batch.set(docRef, input);
};

export const batchUpdateWorkshop = (
  input: DocPartialWithId<MyDb["workshop"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("workshops", input.id);

  batch.update(docRef, input);
};

export const batchDeleteWorkshop = (id: string, batch: WriteBatch) => {
  const docRef = getDocRef("workshops", id);

  batch.delete(docRef);
};

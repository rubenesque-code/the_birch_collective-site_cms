import { type WriteBatch } from "firebase/firestore/lite";

import { getDocRef } from "../_helpers";

import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";

export const batchCreateKeyword = (
  input: MyDb["keyword"],
  batch: WriteBatch,
) => {
  const docRef = getDocRef("keywords", input.id);

  batch.set(docRef, input);
};

export const batchUpdateKeyword = (
  input: DocPartialWithId<MyDb["keyword"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("keywords", input.id);

  batch.update(docRef, input);
};

export const batchDeleteKeyword = (id: string, batch: WriteBatch) => {
  const docRef = getDocRef("keywords", id);

  batch.delete(docRef);
};

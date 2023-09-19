import {
  deleteDoc,
  doc,
  setDoc,
  type WriteBatch,
} from "firebase/firestore/lite";

import { getDocRef } from "../_helpers";

import { firestore_file_system_names } from "~/my-firebase/_static-data/collections-and-docs";
import { firestore } from "~/my-firebase/client";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";

export const createImage = async (input: MyDb["image"]) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.images,
    input.id,
  );
  await setDoc(docRef, input);
};

export const deleteImage = async (id: string) => {
  const docRef = getDocRef("images", id);

  await deleteDoc(docRef);
};

export const batchUpdateImage = (
  input: DocPartialWithId<MyDb["image"]>,
  batch: WriteBatch,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.images,
    input.id,
  );

  batch.update(docRef, input);
};

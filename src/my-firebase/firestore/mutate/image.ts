import { doc, setDoc } from "firebase/firestore/lite";

import { firestore_file_system_names } from "~/my-firebase/_static-data/collections-and-docs";
import { firestore } from "~/my-firebase/client";
import type { MyDb } from "~/types/database";

export const createImage = async (input: MyDb["image"]) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.images,
    input.id,
  );
  await setDoc(docRef, input);
};

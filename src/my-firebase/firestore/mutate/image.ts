import { doc, setDoc } from "firebase/firestore/lite";
import { v4 as generateUId } from "uuid";

import { firestore_file_system_names } from "~/my-firebase/_static-data/collections-and-docs";
import { firestore } from "~/my-firebase/client";
import type { MyDb } from "~/types/database";
import type { MyOmit } from "~/types/utilities";

export const createImage = async (input: MyOmit<MyDb["image"], "id">) => {
  const imageFirestoreId = generateUId();
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.images,
    imageFirestoreId,
  );
  await setDoc(docRef, { ...input, id: imageFirestoreId });
};

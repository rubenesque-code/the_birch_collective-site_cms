import {
  type CollectionReference,
  type DocumentData,
  type DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore/lite";

import { firestore } from "~/my-firebase/client";
import { firestore_file_system_names } from "../../_static-data/collections-and-docs";

export const getCollectionRef = (
  collectionName: keyof (typeof firestore_file_system_names)["collections"],
) =>
  collection(
    firestore,
    firestore_file_system_names.collections[collectionName],
  );

export function getDocRef<
  TCollectionName extends keyof (typeof firestore_file_system_names)["collections"],
>(
  collectionName: TCollectionName,
  docId: TCollectionName extends keyof (typeof firestore_file_system_names)["docs"]
    ? keyof (typeof firestore_file_system_names)["docs"][TCollectionName]
    : string,
) {
  return doc(
    firestore,
    firestore_file_system_names.collections[collectionName],
    docId,
  );
}

export async function getDocData(docRef: DocumentReference) {
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  return data;
}

export async function getCollectionData(collectionRef: CollectionReference) {
  const querySnapshot = await getDocs(collectionRef);

  const data: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    data.push(d);
  });

  return data;
}

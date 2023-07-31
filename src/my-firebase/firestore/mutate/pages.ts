import { type WriteBatch, doc, updateDoc } from "firebase/firestore/lite";
import { firestore_file_system_names } from "~/my-firebase/_static-data/collections-and-docs";
import { firestore } from "~/my-firebase/client";
import type { MyDb } from "~/types/database";

export const updateLandingPage = async (
  data: Partial<MyDb["pages"]["landing"]>,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.pages,
    firestore_file_system_names.docs.pages.landing,
  );

  await updateDoc(docRef, data);
};

export const batchUpdateLandingPage = (
  data: Partial<MyDb["pages"]["landing"]>,
  batch: WriteBatch,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.pages,
    firestore_file_system_names.docs.pages.landing,
  );

  batch.update(docRef, data);
};

export const updateAboutUsPage = async (
  data: Partial<MyDb["pages"]["aboutUs"]>,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.pages,
    firestore_file_system_names.docs.pages.aboutUs,
  );

  await updateDoc(docRef, data);
};

export const batchUpdateAboutUsPage = (
  data: Partial<MyDb["pages"]["aboutUs"]>,
  batch: WriteBatch,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.pages,
    firestore_file_system_names.docs.pages.aboutUs,
  );

  batch.update(docRef, data);
};

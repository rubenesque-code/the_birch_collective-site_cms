import {
  type WriteBatch,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { firestore_file_system_names } from "~/my-firebase/_static-data/collections-and-docs";
import { firestore } from "~/my-firebase/client";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";

export const createPartner = async (input: MyDb["partner"]) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.partners,
    input.id,
  );

  await setDoc(docRef, input);
};

export const batchCreatePartner = (
  input: MyDb["partner"],
  batch: WriteBatch,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.partners,
    input.id,
  );

  batch.set(docRef, input);
};

export const updatePartner = async (
  input: DocPartialWithId<MyDb["partner"]>,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.partners,
    input.id,
  );

  await updateDoc(docRef, input);
};

export const batchUpdatePartner = (
  input: DocPartialWithId<MyDb["partner"]>,
  batch: WriteBatch,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.partners,
    input.id,
  );

  batch.update(docRef, input);
};

export const deletePartner = async (id: string) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.partners,
    id,
  );

  await deleteDoc(docRef);
};

export const batchDeletePartner = (id: string, batch: WriteBatch) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.partners,
    id,
  );

  batch.delete(docRef);
};

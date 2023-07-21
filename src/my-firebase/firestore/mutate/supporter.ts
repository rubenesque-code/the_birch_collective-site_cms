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

export const createSupporter = async (input: MyDb["supporter"]) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.supporters,
    input.id,
  );

  await setDoc(docRef, input);
};

export const batchCreateSupporter = (
  input: MyDb["supporter"],
  batch: WriteBatch,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.supporters,
    input.id,
  );

  batch.set(docRef, input);
};

export const updateSupporter = async (
  input: DocPartialWithId<MyDb["supporter"]>,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.supporters,
    input.id,
  );

  await updateDoc(docRef, input);
};

export const batchUpdateSupporter = (
  input: DocPartialWithId<MyDb["supporter"]>,
  batch: WriteBatch,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.supporters,
    input.id,
  );

  batch.update(docRef, input);
};

export const deleteSupporter = async (id: string) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.supporters,
    id,
  );

  await deleteDoc(docRef);
};

export const batchDeleteSupporter = (id: string, batch: WriteBatch) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.supporters,
    id,
  );

  batch.delete(docRef);
};

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

export const createProgramme = async (input: MyDb["programme"]) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.programmes,
    input.id,
  );

  await setDoc(docRef, input);
};

export const batchCreateProgramme = (
  input: MyDb["programme"],
  batch: WriteBatch,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.programmes,
    input.id,
  );

  batch.set(docRef, input);
};

export const updateProgramme = async (
  input: DocPartialWithId<MyDb["programme"]>,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.programmes,
    input.id,
  );

  await updateDoc(docRef, input);
};

export const batchUpdateProgramme = (
  input: DocPartialWithId<MyDb["programme"]>,
  batch: WriteBatch,
) => {
  console.log("input:", input);
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.programmes,
    input.id,
  );

  batch.update(docRef, input);
};

export const deleteProgramme = async (id: string) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.programmes,
    id,
  );

  await deleteDoc(docRef);
};

export const batchDeleteProgramme = (id: string, batch: WriteBatch) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.programmes,
    id,
  );

  batch.delete(docRef);
};

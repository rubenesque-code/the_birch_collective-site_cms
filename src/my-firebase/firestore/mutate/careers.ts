import {
  deleteDoc,
  setDoc,
  updateDoc,
  type WriteBatch,
} from "firebase/firestore/lite";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";
import { getDocRef } from "../_helpers";

export const createCareer = async (input: MyDb["career"]) => {
  const docRef = getDocRef("careers", input.id);

  await setDoc(docRef, input);
};

export const batchCreateCareer = (input: MyDb["career"], batch: WriteBatch) => {
  const docRef = getDocRef("careers", input.id);

  batch.set(docRef, input);
};

export const updateCareer = async (input: DocPartialWithId<MyDb["career"]>) => {
  const docRef = getDocRef("careers", input.id);

  await updateDoc(docRef, input);
};

export const batchUpdateCareer = (
  input: DocPartialWithId<MyDb["career"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("careers", input.id);

  batch.update(docRef, input);
};

export const deleteCareer = async (id: string) => {
  const docRef = getDocRef("careers", id);

  await deleteDoc(docRef);
};

export const batchDeleteCareer = (id: string, batch: WriteBatch) => {
  const docRef = getDocRef("careers", id);

  batch.delete(docRef);
};

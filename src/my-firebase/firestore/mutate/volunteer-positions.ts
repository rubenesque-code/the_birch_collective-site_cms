import {
  deleteDoc,
  setDoc,
  updateDoc,
  type WriteBatch,
} from "firebase/firestore/lite";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";
import { getDocRef } from "../_helpers";

export const createVolunteerPosition = async (
  input: MyDb["volunteer-positions"],
) => {
  const docRef = getDocRef("volunteer-positions", input.id);

  await setDoc(docRef, input);
};

export const batchCreateVolunteerPosition = (
  input: MyDb["volunteer-positions"],
  batch: WriteBatch,
) => {
  const docRef = getDocRef("volunteer-positions", input.id);

  batch.set(docRef, input);
};

export const updateVolunteerPosition = async (
  input: DocPartialWithId<MyDb["volunteer-positions"]>,
) => {
  const docRef = getDocRef("volunteer-positions", input.id);

  await updateDoc(docRef, input);
};

export const batchUpdateVolunteerPosition = (
  input: DocPartialWithId<MyDb["volunteer-positions"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("volunteer-positions", input.id);

  batch.update(docRef, input);
};

export const deleteVolunteerPosition = async (id: string) => {
  const docRef = getDocRef("volunteer-positions", id);

  await deleteDoc(docRef);
};

export const batchDeleteVolunteerPosition = (id: string, batch: WriteBatch) => {
  const docRef = getDocRef("volunteer-positions", id);

  batch.delete(docRef);
};

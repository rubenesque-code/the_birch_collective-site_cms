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

export const createTestimonial = async (input: MyDb["testimonial"]) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.testimonials,
    input.id,
  );

  await setDoc(docRef, input);
};

export const batchCreateTestimonial = (
  input: MyDb["testimonial"],
  batch: WriteBatch,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.testimonials,
    input.id,
  );

  batch.set(docRef, input);
};

export const updateTestimonial = async (
  input: DocPartialWithId<MyDb["testimonial"]>,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.testimonials,
    input.id,
  );

  await updateDoc(docRef, input);
};

export const batchUpdateTestimonial = (
  input: DocPartialWithId<MyDb["testimonial"]>,
  batch: WriteBatch,
) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.testimonials,
    input.id,
  );

  batch.update(docRef, input);
};

export const deleteTestimonial = async (id: string) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.testimonials,
    id,
  );

  await deleteDoc(docRef);
};

export const batchDeleteTestimonial = (id: string, batch: WriteBatch) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.testimonials,
    id,
  );

  batch.delete(docRef);
};

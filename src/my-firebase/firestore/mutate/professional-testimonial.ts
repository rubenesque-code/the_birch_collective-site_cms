import { type WriteBatch } from "firebase/firestore/lite";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";
import { getDocRef } from "../_helpers";

export const batchCreateProfessionalTestimonial = (
  input: MyDb["professional-testimonial"],
  batch: WriteBatch,
) => {
  const docRef = getDocRef("professional-testimonials", input.id);

  batch.set(docRef, input);
};

export const batchUpdateProfessionalTestimonial = (
  input: DocPartialWithId<MyDb["professional-testimonial"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("professional-testimonials", input.id);

  batch.update(docRef, input);
};

export const batchDeleteProfessionalTestimonial = (
  id: string,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("professional-testimonials", id);

  batch.delete(docRef);
};

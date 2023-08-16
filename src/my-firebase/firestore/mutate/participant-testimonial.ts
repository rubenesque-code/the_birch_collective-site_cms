import { type WriteBatch } from "firebase/firestore/lite";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";
import { getDocRef } from "../_helpers";

export const batchCreateParticipantTestimonial = (
  input: MyDb["participant-testimonial"],
  batch: WriteBatch,
) => {
  const docRef = getDocRef("participant-testimonials", input.id);

  batch.set(docRef, input);
};

export const batchUpdateParticipantTestimonial = (
  input: DocPartialWithId<MyDb["participant-testimonial"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("participant-testimonials", input.id);

  batch.update(docRef, input);
};

export const batchDeleteParticipantTestimonial = (
  id: string,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("participant-testimonials", id);

  batch.delete(docRef);
};

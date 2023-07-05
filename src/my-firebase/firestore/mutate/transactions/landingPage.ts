import type { MyDb } from "~/types/database";
import { myDb } from "../..";
import type { DocPartialWithId } from "~/types/database/_helpers";
import { firestore } from "~/my-firebase/client";
import { writeBatch } from "firebase/firestore/lite";

// TODO: batchWrite
export const landingPageTransaction = async (input: {
  page: Partial<MyDb["pages"]["landing"]> | null;
  testimonials: {
    updated: DocPartialWithId<MyDb["testimonial"]>[];
    created: MyDb["testimonial"][];
    deleted: string[];
  };
}) => {
  const batch = writeBatch(firestore);

  if (input.page) {
    myDb.pages.landing.batch.update(input.page, batch);
  }
  if (input.testimonials.created.length) {
    input.testimonials.created.forEach((testimonial) =>
      myDb.testimonial.batch.create(testimonial, batch),
    );
  }
  if (input.testimonials.updated.length) {
    input.testimonials.updated.forEach((testimonial) =>
      myDb.testimonial.batch.update(testimonial, batch),
    );
  }
  if (input.testimonials.deleted.length) {
    input.testimonials.deleted.forEach((id) =>
      myDb.testimonial.batch.delete(id, batch),
    );
  }

  await batch.commit();
};

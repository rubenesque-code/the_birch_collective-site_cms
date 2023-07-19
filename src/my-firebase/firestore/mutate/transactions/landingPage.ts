import { writeBatch } from "firebase/firestore/lite";

import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";
import { firestore } from "~/my-firebase/client";
import { myDb } from "../..";

export const landingPageTransaction = async (input: {
  page: Partial<MyDb["pages"]["landing"]> | null;
  testimonials: {
    updated: DocPartialWithId<MyDb["testimonial"]>[];
    created: MyDb["testimonial"][];
    deleted: string[];
  };
  programmes: {
    updated: DocPartialWithId<MyDb["programme"]>[];
    created: MyDb["programme"][];
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

  if (input.programmes.created.length) {
    input.programmes.created.forEach((programme) =>
      myDb.programme.batch.create(programme, batch),
    );
  }
  if (input.programmes.updated.length) {
    input.programmes.updated.forEach((programme) =>
      myDb.programme.batch.update(programme, batch),
    );
  }
  if (input.programmes.deleted.length) {
    input.programmes.deleted.forEach((id) =>
      myDb.programme.batch.delete(id, batch),
    );
  }

  await batch.commit();
};

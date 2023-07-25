import { writeBatch } from "firebase/firestore/lite";

import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";
import { firestore } from "~/my-firebase/client";
import { myDb } from "../..";

export const landingPageTransaction = async (input: {
  page: Partial<MyDb["pages"]["landing"]> | null;
  orgDetails: Partial<MyDb["singles"]["orgDetails"]> | null;
  linkLabels: Partial<MyDb["singles"]["linkLabels"]> | null;
  header: Partial<MyDb["singles"]["header"]> | null;
  footer: Partial<MyDb["singles"]["footer"]> | null;
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
  supporters: {
    updated: DocPartialWithId<MyDb["supporter"]>[];
    created: MyDb["supporter"][];
    deleted: string[];
  };
}) => {
  const batch = writeBatch(firestore);

  if (input.orgDetails) {
    myDb.orgDetails.batch.update(input.orgDetails, batch);
  }
  if (input.header) {
    myDb.header.batch.update(input.header, batch);
  }
  if (input.linkLabels) {
    myDb.linkLabels.batch.update(input.linkLabels, batch);
  }
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

  if (input.supporters.created.length) {
    input.supporters.created.forEach((supporter) =>
      myDb.supporter.batch.create(supporter, batch),
    );
  }
  if (input.supporters.updated.length) {
    input.supporters.updated.forEach((supporter) =>
      myDb.supporter.batch.update(supporter, batch),
    );
  }
  if (input.supporters.deleted.length) {
    input.supporters.deleted.forEach((id) =>
      myDb.supporter.batch.delete(id, batch),
    );
  }

  await batch.commit();
};

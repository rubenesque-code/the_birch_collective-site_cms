import { writeBatch } from "firebase/firestore/lite";

import { myDb } from "../..";

import { firestore } from "~/my-firebase/client";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";
import type { MyPick } from "~/types/utilities";

type Page = MyDb["pages"]["testimonials"];

export const testimonialsPageTransaction = async (input: {
  page: (MyPick<Page, "id"> & Partial<Page>) | null;

  orgDetails: Partial<MyDb["singles"]["orgDetails"]> | null;
  linkLabels: Partial<MyDb["singles"]["linkLabels"]> | null;
  header: Partial<MyDb["singles"]["header"]> | null;
  footer: Partial<MyDb["singles"]["footer"]> | null;

  keywords: {
    updated: DocPartialWithId<MyDb["keyword"]>[];
    created: MyDb["keyword"][];
    deleted: string[];
  };

  "participant-testimonials": {
    updated: DocPartialWithId<MyDb["participant-testimonial"]>[];
    created: MyDb["participant-testimonial"][];
    deleted: string[];
  };

  "professional-testimonials": {
    updated: DocPartialWithId<MyDb["professional-testimonial"]>[];
    created: MyDb["professional-testimonial"][];
    deleted: string[];
  };
}) => {
  const batch = writeBatch(firestore);

  if (input.page) {
    myDb.pages.testimonials.batch.update(input.page, batch);
  }

  if (input.orgDetails) {
    myDb.orgDetails.batch.update(input.orgDetails, batch);
  }
  if (input.header) {
    myDb.header.batch.update(input.header, batch);
  }
  if (input.footer) {
    myDb.footer.batch.update(input.footer, batch);
  }
  if (input.linkLabels) {
    myDb.linkLabels.batch.update(input.linkLabels, batch);
  }

  if (input.keywords.created.length) {
    input.keywords.created.forEach((keyword) =>
      myDb["keyword"].batch.create(keyword, batch),
    );
  }
  if (input.keywords.updated.length) {
    input.keywords.updated.forEach((keyword) =>
      myDb["keyword"].batch.update(keyword, batch),
    );
  }
  if (input.keywords.deleted.length) {
    input.keywords.deleted.forEach((id) =>
      myDb["keyword"].batch.delete(id, batch),
    );
  }

  if (input["participant-testimonials"].created.length) {
    input["participant-testimonials"].created.forEach((testimonial) =>
      myDb["participant-testimonial"].batch.create(testimonial, batch),
    );
  }
  if (input["participant-testimonials"].updated.length) {
    input["participant-testimonials"].updated.forEach((testimonial) =>
      myDb["participant-testimonial"].batch.update(testimonial, batch),
    );
  }
  if (input["participant-testimonials"].deleted.length) {
    input["participant-testimonials"].deleted.forEach((id) =>
      myDb["participant-testimonial"].batch.delete(id, batch),
    );
  }

  if (input["professional-testimonials"].created.length) {
    input["professional-testimonials"].created.forEach((testimonial) =>
      myDb["professional-testimonial"].batch.create(testimonial, batch),
    );
  }
  if (input["professional-testimonials"].updated.length) {
    input["professional-testimonials"].updated.forEach((testimonial) =>
      myDb["professional-testimonial"].batch.update(testimonial, batch),
    );
  }
  if (input["professional-testimonials"].deleted.length) {
    input["professional-testimonials"].deleted.forEach((id) =>
      myDb["professional-testimonial"].batch.delete(id, batch),
    );
  }

  await batch.commit();
};

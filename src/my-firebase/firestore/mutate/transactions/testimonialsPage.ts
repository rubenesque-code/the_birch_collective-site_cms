import { writeBatch } from "firebase/firestore/lite";

import type { MyDb } from "~/types/database";
// import type { DocPartialWithId } from "~/types/database/_helpers";
import { firestore } from "~/my-firebase/client";
import { myDb } from "../..";
import type { MyPick } from "~/types/utilities";
import type { DocPartialWithId } from "~/types/database/_helpers";

type Page = MyDb["pages"]["testimonials"];

export const testimonialsPageTransaction = async (input: {
  page: (MyPick<Page, "id"> & Partial<Page>) | null;

  orgDetails: Partial<MyDb["singles"]["orgDetails"]> | null;
  linkLabels: Partial<MyDb["singles"]["linkLabels"]> | null;
  header: Partial<MyDb["singles"]["header"]> | null;
  footer: Partial<MyDb["singles"]["footer"]> | null;

  testimonials: {
    updated: DocPartialWithId<MyDb["testimonial"]>[];
    created: MyDb["testimonial"][];
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

  await batch.commit();
};

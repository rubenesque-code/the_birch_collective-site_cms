import { writeBatch } from "firebase/firestore/lite";

import type { MyDb } from "~/types/database";
// import type { DocPartialWithId } from "~/types/database/_helpers";
import { firestore } from "~/my-firebase/client";
import { myDb } from "../..";

export const aboutUsPageTransaction = async (input: {
  page: Partial<MyDb["pages"]["aboutUs"]> | null;
  orgDetails: Partial<MyDb["singles"]["orgDetails"]> | null;
  linkLabels: Partial<MyDb["singles"]["linkLabels"]> | null;
  header: Partial<MyDb["singles"]["header"]> | null;
  footer: Partial<MyDb["singles"]["footer"]> | null;
  /*   supporters: {
    updated: DocPartialWithId<MyDb["supporter"]>[];
    created: MyDb["supporter"][];
    deleted: string[];
  }; */
}) => {
  const batch = writeBatch(firestore);

  if (input.page) {
    myDb.pages.aboutUs.batch.update(input.page, batch);
  }

  await batch.commit();
};

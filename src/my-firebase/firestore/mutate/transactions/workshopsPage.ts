import { writeBatch } from "firebase/firestore/lite";

import type { MyDb } from "~/types/database";
import { firestore } from "~/my-firebase/client";
import { myDb } from "../..";
import type { MyPick } from "~/types/utilities";
import type { DocPartialWithId } from "~/types/database/_helpers";

type Page = MyDb["pages"]["workshops"];

export const workshopsPageTransaction = async (input: {
  page: (MyPick<Page, "id"> & Partial<Page>) | null;

  orgDetails: Partial<MyDb["singles"]["orgDetails"]> | null;
  linkLabels: Partial<MyDb["singles"]["linkLabels"]> | null;
  header: Partial<MyDb["singles"]["header"]> | null;
  footer: Partial<MyDb["singles"]["footer"]> | null;

  workshops: {
    updated: DocPartialWithId<MyDb["workshop"]>[];
    created: MyDb["workshop"][];
    deleted: string[];
  };
}) => {
  const batch = writeBatch(firestore);

  if (input.page) {
    myDb.pages["workshops"].batch.update(input.page, batch);
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

  if (input.workshops.created.length) {
    input.workshops.created.forEach((workshop) =>
      myDb["workshop"].batch.create(workshop, batch),
    );
  }
  if (input.workshops.updated.length) {
    input.workshops.updated.forEach((workshop) =>
      myDb["workshop"].batch.update(workshop, batch),
    );
  }
  if (input.workshops.deleted.length) {
    input.workshops.deleted.forEach((id) =>
      myDb["workshop"].batch.delete(id, batch),
    );
  }

  await batch.commit();
};

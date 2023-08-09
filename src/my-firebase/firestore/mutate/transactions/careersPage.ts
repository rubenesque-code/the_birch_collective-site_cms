import { writeBatch } from "firebase/firestore/lite";

import type { MyDb } from "~/types/database";
import { firestore } from "~/my-firebase/client";
import { myDb } from "../..";
import type { MyPick } from "~/types/utilities";
import type { DocPartialWithId } from "~/types/database/_helpers";

type Page = MyDb["pages"]["careers"];

export const careersPageTransaction = async (input: {
  page: (MyPick<Page, "id"> & Partial<Page>) | null;

  orgDetails: Partial<MyDb["singles"]["orgDetails"]> | null;
  linkLabels: Partial<MyDb["singles"]["linkLabels"]> | null;
  header: Partial<MyDb["singles"]["header"]> | null;
  footer: Partial<MyDb["singles"]["footer"]> | null;

  careers: {
    updated: DocPartialWithId<MyDb["career"]>[];
    created: MyDb["career"][];
    deleted: string[];
  };
}) => {
  const batch = writeBatch(firestore);

  if (input.page) {
    myDb.pages["career"].batch.update(input.page, batch);
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

  if (input.careers.created.length) {
    input.careers.created.forEach((career) =>
      myDb["career"].batch.create(career, batch),
    );
  }
  if (input.careers.updated.length) {
    input.careers.updated.forEach((career) =>
      myDb["career"].batch.update(career, batch),
    );
  }
  if (input.careers.deleted.length) {
    input.careers.deleted.forEach((id) =>
      myDb["career"].batch.delete(id, batch),
    );
  }

  await batch.commit();
};

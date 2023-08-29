import { writeBatch } from "firebase/firestore/lite";

import { myDb } from "../..";

import { firestore } from "~/my-firebase/client";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";

export const workshopPageTransaction = async (input: {
  orgDetails: Partial<MyDb["singles"]["orgDetails"]> | null;
  linkLabels: Partial<MyDb["singles"]["linkLabels"]> | null;
  header: Partial<MyDb["singles"]["header"]> | null;
  footer: Partial<MyDb["singles"]["footer"]> | null;

  keywords: {
    updated: DocPartialWithId<MyDb["keyword"]>[];
    created: MyDb["keyword"][];
    deleted: string[];
  };

  workshop: DocPartialWithId<MyDb["workshop"]> | null;
}) => {
  const batch = writeBatch(firestore);

  if (input.workshop) {
    myDb.workshop.batch.update(input.workshop, batch);
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

  await batch.commit();
};

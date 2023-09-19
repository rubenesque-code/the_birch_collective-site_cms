import { writeBatch } from "firebase/firestore/lite";

import { myDb } from "../..";

import { firestore } from "~/my-firebase/client";
import type { MyDb } from "~/types/database";
import { type DocPartialWithId } from "~/types/database/_helpers";

export const imagesPageTransaction = async (input: {
  images: {
    updated: DocPartialWithId<MyDb["image"]>[];
  };

  keywords: {
    updated: DocPartialWithId<MyDb["keyword"]>[];
    created: MyDb["keyword"][];
    deleted: string[];
  };
}) => {
  const batch = writeBatch(firestore);

  if (input.images.updated.length) {
    input.images.updated.forEach((keyword) =>
      myDb["image"].batch.update(keyword, batch),
    );
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

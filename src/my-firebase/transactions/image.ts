import { deleteObject, ref as storageRef } from "firebase/storage";

import { storage } from "../client";
import { myDb } from "../firestore";
import { myStorage } from "../storage";

import { type MyDb } from "~/types/database";
import { type MyPick } from "~/types/utilities";

export const uploadImageToStorageAndCreateFirestoreImage = async (
  input: MyPick<MyDb["image"], "keywords" | "naturalDimensions"> & {
    file: File;
    firestoreId: string;
  },
) => {
  const storageImage =
    await myStorage.transactions.uploadImageAndFetchResizedImageData(
      input.file,
    );

  const newImage = {
    id: input.firestoreId,
    naturalDimensions: input.naturalDimensions,
    storageIds: {
      blur: storageImage.blurImageId,
      large: storageImage.largeImageId,
    },
    urls: {
      blur: storageImage.blurImageURL,
      large: storageImage.largeImageURL,
    },
    keywords: input.keywords,
  };

  await myDb.image.create(newImage);
};

export const deleteImageFromFirestoreAndStorage = async (
  input: MyPick<MyDb["image"], "id" | "storageIds">,
) => {
  await myDb.image.delete(input.id);

  const blurRef = storageRef(storage, `resized/${input.storageIds.blur}`);
  const largeRef = storageRef(storage, `resized/${input.storageIds.large}`);

  await deleteObject(blurRef);
  await deleteObject(largeRef);
};

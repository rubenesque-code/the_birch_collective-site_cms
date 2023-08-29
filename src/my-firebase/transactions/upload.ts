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

  await myDb.image.create({
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
  });
};

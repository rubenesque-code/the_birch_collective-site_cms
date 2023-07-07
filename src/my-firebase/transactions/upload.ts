import { myDb } from "../firestore";
import { myStorage } from "../storage";

export const uploadImageToStorageAndCreateFirestoreImage = async (input: {
  naturalDimensions: {
    width: number;
    height: number;
  };
  file: File;
  firestoreId: string;
}) => {
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
  });
};

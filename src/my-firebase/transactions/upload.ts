import { myDb } from "../firestore";
import { myStorage } from "../storage/transactions";

export const uploadImageToStorageAndCreateFirestoreImage = async (input: {
  naturalDimensions: {
    width: number;
    height: number;
  };
  file: File;
}) => {
  const storageImage =
    await myStorage.transactions.uploadImageAndFetchResizedImageData(
      input.file,
    );

  const firestoreImageRes = await myDb.image.create({
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

  return firestoreImageRes;
};

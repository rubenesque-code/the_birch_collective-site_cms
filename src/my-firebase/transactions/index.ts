import {
  deleteImageFromFirestoreAndStorage,
  uploadImageToStorageAndCreateFirestoreImage,
} from "./image";

export const myFirebaseTransactions = {
  uploadImageToStorageAndCreateFirestoreImage,
  deleteImageFromFirestoreAndStorage,
};

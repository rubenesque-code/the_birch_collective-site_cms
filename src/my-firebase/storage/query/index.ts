import { type StorageReference, getDownloadURL } from "firebase/storage";

const checkImageExists = (ref: StorageReference): Promise<boolean> => {
  const res = getDownloadURL(ref)
    .then(() => true)
    .catch(() => false);

  return res;
};

export const query = {
  checkImageExists,
};

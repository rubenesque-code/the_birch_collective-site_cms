import {
  ref as createRef,
  getDownloadURL,
  uploadBytes,
  type StorageReference,
} from "firebase/storage";
import { v4 as generateUId } from "uuid";
import { wait } from "~/helpers/async";
import { storage_file_system_names } from "~/my-firebase/_static-data/collections-and-docs";
import { storage } from "~/my-firebase/client";

// · below throws an error on first try. Or does it? Code continues to work. May just be a logging issue.
const checkImageExists = (ref: StorageReference): Promise<boolean> => {
  const res = getDownloadURL(ref)
    .then(() => true)
    .catch(() => false);

  return res;
};

const pollImageCreation = async (input: {
  ref: StorageReference;
  getURL: () => Promise<string>;
}) => {
  let imageIsCreated = false;
  let url: undefined | string;
  const startTime = Date.now();

  while (!url && Date.now() - startTime < 5001) {
    await wait(500);
    imageIsCreated = await checkImageExists(input.ref);
    if (imageIsCreated) {
      url = await input.getURL();
    }
  }

  if (!url) {
    throw new Error("image creation timeout");
  }

  return url;
};

const uploadImage = async (file: File) => {
  const img_id_base = generateUId();
  const original_img_ref = createRef(
    storage,
    `${storage_file_system_names.folders.resized}/${img_id_base}`,
  );

  await uploadBytes(original_img_ref, file);

  return { img_id_base };
};

export const uploadImageAndFetchResizedImageData = async (file: File) => {
  const { img_id_base: imageIdBase } = await uploadImage(file);

  const largeImageId = imageIdBase + "_2400x1600";
  const largeImgRef = createRef(
    storage,
    `${storage_file_system_names.folders.resized}/${largeImageId}`,
  );

  const largeImageURL = await pollImageCreation({
    getURL: async () => await getDownloadURL(largeImgRef),
    ref: largeImgRef,
  });

  const blurImageId = imageIdBase + "_32x32";
  const blurImgRef = createRef(
    storage,
    `${storage_file_system_names.folders.resized}/${blurImageId}`,
  );
  const getBlurURL = async () => await getDownloadURL(blurImgRef);
  const blurImageURL = await pollImageCreation({
    getURL: getBlurURL,
    ref: blurImgRef,
  });

  return {
    largeImageURL,
    largeImageId,
    blurImageURL,
    blurImageId,
    storageIdBase: imageIdBase,
  };
};

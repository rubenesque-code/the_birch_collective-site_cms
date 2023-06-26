import {
  ref as createRef,
  deleteObject,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { v4 as generateUId } from "uuid";
import { wait } from "~/helpers/async";
import { storage_file_system_names } from "~/my-firebase/_static-data/collections-and-docs";
import { storage } from "~/my-firebase/client";
import { checkImageExists } from "~/my-firebase/storage/fetch";

const poll = async (id: string, getURL: () => Promise<string>) => {
  let imageIsCreated = await checkImageExists(id);
  let url: string | undefined;
  while (!url) {
    await wait();
    imageIsCreated = await checkImageExists(id);
    if (imageIsCreated) {
      url = await getURL();
    }
  }

  return url;
};

export const uploadImage = async (file: File) => {
  try {
    console.log("uploading image");

    const unresizedId = generateUId();
    const unresizedRef = createRef(
      storage,
      `${storage_file_system_names.folders.resized}/${unresizedId}`,
    );

    await uploadBytes(unresizedRef, file);
    console.log("Uploaded bytes");

    const URLId = unresizedId + "_2400x1600";
    const URLref = createRef(
      storage,
      `${storage_file_system_names.folders.resized}/${URLId}`,
    );
    console.log("getting url...");
    const getURL = async () => await getDownloadURL(URLref);
    const URL = await poll(URLId, getURL);

    const blurURLId = unresizedId + "_32x32";
    const blurURLref = createRef(
      storage,
      `${storage_file_system_names.folders.resized}/${blurURLId}`,
    );
    console.log("getting blur url...");
    const getBlurURL = async () => await getDownloadURL(blurURLref);
    const blurURL = await poll(blurURLId, getBlurURL);

    return {
      URL,
      URLstorageId: URLId,
      blurURL,
      blurURLstorageId: blurURLId,
      unresizedId,
    };
  } catch (error) {
    console.log("error:", error);
  }
};

export const deleteImage = async (unresizedId: string) => {
  const URLId = unresizedId + "_2400x1600";
  const URLref = createRef(
    storage,
    `${storage_file_system_names.folders.resized}/${URLId}`,
  );
  const blurURLId = unresizedId + "_32x32";
  const blurURLref = createRef(
    storage,
    `${storage_file_system_names.folders.resized}/${blurURLId}`,
  );

  await deleteObject(URLref);
  await deleteObject(blurURLref);
};

export const createImage = async (file: File) => {
  const id = generateUId();
  const imageRef = createRef(
    storage,
    `${storage_file_system_names.folders.resized}/${id}`,
  );

  await uploadBytes(imageRef, file);

  const fullUrl = await getDownloadURL(imageRef);
  console.log("fullUrl:", fullUrl);
  // const urlEndpoint = getImageEndpoint(fullUrl)

  // return { urlEndpoint, id }
};

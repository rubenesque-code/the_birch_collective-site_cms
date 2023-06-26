import { listAll, ref } from "firebase/storage";
import { storage_file_system_names } from "~/my-firebase/_static-data/collections-and-docs";
import { storage } from "~/my-firebase/client";

export const checkImageExists = async (id: string) => {
  try {
    const listRef = ref(storage, storage_file_system_names.folders.resized);
    console.log("listRef:", listRef);
    const imageRefs = (await listAll(listRef)).items;
    console.log("imageRefs:", imageRefs);
    const imageIds = imageRefs.map((ref) => ref.name);
    console.log("imageIds:", imageIds);

    const isImage = imageIds.includes(id);
    console.log("isImage:", isImage);

    return isImage;
  } catch (error) {
    console.log("error:", error);
  }
};

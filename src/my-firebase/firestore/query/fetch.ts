import { doc, getDoc } from "firebase/firestore/lite";

import { firestore_file_system_names } from "../../_static-data/collections-and-docs";
import { firestore } from "~/my-firebase/client";
import type { MyDb } from "~/types/database";

export const fetchLanding = async () => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.pages,
    firestore_file_system_names.docs.pages.landing,
  );
  const docSnap = await getDoc(docRef);
  const data = docSnap.data() as unknown as MyDb["pages"]["landing"];

  return data;
};

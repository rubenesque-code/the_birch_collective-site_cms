import {
  type DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore/lite";
import { firestore } from "~/my-firebase/client";
import type { EditableLabels, OrgDetails } from "~/types/database";

const fetchSectionLabels = async () => {
  const docRef = doc(firestore, "editableElements", "names");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data() as unknown as EditableLabels["sections"];

  return data;
};

// td: restucture db?

const fetchOrgDetails = async () => {
  const collectionRef = collection(firestore, "orgDetails");
  const docsSnap = await getDocs(collectionRef);

  const data: DocumentData[] = [];
  docsSnap.forEach((doc) => {
    const d = doc.data();
    data.push(d);
  });

  return data[0] as unknown as OrgDetails;
};

export const myDb = {
  fetch: {
    editableLabels: {
      sections: fetchSectionLabels,
    },
    orgDetails: fetchOrgDetails,
  },
};

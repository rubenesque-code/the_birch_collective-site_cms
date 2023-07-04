import {
  type DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore/lite";

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

export const fetchOneImage = async (id: string) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.images,
    id,
  );
  const docSnap = await getDoc(docRef);
  const data = docSnap.data() as unknown as MyDb["image"];

  return data;
};

export const fetchImages = async () => {
  const collectionRef = collection(
    firestore,
    firestore_file_system_names.collections.images,
  );

  const querySnapshot = await getDocs(collectionRef);

  const data: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    data.push(d);
  });

  return data as unknown as MyDb["image"][];
};

export const fetchOneTestimonial = async (id: string) => {
  const docRef = doc(
    firestore,
    firestore_file_system_names.collections.testimonials,
    id,
  );
  const docSnap = await getDoc(docRef);
  const data = docSnap.data() as unknown as MyDb["testimonial"];

  return data;
};

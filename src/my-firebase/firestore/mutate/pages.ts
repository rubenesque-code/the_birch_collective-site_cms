import { type WriteBatch } from "firebase/firestore/lite";
import type { MyDb } from "~/types/database";
import { getDocRef } from "../_helpers";

export const batchUpdateLandingPage = (
  data: Partial<MyDb["pages"]["landing"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "landing");

  batch.update(docRef, data);
};

export const batchUpdateTestimonialsPage = (
  data: Partial<MyDb["pages"]["testimonials"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "testimonials");

  batch.update(docRef, data);
};

export const batchUpdateAboutUsPage = (
  data: Partial<MyDb["pages"]["aboutUs"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "aboutUs");

  batch.update(docRef, data);
};

export const batchUpdateProgrammesPage = (
  data: Partial<MyDb["pages"]["programmes"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "programmes");

  batch.update(docRef, data);
};

export const batchUpdateDonatePage = (
  data: Partial<MyDb["pages"]["donate"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "donate");

  batch.update(docRef, data);
};

export const batchUpdateVolunteerPositionsPage = (
  data: Partial<MyDb["pages"]["volunteer-positions"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "volunteerPositions");

  batch.update(docRef, data);
};

export const batchUpdateCareersPage = (
  data: Partial<MyDb["pages"]["careers"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "careers");

  batch.update(docRef, data);
};

export const batchUpdateWorkshopsPage = (
  data: Partial<MyDb["pages"]["workshops"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "workshops");

  batch.update(docRef, data);
};

export const batchUpdateTheoryOfChangePage = (
  data: Partial<MyDb["pages"]["theory-of-change"]>,
  batch: WriteBatch,
) => {
  const docRef = getDocRef("pages", "theoryOfChange");

  batch.update(docRef, data);
};

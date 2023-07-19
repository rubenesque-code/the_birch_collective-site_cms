import { createImage } from "./mutate/image";
import { batchUpdateLandingPage, updateLandingPage } from "./mutate/pages";
import {
  batchCreateTestimonial,
  batchDeleteTestimonial,
  batchUpdateTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "./mutate/testimonial";
import {
  batchCreateProgramme,
  batchDeleteProgramme,
  batchUpdateProgramme,
  createProgramme,
  deleteProgramme,
  updateProgramme,
} from "./mutate/programme";

import { landingPageTransaction } from "./mutate/transactions/landingPage";
import {
  fetchImages,
  fetchLanding,
  fetchOneImage,
  fetchOneTestimonial,
  fetchTestimonials,
  fetchOneProgramme,
  fetchProgrammes,
} from "./query";

export const myDb = {
  pages: {
    landing: {
      fetch: fetchLanding,
      update: updateLandingPage,
      batch: {
        update: batchUpdateLandingPage,
      },
    },
  },
  image: {
    create: createImage,
    fetchOne: fetchOneImage,
    fetchAll: fetchImages,
  },
  testimonial: {
    fetchOne: fetchOneTestimonial,
    fetchAll: fetchTestimonials,
    create: createTestimonial,
    update: updateTestimonial,
    delete: deleteTestimonial,
    batch: {
      create: batchCreateTestimonial,
      update: batchUpdateTestimonial,
      delete: batchDeleteTestimonial,
    },
  },
  programme: {
    fetchOne: fetchOneProgramme,
    fetchAll: fetchProgrammes,
    create: createProgramme,
    update: updateProgramme,
    delete: deleteProgramme,
    batch: {
      create: batchCreateProgramme,
      update: batchUpdateProgramme,
      delete: batchDeleteProgramme,
    },
  },
  transactions: {
    pages: {
      landing: landingPageTransaction,
    },
  },
};

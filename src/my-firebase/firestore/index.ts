import { createImage } from "./mutate/image";
import { batchUpdateLandingPage, updateLandingPage } from "./mutate/pages";
import {
  batchCreateTestimonial,
  batchDeleteTestimonial,
  batchUpdateTestimonial,
  createTestimonial,
  updateTestimonial,
} from "./mutate/testimonial";
import { landingPageTransaction } from "./mutate/transactions/landingPage";
import {
  fetchImages,
  fetchLanding,
  fetchOneImage,
  fetchOneTestimonial,
  fetchTestimonials,
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
    batch: {
      create: batchCreateTestimonial,
      update: batchUpdateTestimonial,
      delete: batchDeleteTestimonial,
    },
  },
  transactions: {
    pages: {
      landing: landingPageTransaction,
    },
  },
};

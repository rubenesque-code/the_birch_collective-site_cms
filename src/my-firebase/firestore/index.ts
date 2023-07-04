import { createImage } from "./mutate/image";
import { updateLandingPage } from "./mutate/landing";
import {
  fetchImages,
  fetchLanding,
  fetchOneImage,
  fetchOneTestimonial,
} from "./query";

export const myDb = {
  pages: {
    landing: {
      fetch: fetchLanding,
      update: updateLandingPage,
    },
  },
  image: {
    create: createImage,
    fetchOne: fetchOneImage,
    fetchAll: fetchImages,
  },
  testimonial: {
    fetchOne: fetchOneTestimonial,
  },
};

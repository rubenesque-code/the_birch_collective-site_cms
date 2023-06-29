import { createImage } from "./mutate/image";
import { updateLandingPage } from "./mutate/landing";
import { fetchLanding } from "./query";

export const myDb = {
  pages: {
    landing: {
      fetch: fetchLanding,
      update: updateLandingPage,
    },
  },
  image: {
    create: createImage,
  },
};

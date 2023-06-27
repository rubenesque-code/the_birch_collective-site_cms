import { createImage } from "./mutate/image";
import { fetchLanding } from "./query";

export const myDb = {
  pages: {
    landing: {
      fetch: fetchLanding,
    },
  },
  image: {
    create: createImage,
  },
};

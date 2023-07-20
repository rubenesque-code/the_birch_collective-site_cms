import type { MyDb } from "~/types/database";

export const seedData: { page: MyDb["pages"]["landing"] } = {
  page: {
    bannerImage: {
      dbConnections: {
        imageId: null,
      },
      position: {
        x: 50,
        y: 50,
      },
      infoPopover: {
        text: "",
      },
    },
    orgHeadings: {
      name: "",
      byline: "",
    },
    aboutUs: {
      heading: "",
      buttonText: "",
      entries: [],
    },
    workshops: {
      image: {
        dbConnections: {
          imageId: null,
        },
        position: {
          x: 50,
          y: 50,
        },
      },
      textOverlay: {
        heading: "",
        body: "",
      },
    },
    programmes: {
      heading: "",
      subheading: "",
      entries: [],
      buttonText: "",
    },
    photoAlbum: {
      heading: "",
      entries: [],
    },
  },
};

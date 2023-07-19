type Landing = {
  bannerImage: {
    dbConnections: {
      imageId: string | null;
    };
    position: {
      x: number;
      y: number;
    };
    infoPopover: {
      text: string;
    };
  };
  orgHeadings: {
    name: string;
    byline: string;
  };
  aboutUs: {
    heading: string;
    buttonText: string;
    entries: { id: string; text: string; index: number }[];
  };
  workshops: {
    image: {
      dbConnections: {
        imageId: string | null;
      };
      position: {
        x: number;
        y: number;
      };
    };
    textOverlay: {
      heading: string;
      body: string;
    };
  };
  programmes: {
    heading: string;
    subheading: string;
    entries: {
      id: string;
      dbConnections: { programmeId: string };
    }[];
    buttonText: string;
  };
  photoAlbum: {
    heading: string;
    images: {
      id: string;
      dbConnections: { imageId: string };
      position: {
        x: number;
        y: number;
      };
    }[];
  };
};

export type Pages = {
  landing: Landing;
};

type Landing = {
  bannerImage: {
    dbConnections: {
      imageId: string | null;
    };
    position: {
      x: number;
      y: number;
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
};

export type Pages = {
  landing: Landing;
};

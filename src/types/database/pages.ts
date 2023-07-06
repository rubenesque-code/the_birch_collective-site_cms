type Landing = {
  bannerImage: {
    dbConnections: {
      imageId: string | null;
    };
    // firestoreImageId: string | null;
    position: {
      x: number;
      y: number;
    };
  };
  orgHeadings: {
    name: string;
    byline: string;
  };
};

export type Pages = {
  landing: Landing;
};

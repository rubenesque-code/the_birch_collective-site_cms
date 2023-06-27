type Landing = {
  /*   bannerImage: {
    firestoreImageId: string;
    position: {
      x: number;
      y: number;
    };
  }; */
  orgNameAndByline: {
    name: string;
    byline: string;
  };
};

export type Pages = {
  landing: Landing;
};

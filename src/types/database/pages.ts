type Landing = {
  bannerImage: {
    firestoreImageId: string | null;
    /*     position: {
      x: number;
      y: number;
    }; */
  };
  orgNameAndByline: {
    name: string;
    byline: string;
  };
};

export type Pages = {
  landing: Landing;
};

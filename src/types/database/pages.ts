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
  testimonials: {
    id: string;
    dbConnections: { testimonialId: string | null };
    order: number;
  }[];
};

export type Pages = {
  landing: Landing;
};

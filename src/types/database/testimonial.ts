export type Testimonial = {
  id: string;
  image: {
    dbConnect: {
      imageId: string | null;
    };
    position: {
      x: number;
      y: number;
    };
  };
  endorserName: string;
  text: string;
  index: number;
};

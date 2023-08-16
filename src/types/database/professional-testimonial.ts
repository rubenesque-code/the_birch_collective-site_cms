export type ProfessionalTestimonial = {
  id: string;
  image: {
    dbConnections: {
      imageId: string | null;
    };
    position: {
      x: number;
      y: number;
    };
  };
  endorserName: string;
  endorserTitle: string;
  text: string;
  index: number;
};

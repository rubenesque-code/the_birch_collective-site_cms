export type Supporter = {
  id: string;
  index: number;
  image: {
    dbConnections: {
      imageId: string | null;
    };
  };
  url: string;
  title: string;
};

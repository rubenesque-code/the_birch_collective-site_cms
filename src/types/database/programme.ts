export type Programme = {
  id: string;
  index: number;
  subtitle: string;
  title: string;
  summary: {
    image: {
      dbConnections: {
        imageId: string | null;
      };
      position: {
        x: number;
        y: number;
      };
    };
    mainText: string;
    bullets: { id: string; index: number; text: string }[];
  };
};

// probs a sections arr

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
    text: string;
    bullets: { id: string; text: string }[];
  };
};

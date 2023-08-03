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
  sections: {
    id: string;
    index: number;
    colour: "brown" | "green" | "orange";
    bullets: {
      icon:
        | "leaf"
        | "tree"
        | "orange"
        | "potted-plant"
        | "plant"
        | "flower-tulip"
        | "flower-lotus"
        | "feather"
        | "flame"
        | "fish-simple"
        | "mountains"
        | "moon"
        | "grains"
        | "star"
        | "tipi"
        | "sun";
      entries: { id: string; index: number; text: string }[];
    };
  }[];
};

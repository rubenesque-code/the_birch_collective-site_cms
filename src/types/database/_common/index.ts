export type RichSection = {
  id: string;

  index: number;

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

    type: "text" | "text-and-title";

    entries: {
      id: string;
      index: number;
      text: string;
      title: string | null;
    }[];
  };

  colour: "brown" | "green" | "orange";

  title: string;

  description: string | null;
};

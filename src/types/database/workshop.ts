export type Workshop = {
  id: string;

  index: number;

  bannerImage: {
    dbConnections: {
      imageId: string | null;
    };

    position: {
      x: number;
      y: number;
    };

    use: boolean;
  };

  info: { id: string; index: number; title: string; text: string }[];

  mainText: string;

  photoAlbum: {
    use: boolean;

    entries: {
      id: string;
      index: number;
      image: {
        dbConnections: {
          imageId: string | null;
        };
      };
    }[];

    heading: string;
  };

  sections: {
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
  }[];

  signUp: {
    heading: string;

    text: string;

    buttonText: string;

    notifyEmails: string[];
  };

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
  };

  subtitle: string;

  tickets: {
    heading: string;
    text: string;
    signUpButton: {
      link: string;
      text: string;
    };
  };

  title: string;

  type: "paid" | "free";
};

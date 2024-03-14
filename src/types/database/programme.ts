import type { RichSection } from "./_common";

export type Programme = {
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
  };

  info: { id: string; index: number; title: string; text: string }[];

  mainText: string;

  usePosters: boolean;

  posters: {
    id: string;
    index: number;
    image: {
      dbConnections: {
        imageId: string | null;
      };
    };
  }[];

  photoAlbum: {
    use: boolean;

    entries: {
      id: string;
      index: number;
      image: {
        dbConnections: {
          imageId: string | null;
        };
        position: {
          x: number;
          y: number;
        };
      };
    }[];

    heading: string;
  };

  sections: RichSection[];

  /*   sections: {
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
    }[]; */

  signUp: {
    heading: string;

    text: string;

    buttonText: string;

    notifyEmails: string[];

    downloadLink: string | null;

    type: "online-form" | "download-sheet";
  };

  subtitle: string;

  summary: {
    bullets: { id: string; index: number; text: string }[];

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

  title: string;
};

// https://docs.google.com/document/d/1l26Vhkwv2NwyYpRTzWNLkdBJAG1Swvwz/export?format=docx

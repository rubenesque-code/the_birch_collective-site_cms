export type Pages = {
  landing: Landing;
  aboutUs: AboutUs;
  programmes: Programmes;
};

type Landing = {
  id: "landing-page";
  bannerImage: {
    dbConnections: {
      imageId: string | null;
    };
    position: {
      x: number;
      y: number;
    };
    infoPopover: {
      text: string;
    };
  };
  orgHeadings: {
    name: string;
    byline: string;
  };
  aboutUs: {
    heading: string;
    buttonText: string;
    entries: { id: string; text: string; index: number }[];
  };
  workshops: {
    image: {
      dbConnections: {
        imageId: string | null;
      };
      position: {
        x: number;
        y: number;
      };
    };
    textOverlay: {
      heading: string;
      body: string;
    };
  };
  programmes: {
    heading: string;
    subheading: string;
    entries: {
      id: string;
      dbConnections: { programmeId: string };
    }[];
    buttonText: string;
  };
  photoAlbum: {
    heading: string;
    entries: {
      image: {
        dbConnections: { imageId: string };
        position: {
          x: number;
          y: number;
        };
      };
      id: string;
      index: number;
    }[];
  };
  supportUs: {
    heading: string;
    donate: {
      buttonText: string;
      description: string;
      image: {
        dbConnections: {
          imageId: string | null;
        };
        position: {
          x: number;
          y: number;
        };
      };
    };
    volunteer: {
      buttonText: string;
      description: string;
      image: {
        dbConnections: {
          imageId: string | null;
        };
        position: {
          x: number;
          y: number;
        };
      };
    };
  };
  supporters: {
    heading: string;
    subheading: string;
    entries: {
      id: string;
      dbConnections: { supporterId: string };
    }[];
  };
};

type AboutUs = {
  id: "about-page";
  bannerImage: {
    dbConnections: {
      imageId: string | null;
    };
    position: {
      x: number;
      y: number;
    };
  };
  heading: string;
  subheading: string;
  mainText: string;
  theTeam: {
    heading: string;
    text: string;
    members: {
      id: string;
      index: number;
      name: string;
      role: string;
      bio: string;
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
  };
};

type Programmes = {
  id: "programmes-page";
  bannerImage: {
    dbConnections: {
      imageId: string | null;
    };
    position: {
      x: number;
      y: number;
    };
  };
  heading: string;
  mainText: string;
};

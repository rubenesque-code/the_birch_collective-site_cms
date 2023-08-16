export type Pages = {
  landing: Landing;
  aboutUs: AboutUs;
  programmes: Programmes;
  donate: Donate;
  ["volunteer-positions"]: VolunteerPositions;
  careers: Careers;
  workshops: Workshops;
  testimonials: Testimonials;
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

  partners: {
    heading: string;
    subheading: string;
    entries: {
      id: string;
      dbConnections: { partnerId: string };
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

type Donate = {
  id: "donate-page";

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

  body: {
    heading: string;
    text: string;
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

type VolunteerPositions = {
  id: "volunteer-positions-page";

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

  opportunities: {
    heading: string;

    entries: {
      id: string;
      index: number;
      dbConnections: { volunteerPositionId: string };
    }[];
  };
};

type Careers = {
  id: "careers-page";

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

  followOnSocialMediaText: string;

  careers: {
    heading: string;

    text: string;

    entries: {
      id: string;
      dbConnections: { careerId: string };
    }[];
  };
};

type Workshops = {
  id: "workshops-page";

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

  aboutAmy: {
    followOnInstaText: string;

    heading: string;

    image: {
      dbConnections: {
        imageId: string | null;
      };
      position: {
        x: number;
        y: number;
      };
    };

    instaLink: string;

    text: string;
  };
};

type Testimonials = {
  id: "testimonials-page";

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

  participants: {
    heading: string;
    subheading: string;
    text: string;
  };

  professionals: {
    heading: string;
    subheading: string;
    text: string;
  };
};

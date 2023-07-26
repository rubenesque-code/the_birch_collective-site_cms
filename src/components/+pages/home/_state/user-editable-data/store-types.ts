import type { MyDb } from "~/types/database";

// □ Rename DbData to reflect user edited store date?

type UserEditableDataStore = { data: DbData; actions: Actions };

export type { UserEditableDataStore, DbData as UserEditableDbData };

type DbData = {
  page: MyDb["pages"]["landing"];
  testimonials: MyDb["testimonial"][];
  programmes: MyDb["programme"][];
  supporters: MyDb["supporter"][];
  orgDetails: MyDb["singles"]["orgDetails"];
  linkLabels: MyDb["singles"]["linkLabels"];
  header: MyDb["singles"]["header"];
  footer: MyDb["singles"]["footer"];
};

type Actions = {
  undo: (updatedData: DbData) => void;
  page: PageActions;
  testimonial: TestimonialActions;
  programme: ProgrammeActions;
  supporter: SupporterActions;
  orgDetails: OrgDetailsActions;
  linkLabels: LinkLabelsActions;
  header: HeaderActions;
  footer: FooterActions;
};

type PageActions = {
  bannerImage: {
    dbConnections: { imageId: { update: (newVal: string) => void } };
    position: {
      x: { update: (newVal: number) => void };
      y: { update: (newVal: number) => void };
    };
    infoPopover: {
      text: {
        update: (newValue: string) => void;
      };
    };
  };
  orgHeadings: {
    name: { update: (newVal: string) => void };
    byline: { update: (newVal: string) => void };
  };
  aboutUs: {
    heading: { update: (newVal: string) => void };
    buttonText: { update: (newVal: string) => void };
    entry: {
      create: (arg0: DbData["page"]["aboutUs"]["entries"][number]) => void;
      delete: (arg0: { id: string }) => void;
      updateText: (arg0: { id: string; newVal: string }) => void;
      order: {
        update: (arg0: { activeId: string; overId: string }) => void;
      };
    };
  };
  workshops: {
    image: {
      dbConnections: { imageId: { update: (newVal: string) => void } };
      position: {
        x: { update: (newVal: number) => void };
        y: { update: (newVal: number) => void };
      };
    };
    textOverlay: {
      heading: { update: (newVal: string) => void };
      body: { update: (newVal: string) => void };
    };
  };
  programmes: {
    heading: { update: (newVal: string) => void };
    subheading: { update: (newVal: string) => void };
    entry: {
      add: (arg0: { dbConnect: { programmeId: string }; id?: string }) => void;
      remove: (arg0: { id: string }) => void;
    };
    buttonText: { update: (newVal: string) => void };
  };
  photoAlbum: {
    heading: {
      update: (newVal: string) => void;
    };
    entry: {
      create: (arg0: DbData["page"]["photoAlbum"]["entries"][number]) => void;
      delete: (arg0: { id: string }) => void;
      image: {
        dbConnections: {
          imageId: { update: (arg0: { id: string; newVal: string }) => void };
        };
        position: {
          x: { update: (arg0: { id: string; newVal: number }) => void };
          y: { update: (arg0: { id: string; newVal: number }) => void };
        };
      };
      order: {
        update: (arg0: { activeId: string; overId: string }) => void;
      };
    };
  };

  supportUs: {
    heading: {
      update: (newVal: string) => void;
    };
    donate: {
      buttonText: {
        update: (newVal: string) => void;
      };
      description: {
        update: (newVal: string) => void;
      };
      image: {
        dbConnections: {
          imageId: { update: (imageId: string) => void };
        };
        position: {
          x: { update: (newVal: number) => void };
          y: { update: (newVal: number) => void };
        };
      };
    };
    volunteer: {
      buttonText: {
        update: (newVal: string) => void;
      };
      description: {
        update: (newVal: string) => void;
      };
      image: {
        dbConnections: {
          imageId: { update: (imageId: string) => void };
        };
        position: {
          x: { update: (newVal: number) => void };
          y: { update: (newVal: number) => void };
        };
      };
    };
  };

  supporters: {
    heading: {
      update: (newVal: string) => void;
    };
    subheading: {
      update: (newVal: string) => void;
    };
    entry: {
      add: (arg0: { dbConnections: { supporterId: string } }) => void;
      remove: (arg0: { id: string }) => void;
    };
  };
};

type TestimonialActions = {
  create: (arg0: DbData["testimonials"][number]) => void;
  delete: (arg0: { id: string }) => void;
  text: {
    update: (arg0: { id: string; newVal: string }) => void;
  };
  endorserName: {
    update: (arg0: { id: string; newVal: string }) => void;
  };
  order: {
    update: (arg0: { activeId: string; overId: string }) => void;
  };
  image: {
    dbConnections: {
      imageId: { update: (arg0: { id: string; newVal: string }) => void };
    };
    position: {
      x: { update: (arg0: { id: string; newVal: number }) => void };
      y: { update: (arg0: { id: string; newVal: number }) => void };
    };
  };
};

type ProgrammeActions = {
  create: (arg0: DbData["programmes"][number]) => void;
  delete: (arg0: { id: string }) => void;
  order: {
    update: (arg0: { activeId: string; overId: string }) => void;
  };
  summary: {
    update: (arg0: { id: string; newVal: string }) => void;
  };
  title: {
    update: (arg0: { id: string; newVal: string }) => void;
  };
  subtitle: {
    update: (arg0: { id: string; newVal: string }) => void;
  };
};

type SupporterActions = {
  create: (arg0: DbData["supporters"][number]) => void;
  delete: (arg0: { id: string }) => void;
  order: {
    update: (arg0: { activeId: string; overId: string }) => void;
  };
  name: {
    update: (arg0: { id: string; newVal: string }) => void;
  };
  url: {
    update: (arg0: { id: string; newVal: string }) => void;
  };
  image: {
    dbConnections: {
      imageId: { update: (arg0: { id: string; newVal: string }) => void };
    };
  };
};

type OrgDetailsActions = {
  name: {
    update: (arg0: string) => void;
  };
  logoImage: {
    dbConnections: {
      imageId: { update: (arg0: string) => void };
    };
  };
  contact: {
    address: {
      update: (arg0: string) => void;
    };
    phoneNumber: {
      update: (arg0: string) => void;
    };
    email: {
      update: (arg0: string) => void;
    };
  };
  socialMediaLinks: {
    facebook: {
      update: (arg0: string) => void;
    };
    instagram: {
      update: (arg0: string) => void;
    };
    linkedIn: {
      update: (arg0: string) => void;
    };
  };
};

type LinkLabelsActions = {
  aboutUs: {
    update: (arg0: string) => void;
  };
  programmes: {
    update: (arg0: string) => void;
  };
  getInvolved: {
    update: (arg0: string) => void;
  };
  workshops: {
    update: (arg0: string) => void;
  };
  donate: {
    update: (arg0: string) => void;
  };
  volunteer: {
    update: (arg0: string) => void;
  };
  meetTheTeam: {
    update: (arg0: string) => void;
  };
  getInTouch: {
    update: (arg0: string) => void;
  };
  careers: {
    update: (arg0: string) => void;
  };
};

type HeaderActions = {
  aboutUs: {
    popover: {
      heading: {
        update: (arg0: string) => void;
      };
      subheading: {
        update: (arg0: string) => void;
      };
    };
  };
  getInvolved: {
    popover: {
      heading: {
        update: (arg0: string) => void;
      };
      subheading: {
        update: (arg0: string) => void;
      };
    };
  };
};

type FooterActions = {
  livingWageEmployer: {
    text: {
      update: (arg0: string) => void;
    };
  };
  orgDescription: {
    update: (arg0: string) => void;
  };
  message: {
    update: (arg0: string) => void;
  };
};

/* type GenerateLandingDbActions<TData extends DbData> = {
  [k in keyof TData]: TData[k] extends Record<string, unknown>
    ? {
        [k2 in keyof TData[k]]: TData[k][k2] extends Record<string, unknown>
          ? {
              [k3 in keyof TData[k][k2]]: TData[k][k2][k3] extends Record<
                string,
                unknown
              >
                ? never
                : (updatedVal: NonNullable<TData[k][k2][k3]>) => void;
            }
          : (updatedVal: NonNullable<TData[k][k2]>) => void;
      }
    : TData[k] extends unknown[]
    ? never
    : (updatedVal: TData[k]) => void;
};

type DbActions = GenerateLandingDbActions<DbData>; */

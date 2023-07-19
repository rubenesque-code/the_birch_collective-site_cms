import type { MyDb } from "~/types/database";

// □ Rename DbData to reflect user edited store date?

type DbData = {
  page: MyDb["pages"]["landing"];
  testimonials: MyDb["testimonial"][];
  programmes: MyDb["programme"][];
};

type Actions = {
  undo: (updatedData: DbData) => void;
  page: {
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
        add: (arg0: {
          dbConnect: { programmeId: string };
          id?: string;
        }) => void;
        remove: (arg0: { id: string }) => void;
      };
    };
  };
  testimonial: {
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
      dbConnect: {
        imageId: { update: (arg0: { id: string; newVal: string }) => void };
      };
      position: {
        x: { update: (arg0: { id: string; newVal: number }) => void };
        y: { update: (arg0: { id: string; newVal: number }) => void };
      };
    };
  };
  programme: {
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
};

type UserEditableDataStore = { data: DbData; actions: Actions };

export type { UserEditableDataStore, DbData as UserEditableDbData };

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

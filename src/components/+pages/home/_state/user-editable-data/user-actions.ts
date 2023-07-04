import type { MyDb } from "~/types/database";

type DbData = MyDb["pages"]["landing"];

type Actions = {
  undo: (updatedData: DbData) => void;
  bannerImage: {
    dbConnections: { imageId: { update: (newVal: string) => void } };
    position: {
      x: { update: (newVal: number) => void };
      y: { update: (newVal: number) => void };
    };
  };
  orgHeadings: {
    name: { update: (newVal: string) => void };
    byline: { update: (newVal: string) => void };
  };
  testimonials: {
    order: {
      update: (arg0: { activeId: string; overId: string }) => void;
    };
  };
};

export { type Actions };

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

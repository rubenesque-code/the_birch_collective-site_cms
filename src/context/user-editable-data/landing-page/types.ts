import type { MyDb } from "~/types/database";
import type { GenerateActions as GenerateNonArrActions } from "../_helpers/types";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = MyDb["pages"]["landing"];

// can do a deep merge?
type ArrActions = {
  aboutUs: {
    entries: {
      create: (arg0: Data["aboutUs"]["entries"][number]) => void;
      delete: (arg0: { id: string }) => void;
      updateText: (arg0: { id: string; newVal: string }) => void;
      reorder: (arg0: { activeId: string; overId: string }) => void;
    };
  };

  photoAlbum: {
    entries: {
      create: (arg0: Data["photoAlbum"]["entries"][number]) => void;
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
      reorder: (arg0: { activeId: string; overId: string }) => void;
    };
  };

  programmes: {
    entries: {
      add: (arg0: { dbConnect: { programmeId: string }; id?: string }) => void;
      remove: (arg0: { id: string }) => void;
    };
  };

  supporters: {
    entries: {
      add: (arg0: { dbConnections: { supporterId: string } }) => void;
      remove: (arg0: { id: string }) => void;
    };
  };
};

type Actions = {
  overWrite: (data: Data) => void;
} & GenerateNonArrActions<Data> &
  ArrActions;

import type { MyDb } from "~/types/database";

export type Store = {
  data: Data;
  actions: Actions;
};

export type Partner = MyDb["partner"];

type Data = Partner[];

type Actions = {
  overWrite: (data: Data) => void;
  create: (arg0: Partner) => void;
  delete: (arg0: { id: string }) => void;
  reorder: (arg0: { activeId: string; overId: string }) => void;
  name: (arg0: { id: string; newVal: string }) => void;
  url: (arg0: { id: string; newVal: string }) => void;
  image: {
    dbConnections: {
      imageId: (arg0: { id: string; newVal: string }) => void;
    };
  };
};

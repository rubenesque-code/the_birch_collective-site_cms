import type { MyDb } from "~/types/database";

export type Store = {
  data: Data;
  actions: Actions;
};

export type Supporter = MyDb["supporter"];
type Data = Supporter[];

type Actions = {
  overWrite: (data: Data) => void;
  create: (arg0: Supporter) => void;
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

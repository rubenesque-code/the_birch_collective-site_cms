import type { MyDb } from "~/types/database";

export type Store = {
  data: Data;
  actions: Actions;
};

export type Testimonial = MyDb["testimonial"];
type Data = Testimonial[];

type Actions = {
  overWrite: (data: Data) => void;
  create: (arg0: Testimonial) => void;
  delete: (arg0: { id: string }) => void;
  reorder: (arg0: { activeId: string; overId: string }) => void;
  text: (arg0: { id: string; newVal: string }) => void;
  endorserName: (arg0: { id: string; newVal: string }) => void;
  image: {
    dbConnections: {
      imageId: (arg0: { id: string; newVal: string }) => void;
    };
    position: {
      x: (arg0: { id: string; newVal: number }) => void;
      y: (arg0: { id: string; newVal: number }) => void;
    };
  };
};

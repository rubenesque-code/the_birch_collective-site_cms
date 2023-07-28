import type { MyDb } from "~/types/database";

export type Store = {
  data: Data;
  actions: Actions;
};

export type Programme = MyDb["programme"];
type Data = Programme[];

type Actions = {
  overWrite: (data: Data) => void;
  create: (arg0: Programme) => void;
  delete: (arg0: { id: string }) => void;
  reorder: (arg0: { activeId: string; overId: string }) => void;
  summary: (arg0: { id: string; newVal: string }) => void;
  title: (arg0: { id: string; newVal: string }) => void;
  subtitle: (arg0: { id: string; newVal: string }) => void;
};

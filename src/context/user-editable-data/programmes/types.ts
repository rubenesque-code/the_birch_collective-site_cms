import type { MyDb } from "~/types/database";
import type { MyOmit } from "~/types/utilities";
import type { GenerateEntityNonArrActions } from "../_helpers/types";

export type Store = {
  data: Data;
  actions: Actions;
};

export type Programme = MyDb["programme"];
type Data = Programme[];

type ArrActions = {
  summary: {
    bullets: {
      create: (arg0: {
        programmeId: string;
        newEntry: Programme["summary"]["bullets"][number];
      }) => void;
      delete: (arg0: { programmeId: string; bulletId: string }) => void;
      reorder: (arg0: {
        programmeId: string;
        bullets: { activeId: string; overId: string };
      }) => void;
      text: (arg0: {
        programmeId: string;
        bulletId: string;
        updatedValue: string;
      }) => void;
    };
  };
};

type Actions = {
  overWrite: (data: Data) => void;
  create: (arg0: Programme) => void;
  delete: (arg0: { id: string }) => void;
  reorder: (arg0: { activeId: string; overId: string }) => void;
} & GenerateEntityNonArrActions<MyOmit<Programme, "id" | "index">> &
  ArrActions;

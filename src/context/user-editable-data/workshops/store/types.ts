import type { MyDb } from "~/types/database";
import type { GenerateEntityNonArrActions } from "~/types/helpers";
import type { MyPick } from "~/types/utilities";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = Workshop[];

type Workshop = MyDb["workshop"];

export type WorkshopActionFields = MyPick<
  Workshop,
  "subtitle" | "summary" | "title" | "type"
>;

type Actions = {
  overWrite: (data: Data) => void;
  create: (arg0: Workshop) => void;
  delete: (arg0: { id: string }) => void;
  reorder: (arg0: { activeId: string; overId: string }) => void;
} & GenerateEntityNonArrActions<WorkshopActionFields>;

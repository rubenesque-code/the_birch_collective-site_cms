import type { MyDb } from "~/types/database";
import type { GenerateEntityNonArrActions } from "../../_helpers/types";
import type { MyPick } from "~/types/utilities";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = VolunteerPosition[];

type VolunteerPosition = MyDb["volunteer-positions"];

export type VolunteerPositionActionFields = MyPick<
  VolunteerPosition,
  "name" | "text"
>;

type Actions = {
  overWrite: (data: Data) => void;
  create: (arg0: VolunteerPosition) => void;
  delete: (arg0: { id: string }) => void;
} & GenerateEntityNonArrActions<VolunteerPosition>;

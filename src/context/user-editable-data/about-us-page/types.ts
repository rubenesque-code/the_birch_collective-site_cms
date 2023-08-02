import type { MyDb } from "~/types/database";
import type {
  GenerateActions as GenerateNonArrActions,
  GenerateEntityNonArrActions,
} from "../_helpers/types";
import type { MyOmit } from "~/types/utilities";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = MyDb["pages"]["aboutUs"];

export type TeamMember = Data["theTeam"]["members"][number];

type ArrActions = {
  theTeam: {
    members: GenerateEntityNonArrActions<MyOmit<TeamMember, "id" | "index">> & {
      create: (arg0: TeamMember) => void;
      delete: (arg0: { id: string }) => void;
      reorder: (arg0: { activeId: string; overId: string }) => void;
    };
  };
};

// type A = ArrActions['theTeam']['members']['bio']

type Actions = {
  overWrite: (data: Data) => void;
} & GenerateNonArrActions<Data> &
  ArrActions;

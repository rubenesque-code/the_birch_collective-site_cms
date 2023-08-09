import type { MyDb } from "~/types/database";
import type { GenerateNonArrActions } from "~/types/helpers";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = Page;

type Page = MyDb["pages"]["volunteer-positions"];

export type VolunteerPosition = Page["opportunities"]["entries"][number];

type ArrActions = {
  opportunities: {
    entries: {
      add: (arg0: VolunteerPosition) => void;
      remove: (arg0: { id: string }) => void;
      reorder: (arg0: { activeId: string; overId: string }) => void;
    };
  };
};

type Actions = {
  overWrite: (data: Data) => void;
} & GenerateNonArrActions<Data> &
  ArrActions;

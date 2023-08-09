import type { MyDb } from "~/types/database";
import type { GenerateNonArrActions } from "~/types/helpers";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = Page;

type Page = MyDb["pages"]["careers"];

export type CareerEntry = Page["careers"]["entries"][number];

type ArrActions = {
  careers: {
    entries: {
      add: (arg0: CareerEntry) => void;
      remove: (arg0: { id: string }) => void;
    };
  };
};

type Actions = {
  overWrite: (data: Data) => void;
} & GenerateNonArrActions<Data> &
  ArrActions;

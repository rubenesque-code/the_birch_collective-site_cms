import type { MyDb } from "~/types/database";
import type { GenerateNonArrActions } from "~/types/helpers";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = MyDb["pages"]["workshops"];

type Actions = {
  overWrite: (data: Data) => void;
} & GenerateNonArrActions<Data>;

import type { MyDb } from "~/types/database";
import type { GenerateNonArrActions as GenerateNonArrActions } from "../_helpers/types";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = MyDb["singles"]["footer"];

type Actions = {
  overWrite: (data: Data) => void;
} & GenerateNonArrActions<Data>;

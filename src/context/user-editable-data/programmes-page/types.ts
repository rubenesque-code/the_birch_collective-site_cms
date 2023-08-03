import type { MyDb } from "~/types/database";
import type { GenerateActions as GenerateNonArrActions } from "../_helpers/types";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = MyDb["pages"]["programmes"];

type Actions = {
  overWrite: (data: Data) => void;
} & GenerateNonArrActions<Data>;
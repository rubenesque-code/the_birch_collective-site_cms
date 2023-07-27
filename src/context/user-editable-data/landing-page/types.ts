import type { MyDb } from "~/types/database";
import type { GenerateActions } from "../_helpers/types";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = MyDb["pages"]["landing"];

type Actions = {
  overWrite: (data: Data) => void;
} & GenerateActions<Data>;
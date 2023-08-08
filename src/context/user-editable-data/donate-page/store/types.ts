import type { MyDb } from "~/types/database";
import type { GenerateNonArrActions } from "~/types/helpers";

export type Store = {
  data: Data;
  actions: Actions;
};

type Page = MyDb["pages"]["donate"];

type Data = Page;

type Actions = {
  overWrite: (data: Data) => void;
} & GenerateNonArrActions<Data>;

import type { MyDb } from "~/types/database";
import type { GenerateEntityNonArrActions } from "~/types/helpers";
import type { MyPick } from "~/types/utilities";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = Keyword[];

type Keyword = MyDb["keyword"];

export type KeywordActionFields = MyPick<Keyword, "text">;

type Actions = {
  overWrite: (data: Data) => void;
  create: (arg0: Keyword) => void;
  delete: (arg0: { id: string }) => void;
} & GenerateEntityNonArrActions<KeywordActionFields>;

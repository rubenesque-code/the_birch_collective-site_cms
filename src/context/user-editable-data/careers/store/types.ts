import type { MyDb } from "~/types/database";
import type { GenerateEntityNonArrActions } from "../../_helpers/types";
import type { MyOmit } from "~/types/utilities";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = Career[];

type Career = MyDb["career"];

type DocLinkButton = MyDb["career"]["docLinkButtons"][number];

export type CareerActionFields = MyOmit<Career, "id" | "index">;

type ArrActions = {
  docLinkButtons: {
    create: (arg0: { careerId: string; newEntry: DocLinkButton }) => void;
    delete: (arg0: { careerId: string; docLinkButtonId: string }) => void;
    text: (arg0: {
      careerId: string;
      docLinkButtonId: string;
      updatedValue: string;
    }) => void;
    link: (arg0: {
      careerId: string;
      docLinkButtonId: string;
      updatedValue: string;
    }) => void;
  };
};

type Actions = {
  overWrite: (data: Data) => void;
  create: (arg0: Career) => void;
  delete: (arg0: { id: string }) => void;
} & GenerateEntityNonArrActions<Career> &
  ArrActions;

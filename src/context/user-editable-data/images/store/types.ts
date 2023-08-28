import type { MyDb } from "~/types/database";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = Image[];

export type Image = MyDb["image"];

type ArrActions = {
  keywords: {
    add: (arg0: {
      findBy: { imageId: string };
      data: {
        dbConnections: { keywordId: string };
      };
    }) => void;
    remove: (arg0: { findBy: { imageId: string; keywordId: string } }) => void;
  };
};

type Actions = {
  overWrite: (data: Data) => void;

  delete: (arg0: { id: string }) => void;
} & ArrActions;

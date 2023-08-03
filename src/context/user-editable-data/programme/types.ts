import type { MyDb } from "~/types/database";
import type {
  GenerateEntityNonArrActions,
  GenerateNonArrActions,
} from "../_helpers/types";

export type Store = {
  data: Data;
  actions: Actions;
};

type Data = MyDb["programme"];
export type Section = Data["sections"][number];

type SectionNonArrActions = GenerateEntityNonArrActions<Section>;

type ArrActions = {
  sections: {
    create: (arg0: Section) => void;
    delete: (arg0: { id: string }) => void;
    reorder: (arg0: { activeId: string; overId: string }) => void;
    bullets: {
      entries: {
        create: (arg0: Section) => void;
        delete: (arg0: { sectionId: string; bulletId: string }) => void;
        reorder: (arg0: {
          sectionId: string;
          bullet: { activeId: string; overId: string };
        }) => void;
        text: (arg0: {
          sectionId: string;
          bulletId: string;
          updatedValue: string;
        }) => void;
      };
    };
  } & SectionNonArrActions;
};

type Actions = {
  overWrite: (data: Data) => void;
} & GenerateNonArrActions<Data> &
  ArrActions;

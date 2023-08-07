import type { MyDb } from "~/types/database";
import type {
  GenerateEntityNonArrActions,
  GenerateNonArrActions,
} from "../../_helpers/types";
import type { MyOmit } from "~/types/utilities";

export type Store = {
  data: Programme;
  actions: Actions;
};

export type Programme = MyOmit<MyDb["programme"], "summary">;
export type Info = Programme["info"][number];
export type Poster = Programme["posters"][number];
export type Section = Programme["sections"][number];

type InfoNonArrActions = GenerateEntityNonArrActions<Info>;
type PosterNonArrActions = GenerateEntityNonArrActions<Poster>;
type SectionNonArrActions = GenerateEntityNonArrActions<Section>;

type ArrActions = {
  info: {
    create: (arg0: Info) => void;
    delete: (arg0: { id: string }) => void;
    reorder: (arg0: { activeId: string; overId: string }) => void;
  } & InfoNonArrActions;

  posters: {
    create: (arg0: Poster) => void;
    delete: (arg0: { id: string }) => void;
    reorder: (arg0: { activeId: string; overId: string }) => void;
  } & PosterNonArrActions;

  sections: {
    create: (arg0: Section) => void;
    delete: (arg0: { id: string }) => void;
    reorder: (arg0: { activeId: string; overId: string }) => void;
    bullets: {
      entries: {
        create: (arg0: {
          sectionId: string;
          newEntry: Section["bullets"]["entries"][number];
        }) => void;
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
  overWrite: (data: Programme) => void;
} & GenerateNonArrActions<Programme> &
  ArrActions;

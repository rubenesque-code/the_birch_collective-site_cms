import type { MyDb } from "~/types/database";
import type {
  GenerateNonArrActions,
  GenerateEntityNonArrActions,
} from "../../_helpers/types";
import type { MyOmit } from "~/types/utilities";

export type Store = {
  data: Page;
  actions: Actions;
};

type Page = MyDb["pages"]["theory-of-change"];
type Section = Page["sections"][number];

export type PageActionFields = MyOmit<Page, "id">;
export type SectionActionFields = MyOmit<Section, "id" | "index">;

type SectionNonArrActions = GenerateEntityNonArrActions<SectionActionFields>;

type ArrActions = {
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

        title: (arg0: {
          sectionId: string;
          bulletId: string;
          updatedValue: string;
        }) => void;
      };
    };
  } & SectionNonArrActions;
};

type Actions = {
  overWrite: (data: Page) => void;
} & GenerateNonArrActions<Page> &
  ArrActions;

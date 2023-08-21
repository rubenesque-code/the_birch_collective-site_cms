import type {
  GenerateEntityNonArrActions,
  GenerateNonArrActions,
} from "../../_helpers/types";

import type { MyDb } from "~/types/database";
import type { MyOmit } from "~/types/utilities";

export type Store = {
  data: Workshop;
  actions: Actions;
};

type Workshop = MyDb["workshop"];
type Info = Workshop["info"][number];
type PhotoAlbumEntry = Workshop["photoAlbum"]["entries"][number];
type Section = Workshop["sections"][number];
type SignUp = Workshop["signUp"];

export type WorkshopActionFields = MyOmit<Workshop, "summary" | "id" | "index">;

export type InfoActionFields = MyOmit<Info, "id" | "index">;

export type PhotoAlbumEntryActionFields = MyOmit<
  PhotoAlbumEntry,
  "id" | "index"
>;

export type SectionActionFields = MyOmit<Section, "id" | "index">;

export type SignUpActionFields = MyOmit<SignUp, "notifyEmails">;

type InfoNonArrActions = GenerateEntityNonArrActions<InfoActionFields>;
type PhotoAlbumEntryNonArrActions =
  GenerateEntityNonArrActions<PhotoAlbumEntryActionFields>;
type SectionNonArrActions = GenerateEntityNonArrActions<SectionActionFields>;
type SignUpNonArrActions = GenerateNonArrActions<SignUpActionFields>;

type ArrActions = {
  info: {
    create: (arg0: Info) => void;
    delete: (arg0: { id: string }) => void;
    reorder: (arg0: { activeId: string; overId: string }) => void;
  } & InfoNonArrActions;

  photoAlbum: {
    entries: {
      create: (arg0: PhotoAlbumEntry) => void;
      delete: (arg0: { id: string }) => void;
      reorder: (arg0: { activeId: string; overId: string }) => void;
    } & PhotoAlbumEntryNonArrActions;
  };

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

  signUp: {
    notifyEmails: {
      add: (arg0: string) => void;
      remove: (arg0: string) => void;
    };
  } & SignUpNonArrActions;
};

type Actions = {
  overWrite: (data: Workshop) => void;
} & GenerateNonArrActions<WorkshopActionFields> &
  ArrActions;

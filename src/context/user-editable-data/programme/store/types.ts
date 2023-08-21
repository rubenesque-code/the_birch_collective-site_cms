import type {
  GenerateEntityNonArrActions,
  GenerateNonArrActions,
} from "../../_helpers/types";

import type { MyDb } from "~/types/database";
import type { MyOmit } from "~/types/utilities";

export type Store = {
  data: Programme;
  actions: Actions;
};

export type Programme = MyOmit<MyDb["programme"], "summary">;
export type Info = Programme["info"][number];
export type Poster = Programme["posters"][number];
export type Section = Programme["sections"][number];
type SignUp = Programme["signUp"];
type PhotoAlbumEntry = Programme["photoAlbum"]["entries"][number];

export type PhotoAlbumEntryActionFields = MyOmit<
  PhotoAlbumEntry,
  "id" | "index"
>;

export type SignUpActionFields = MyOmit<SignUp, "notifyEmails">;

type InfoNonArrActions = GenerateEntityNonArrActions<Info>;
type PosterNonArrActions = GenerateEntityNonArrActions<Poster>;
type SectionNonArrActions = GenerateEntityNonArrActions<Section>;
type SignUpNonArrActions = GenerateNonArrActions<SignUpActionFields>;

type PhotoAlbumEntryNonArrActions =
  GenerateEntityNonArrActions<PhotoAlbumEntryActionFields>;

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
  overWrite: (data: Programme) => void;
} & GenerateNonArrActions<Programme> &
  ArrActions;

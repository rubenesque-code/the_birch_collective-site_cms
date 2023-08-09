import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "~/types/helpers";
import type { CareerEntry, Store } from "./types";

export const createStore = (input: { initData: Store["data"] }) =>
  z.createStore<Store>((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<OmitObjArrProps<Store["data"]>>,
    >(keys: TKeyStr) {
      return (newValue: GetObjValue<Store["data"], TKeyStr>) =>
        set(
          produce((store: Store) => {
            lodash.set(store.data, keys, newValue);
          }),
        );
    }

    return {
      data: input.initData,

      actions: {
        overWrite: (updatedData) =>
          set(
            produce((store: Store) => {
              store.data = updatedData;
            }),
          ),

        bannerImage: {
          dbConnections: {
            imageId: nonArrAction("bannerImage.dbConnections.imageId"),
          },

          position: {
            x: nonArrAction("bannerImage.position.x"),
            y: nonArrAction("bannerImage.position.y"),
          },
        },

        followOnSocialMediaText: nonArrAction("followOnSocialMediaText"),

        heading: nonArrAction("heading"),
        mainText: nonArrAction("mainText"),

        careers: {
          heading: nonArrAction("careers.heading"),

          text: nonArrAction("careers.text"),

          entries: {
            add: (newEntry: CareerEntry) =>
              set(
                produce((store: Store) => {
                  store.data.careers.entries.push(newEntry);
                }),
              ),

            remove: (input: { id: string }) =>
              set(
                produce((store: Store) => {
                  const entries = store.data.careers.entries;

                  const entityToDeleteIndex = entries.findIndex(
                    (t) => t.id === input.id,
                  );
                  if (entityToDeleteIndex === -1) return;

                  entries.splice(entityToDeleteIndex, 1);
                }),
              ),
          },
        },
      },
    };
  });

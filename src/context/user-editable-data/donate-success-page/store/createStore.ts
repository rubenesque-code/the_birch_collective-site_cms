import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import type { Store } from "./types";

import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "~/types/helpers";

// TODO: abstraction for delete (entity with index), order

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

        body: {
          heading: nonArrAction("body.heading"),

          image: {
            dbConnections: {
              imageId: nonArrAction("body.image.dbConnections.imageId"),
            },
            position: {
              x: nonArrAction("body.image.position.x"),
              y: nonArrAction("body.image.position.y"),
            },
          },

          text: nonArrAction("body.text"),
        },

        heading: nonArrAction("heading"),

        subheading: nonArrAction("subheading"),
      },
    };
  });

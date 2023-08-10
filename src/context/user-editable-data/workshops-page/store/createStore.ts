import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "../../_helpers/types";
import type { Store } from "./types";

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

        aboutAmy: {
          followOnInstaText: nonArrAction("aboutAmy.followOnInstaText"),

          heading: nonArrAction("aboutAmy.heading"),

          image: {
            dbConnections: {
              imageId: nonArrAction("aboutAmy.image.dbConnections.imageId"),
            },
            position: {
              x: nonArrAction("aboutAmy.image.position.x"),
              y: nonArrAction("aboutAmy.image.position.y"),
            },
          },

          instaLink: nonArrAction("aboutAmy.instaLink"),

          text: nonArrAction("aboutAmy.text"),
        },

        heading: nonArrAction("heading"),

        mainText: nonArrAction("mainText"),
      },
    };
  });

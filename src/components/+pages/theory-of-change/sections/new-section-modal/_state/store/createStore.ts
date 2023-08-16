import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "~/types/helpers";
import type { Section, Store } from "./types";

export const createStore = (input: { initData: Store["data"] }) =>
  z.createStore<Store>((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<OmitObjArrProps<Section>>,
    >(keys: TKeyStr) {
      return (newValue: GetObjValue<Section, TKeyStr>) =>
        set(
          produce((store: Store) => {
            lodash.set(store.data, keys, newValue);
          }),
        );
    }

    return {
      data: input.initData,

      actions: {
        resetData: (data) =>
          set(
            produce((store: Store) => {
              store.data = data;
            }),
          ),

        bullets: {
          entries: {},
          icon: nonArrAction("bullets.icon"),
          type: nonArrAction("bullets.type"),
        },

        colour: nonArrAction("colour"),

        description: nonArrAction("description"),

        title: nonArrAction("title"),
      },
    };
  });

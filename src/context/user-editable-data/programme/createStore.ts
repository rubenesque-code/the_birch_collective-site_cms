import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "../_helpers/types";
import type { Store, Section } from "./types";
import type { MyOmit } from "~/types/utilities";

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

    function sectionNonArrAction<
      TKeyStr extends ObjFieldsToStr<
        OmitObjArrProps<MyOmit<Section, "id" | "index">>
      >,
    >(keys: TKeyStr) {
      return (input: {
        id: string;
        updatedValue: GetObjValue<MyOmit<Section, "id" | "index">, TKeyStr>;
      }) =>
        set(
          produce((store: Store) => {
            const entityIndex = store.data.sections.findIndex(
              (section) => section.id === input.id,
            );

            if (entityIndex < 0) {
              return;
            }

            lodash.set(
              store.data.sections[entityIndex],
              keys,
              input.updatedValue,
            );
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

        sections: {
          bullets: {
            icon: sectionNonArrAction("bullets.icon"),
            entries: {
              create: (newEntry) =>
                set(
                  produce((store: Store) => {
                    store.data.sections.push(newEntry);
                  }),
                ),
            },
          },

          colour: sectionNonArrAction("colour"),
        },

        subtitle: nonArrAction("subtitle"),

        summary: {},
      },
    };
  });

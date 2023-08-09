import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import type { MyDb } from "~/types/database";
import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "../../_helpers/types";
import type { Store, VolunteerPositionActionFields } from "./types";

export const createStore = (input: { initData: Store["data"] }) =>
  z.createStore<Store>((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<
        OmitObjArrProps<VolunteerPositionActionFields>
      >,
    >(keys: TKeyStr) {
      return (input: {
        id: string;
        updatedValue: GetObjValue<VolunteerPositionActionFields, TKeyStr>;
      }) =>
        set(
          produce((store: Store) => {
            const entityIndex = store.data.findIndex(
              (member) => member.id === input.id,
            );

            if (entityIndex < 0) {
              return;
            }

            lodash.set(store.data[entityIndex], keys, input.updatedValue);
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

        create: (newEntry: MyDb["volunteer-position"]) =>
          set(
            produce((store: Store) => {
              store.data.push(newEntry);
            }),
          ),

        delete: (input: { id: string }) =>
          set(
            produce((store: Store) => {
              const entityToDeleteIndex = store.data.findIndex(
                (t) => t.id === input.id,
              );

              if (entityToDeleteIndex === -1) return;

              store.data.splice(entityToDeleteIndex, 1);
            }),
          ),

        name: nonArrAction("name"),

        text: nonArrAction("text"),
      },
    };
  });

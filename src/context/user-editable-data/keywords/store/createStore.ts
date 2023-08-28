import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "../../_helpers/types";
import type { KeywordActionFields, Store } from "./types";

export const createStore = (input: { initData: Store["data"] }) =>
  z.createStore<Store>((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<OmitObjArrProps<KeywordActionFields>>,
    >(keys: TKeyStr) {
      return (input: {
        id: string;
        updatedValue: GetObjValue<KeywordActionFields, TKeyStr>;
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
        overWrite: (input) =>
          set(
            produce((store: Store) => {
              store.data = input;
            }),
          ),

        create: (input) =>
          set(
            produce((store: Store) => {
              store.data.push(input);
            }),
          ),

        delete: (input) =>
          set(
            produce((store: Store) => {
              const entityToDeleteIndex = store.data.findIndex(
                (t) => t.id === input.id,
              );
              if (entityToDeleteIndex === -1) return;

              store.data.splice(entityToDeleteIndex, 1);
            }),
          ),

        text: nonArrAction("text"),
      },
    };
  });

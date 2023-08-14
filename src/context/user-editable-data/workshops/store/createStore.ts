import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import { getReorderedEntities, sortByIndex } from "~/helpers/data/process";
import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "../../_helpers/types";
import type { Store, WorkshopActionFields } from "./types";

export const createStore = (input: { initData: Store["data"] }) =>
  z.createStore<Store>((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<OmitObjArrProps<WorkshopActionFields>>,
    >(keys: TKeyStr) {
      return (input: {
        id: string;
        updatedValue: GetObjValue<WorkshopActionFields, TKeyStr>;
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
              const entriesOrdered = store.data.sort(sortByIndex);

              const entityToDeleteIndex = entriesOrdered.findIndex(
                (t) => t.id === input.id,
              );
              if (entityToDeleteIndex === -1) return;

              entriesOrdered.splice(entityToDeleteIndex, 1);

              for (
                let i = entityToDeleteIndex;
                i < entriesOrdered.length;
                i++
              ) {
                entriesOrdered[i].index = entriesOrdered[i].index - 1;
              }
            }),
          ),

        reorder: (input) =>
          set(
            produce((store: Store) => {
              const entriesOrdered = store.data.sort(sortByIndex);

              const active = entriesOrdered.find(
                (t) => t.id === input.activeId,
              );
              const over = entriesOrdered.find((t) => t.id === input.overId);

              if (!active || !over) {
                return;
              }

              const updatedEntries = getReorderedEntities({
                active,
                over,
                entities: entriesOrdered,
              });

              updatedEntries.forEach((updatedEntry) => {
                const index = store.data.findIndex(
                  (t) => t.id === updatedEntry.id,
                );
                if (index !== -1)
                  store.data[index].index = updatedEntry.newIndex;
              });
            }),
          ),

        subtitle: nonArrAction("subtitle"),

        summary: {
          image: {
            dbConnections: {
              imageId: nonArrAction("summary.image.dbConnections.imageId"),
            },
            position: {
              x: nonArrAction("summary.image.position.x"),
              y: nonArrAction("summary.image.position.y"),
            },
          },

          mainText: nonArrAction("summary.mainText"),
        },

        title: nonArrAction("title"),

        type: nonArrAction("type"),
      },
    };
  });

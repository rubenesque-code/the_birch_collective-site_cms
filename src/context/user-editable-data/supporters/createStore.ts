import { produce } from "immer";
import * as z from "zustand";

import { getReorderedEntities, sortByIndex } from "~/helpers/data/process";
import type { Supporter, Store } from "./types";

export const createStore = (input: { initData: Store["data"] }) =>
  z.createStore<Store>((set) => {
    return {
      data: input.initData,

      actions: {
        overWrite: (updatedData) =>
          set(
            produce((store: Store) => {
              store.data = updatedData;
            }),
          ),

        create: (newEntry: Supporter) =>
          set(
            produce((store: Store) => {
              store.data.push(newEntry);
            }),
          ),

        delete: (input: { id: string }) =>
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

        reorder: (input: { activeId: string; overId: string }) =>
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

        name: (input) =>
          set(
            produce((store: Store) => {
              const index = store.data.findIndex((t) => t.id === input.id);
              if (index !== -1) store.data[index].name = input.newVal;
            }),
          ),

        url: (input) =>
          set(
            produce((store: Store) => {
              const index = store.data.findIndex((t) => t.id === input.id);
              if (index !== -1) store.data[index].url = input.newVal;
            }),
          ),

        image: {
          dbConnections: {
            imageId: (input) =>
              set(
                produce((store: Store) => {
                  const index = store.data.findIndex((t) => t.id === input.id);
                  if (index !== -1)
                    store.data[index].image.dbConnections.imageId =
                      input.newVal;
                }),
              ),
          },
        },
      },
    };
  });

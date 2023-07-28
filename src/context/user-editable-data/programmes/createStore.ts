import { produce } from "immer";
import * as z from "zustand";

import { getReorderedEntities, sortByIndex } from "~/helpers/data/process";
import type { Programme, Store } from "./types";

// TODO: abstraction for delete (entity with index), order

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

        create: (newEntry: Programme) =>
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

        summary: (input) =>
          set(
            produce((store: Store) => {
              const index = store.data.findIndex((t) => t.id === input.id);
              if (index !== -1) store.data[index].summary = input.newVal;
            }),
          ),
        title: (input) =>
          set(
            produce((store: Store) => {
              const index = store.data.findIndex((t) => t.id === input.id);
              if (index !== -1) store.data[index].title = input.newVal;
            }),
          ),

        subtitle: (input) =>
          set(
            produce((store: Store) => {
              const index = store.data.findIndex((t) => t.id === input.id);
              if (index !== -1) store.data[index].subtitle = input.newVal;
            }),
          ),
      },
    };
  });

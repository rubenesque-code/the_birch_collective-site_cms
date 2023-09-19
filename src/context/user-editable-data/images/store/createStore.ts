import { produce } from "immer";
import * as z from "zustand";

import type { Store } from "./types";

import { generateUid } from "~/lib/external-packages-rename";

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

        add: (input) =>
          set(
            produce((store: Store) => {
              store.data.push(input);
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

        keywords: {
          add: (input) =>
            set(
              produce((store: Store) => {
                const imageIndex = store.data.findIndex(
                  (image) => image.id === input.findBy.imageId,
                );

                if (imageIndex === -1) {
                  return;
                }

                store.data[imageIndex].keywords.push({
                  id: generateUid(),
                  dbConnections: {
                    keywordId: input.data.dbConnections.keywordId,
                  },
                });
              }),
            ),

          remove: (input) =>
            set(
              produce((store: Store) => {
                const imageIndex = store.data.findIndex(
                  (image) => image.id === input.findBy.imageId,
                );

                if (imageIndex === -1) {
                  return;
                }

                const image = store.data[imageIndex];

                const keywordIndex = image.keywords.findIndex(
                  (keyword) => keyword.id === input.findBy.keywordId,
                );

                if (keywordIndex === -1) {
                  return;
                }

                image.keywords.splice(keywordIndex, 1);
              }),
            ),
        },
      },
    };
  });

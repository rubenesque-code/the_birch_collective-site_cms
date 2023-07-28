import { produce } from "immer";
import { createStore } from "zustand";
import lodash from "lodash";

import { getReorderedEntities, sortByIndex } from "~/helpers/data/process";

import type { Store } from "./types";
import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "../_helpers/types";

// TODO: abstraction for delete (entity with index), order

export const createLandingPageStore = (input: { initData: Store["data"] }) =>
  createStore<Store>((set) => {
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
        aboutUs: {
          buttonText: nonArrAction("aboutUs.buttonText"),
          entries: {
            create: (newEntry: Store["data"]["aboutUs"]["entries"][number]) =>
              set(
                produce((store: Store) => {
                  store.data.aboutUs.entries.push(newEntry);
                }),
              ),
            delete: (input: { id: string }) =>
              set(
                produce((store: Store) => {
                  const entriesOrdered =
                    store.data.aboutUs.entries.sort(sortByIndex);

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
            updateText: (input: { id: string; newVal: string }) =>
              set(
                produce((store: Store) => {
                  const index = store.data.aboutUs.entries.findIndex(
                    (t) => t.id === input.id,
                  );
                  if (index !== -1)
                    store.data.aboutUs.entries[index].text = input.newVal;
                }),
              ),
            reorder: (input: { activeId: string; overId: string }) =>
              set(
                produce((store: Store) => {
                  const entriesOrdered =
                    store.data.aboutUs.entries.sort(sortByIndex);

                  const active = entriesOrdered.find(
                    (t) => t.id === input.activeId,
                  );
                  const over = entriesOrdered.find(
                    (t) => t.id === input.overId,
                  );

                  if (!active || !over) {
                    return;
                  }

                  const updatedEntries = getReorderedEntities({
                    active,
                    over,
                    entities: entriesOrdered,
                  });

                  updatedEntries.forEach((updatedEntry) => {
                    const index = store.data.aboutUs.entries.findIndex(
                      (t) => t.id === updatedEntry.id,
                    );
                    if (index !== -1)
                      store.data.aboutUs.entries[index].index =
                        updatedEntry.newIndex;
                  });
                }),
              ),
          },
          heading: nonArrAction("aboutUs.heading"),
        },

        bannerImage: {
          dbConnections: {
            imageId: nonArrAction("bannerImage.dbConnections.imageId"),
          },
          position: {
            x: nonArrAction("bannerImage.position.x"),
            y: nonArrAction("bannerImage.position.y"),
          },
          infoPopover: {
            text: nonArrAction("bannerImage.infoPopover.text"),
          },
        },

        orgHeadings: {
          byline: nonArrAction("orgHeadings.byline"),
          name: nonArrAction("orgHeadings.name"),
        },

        photoAlbum: {
          entries: {
            create: (input: Store["data"]["photoAlbum"]["entries"][number]) =>
              set(
                produce((store: Store) => {
                  store.data.photoAlbum.entries.push(input);
                }),
              ),
            delete: (input: { id: string }) =>
              set(
                produce((store: Store) => {
                  const entityToRemoveIndex =
                    store.data.photoAlbum.entries.findIndex(
                      (p) => p.id === input.id,
                    );
                  if (entityToRemoveIndex !== -1)
                    store.data.photoAlbum.entries.splice(
                      entityToRemoveIndex,
                      1,
                    );
                }),
              ),
          },
          heading: nonArrAction("photoAlbum.heading"),
        },
      },
    };
  });

import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "~/types/helpers";
import type { Store, VolunteerPosition } from "./types";
import { getReorderedEntities, sortByIndex } from "~/helpers/data/process";

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

        heading: nonArrAction("heading"),

        mainText: nonArrAction("mainText"),

        opportunities: {
          heading: nonArrAction("opportunities.heading"),

          entries: {
            add: (newEntry: VolunteerPosition) =>
              set(
                produce((store: Store) => {
                  store.data.opportunities.entries.push(newEntry);
                }),
              ),
            remove: (input: { id: string }) =>
              set(
                produce((store: Store) => {
                  const entriesOrdered =
                    store.data.opportunities.entries.sort(sortByIndex);

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
                  const entriesOrdered =
                    store.data.opportunities.entries.sort(sortByIndex);

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
                    const index = store.data.opportunities.entries.findIndex(
                      (t) => t.id === updatedEntry.id,
                    );
                    if (index !== -1)
                      store.data.opportunities.entries[index].index =
                        updatedEntry.newIndex;
                  });
                }),
              ),
          },
        },
      },
    };
  });

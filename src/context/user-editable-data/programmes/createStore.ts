import { produce } from "immer";
import * as z from "zustand";
import lodash from "lodash";

import { getReorderedEntities, sortByIndex } from "~/helpers/data/process";
import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "../_helpers/types";
import type { Store, ProgrammeActionFields } from "./types";
import type { MyDb } from "~/types/database";

export const createStore = (input: { initData: Store["data"] }) =>
  z.createStore<Store>((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<OmitObjArrProps<ProgrammeActionFields>>,
    >(keys: TKeyStr) {
      return (input: {
        id: string;
        updatedValue: GetObjValue<ProgrammeActionFields, TKeyStr>;
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

        create: (newEntry: MyDb["programme"]) =>
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

        subtitle: nonArrAction("subtitle"),

        summary: {
          bullets: {
            create: (input) =>
              set(
                produce((store: Store) => {
                  const programmeIndex = store.data.findIndex(
                    (member) => member.id === input.programmeId,
                  );
                  if (programmeIndex < 0) {
                    return;
                  }

                  const programme = store.data[programmeIndex];

                  programme.summary.bullets.push(input.newEntry);
                }),
              ),

            delete: (input) =>
              set(
                produce((store: Store) => {
                  const programmeIndex = store.data.findIndex(
                    (member) => member.id === input.programmeId,
                  );
                  if (programmeIndex < 0) {
                    return;
                  }

                  const programme = store.data[programmeIndex];

                  const bulletsOrdered =
                    programme.summary.bullets.sort(sortByIndex);

                  const bulletIndex = bulletsOrdered.findIndex(
                    (bullet) => bullet.id === input.bulletId,
                  );

                  if (bulletIndex < 0) {
                    return;
                  }

                  programme.summary.bullets.splice(bulletIndex, 1);

                  for (let i = bulletIndex; i < bulletsOrdered.length; i++) {
                    bulletsOrdered[i].index = bulletsOrdered[i].index - 1;
                  }
                }),
              ),

            reorder: (input) =>
              set(
                produce((store: Store) => {
                  const programmeIndex = store.data.findIndex(
                    (member) => member.id === input.programmeId,
                  );
                  if (programmeIndex < 0) {
                    return;
                  }

                  const programme = store.data[programmeIndex];

                  const bulletsOrdered =
                    programme.summary.bullets.sort(sortByIndex);

                  const active = bulletsOrdered.find(
                    (t) => t.id === input.bullets.activeId,
                  );
                  const over = bulletsOrdered.find(
                    (t) => t.id === input.bullets.overId,
                  );

                  if (!active || !over) {
                    return;
                  }

                  const updatedEntries = getReorderedEntities({
                    active,
                    over,
                    entities: bulletsOrdered,
                  });

                  updatedEntries.forEach((updatedEntry) => {
                    const index = programme.summary.bullets.findIndex(
                      (t) => t.id === updatedEntry.id,
                    );
                    if (index !== -1)
                      programme.summary.bullets[index].index =
                        updatedEntry.newIndex;
                  });
                }),
              ),

            text: (input) =>
              set(
                produce((store: Store) => {
                  const programmeIndex = store.data.findIndex(
                    (member) => member.id === input.programmeId,
                  );
                  if (programmeIndex < 0) {
                    return;
                  }

                  const programme = store.data[programmeIndex];

                  const bulletIndex = programme.summary.bullets.findIndex(
                    (bullet) => bullet.id === input.bulletId,
                  );

                  if (bulletIndex < 0) {
                    return;
                  }

                  programme.summary.bullets[bulletIndex].text =
                    input.updatedValue;
                }),
              ),
          },

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
      },
    };
  });

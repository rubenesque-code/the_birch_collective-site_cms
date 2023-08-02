import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import { getReorderedEntities, sortByIndex } from "~/helpers/data/process";

import type { MyOmit } from "~/types/utilities";
import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "../_helpers/types";
import type { Store, TeamMember } from "./types";

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

    function teamMemberNonArrAction<
      TKeyStr extends ObjFieldsToStr<
        OmitObjArrProps<MyOmit<TeamMember, "id" | "index">>
      >,
    >(keys: TKeyStr) {
      return (input: {
        id: string;
        updatedValue: GetObjValue<MyOmit<TeamMember, "id" | "index">, TKeyStr>;
      }) =>
        set(
          produce((store: Store) => {
            const entityIndex = store.data.theTeam.members.findIndex(
              (member) => member.id === input.id,
            );

            if (entityIndex < 0) {
              return;
            }

            lodash.set(
              store.data.theTeam.members[entityIndex],
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
        subheading: nonArrAction("subheading"),
        theTeam: {
          heading: nonArrAction("theTeam.heading"),
          text: nonArrAction("theTeam.text"),
          members: {
            bio: teamMemberNonArrAction("bio"),
            image: {
              dbConnections: {
                imageId: teamMemberNonArrAction("image.dbConnections.imageId"),
              },
              position: {
                x: teamMemberNonArrAction("image.position.x"),
                y: teamMemberNonArrAction("image.position.y"),
              },
            },
            name: teamMemberNonArrAction("name"),
            role: teamMemberNonArrAction("role"),
            create: (newEntry: TeamMember) =>
              set(
                produce((store: Store) => {
                  store.data.theTeam.members.push(newEntry);
                }),
              ),
            delete: (input: { id: string }) =>
              set(
                produce((store: Store) => {
                  const entriesOrdered =
                    store.data.theTeam.members.sort(sortByIndex);

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
                    store.data.theTeam.members.sort(sortByIndex);

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
                    const index = store.data.theTeam.members.findIndex(
                      (t) => t.id === updatedEntry.id,
                    );
                    if (index !== -1)
                      store.data.theTeam.members[index].index =
                        updatedEntry.newIndex;
                  });
                }),
              ),
          },
        },
      },
    };
  });

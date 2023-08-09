import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import { sortByIndex } from "~/helpers/data/process";
import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "../../_helpers/types";
import type { CareerActionFields, Store } from "./types";

export const createStore = (input: { initData: Store["data"] }) =>
  z.createStore<Store>((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<OmitObjArrProps<CareerActionFields>>,
    >(keys: TKeyStr) {
      return (input: {
        id: string;
        updatedValue: GetObjValue<CareerActionFields, TKeyStr>;
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

        create: (newEntry) =>
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

        closingDate: nonArrAction("closingDate"),

        description: nonArrAction("description"),

        docLinkButtons: {
          create: (input) =>
            set(
              produce((store: Store) => {
                const careerIndex = store.data.findIndex(
                  (member) => member.id === input.careerId,
                );

                if (careerIndex < 0) {
                  return;
                }

                const career = store.data[careerIndex];

                career.docLinkButtons.push(input.newEntry);
              }),
            ),

          delete: (input) =>
            set(
              produce((store: Store) => {
                const careerIndex = store.data.findIndex(
                  (member) => member.id === input.careerId,
                );

                if (careerIndex < 0) {
                  return;
                }

                const career = store.data[careerIndex];

                const buttonsOrdered = career.docLinkButtons.sort(sortByIndex);

                const buttonIndex = buttonsOrdered.findIndex(
                  (bullet) => bullet.id === input.docLinkButtonId,
                );

                if (buttonIndex < 0) {
                  return;
                }

                buttonsOrdered.splice(buttonIndex, 1);

                for (let i = buttonIndex; i < buttonsOrdered.length; i++) {
                  buttonsOrdered[i].index = buttonsOrdered[i].index - 1;
                }
              }),
            ),

          link: (input) =>
            set(
              produce((store: Store) => {
                const careerIndex = store.data.findIndex(
                  (member) => member.id === input.careerId,
                );

                if (careerIndex < 0) {
                  return;
                }

                const career = store.data[careerIndex];

                const buttonsOrdered = career.docLinkButtons.sort(sortByIndex);

                const buttonIndex = buttonsOrdered.findIndex(
                  (bullet) => bullet.id === input.docLinkButtonId,
                );

                if (buttonIndex < 0) {
                  return;
                }

                buttonsOrdered[buttonIndex].link = input.updatedValue;
              }),
            ),

          text: (input) =>
            set(
              produce((store: Store) => {
                const careerIndex = store.data.findIndex(
                  (member) => member.id === input.careerId,
                );

                if (careerIndex < 0) {
                  return;
                }

                const career = store.data[careerIndex];

                const buttonsOrdered = career.docLinkButtons.sort(sortByIndex);

                const buttonIndex = buttonsOrdered.findIndex(
                  (bullet) => bullet.id === input.docLinkButtonId,
                );

                if (buttonIndex < 0) {
                  return;
                }

                buttonsOrdered[buttonIndex].text = input.updatedValue;
              }),
            ),
        },

        docLinksText: nonArrAction("docLinksText"),

        title: nonArrAction("title"),
      },
    };
  });

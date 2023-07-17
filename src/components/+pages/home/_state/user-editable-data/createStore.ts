import { produce } from "immer";
import { createStore } from "zustand";

import type { UserEditableDataStore, UserEditableDbData } from "./store-types";
import { getReorderedEntities, sortByIndex } from "~/helpers/data/process";

export const createUserEditableDataStore = (input: {
  dbData: UserEditableDbData;
}) => {
  return createStore<UserEditableDataStore>()((set) => ({
    data: input.dbData,
    actions: {
      undo: (updatedData) =>
        set(
          produce((state: UserEditableDataStore) => {
            state.data = updatedData;
          }),
        ),
      page: {
        bannerImage: {
          dbConnections: {
            imageId: {
              update: (newValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.bannerImage.dbConnections.imageId =
                      newValue;
                  }),
                ),
            },
          },
          position: {
            x: {
              update: (newValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.bannerImage.position.x = newValue;
                  }),
                ),
            },
            y: {
              update: (newValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.bannerImage.position.y = newValue;
                  }),
                ),
            },
          },
        },
        orgHeadings: {
          name: {
            update: (updatedValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.orgHeadings.name = updatedValue;
                }),
              ),
          },
          byline: {
            update: (updatedValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.orgHeadings.byline = updatedValue;
                }),
              ),
          },
        },
      },
      testimonial: {
        create: (newTestimonial) =>
          set(
            produce((state: UserEditableDataStore) => {
              state.data.testimonials.push(newTestimonial);
            }),
          ),
        delete: (input) =>
          set(
            produce((state: UserEditableDataStore) => {
              const entityToDeleteIndex = state.data.testimonials.findIndex(
                (t) => t.id === input.id,
              );
              if (entityToDeleteIndex === -1) return;

              const testimonialsSorted =
                state.data.testimonials.sort(sortByIndex);

              for (
                let i = entityToDeleteIndex + 1;
                i < testimonialsSorted.length;
                i++
              ) {
                testimonialsSorted[i].index = testimonialsSorted[i].index - 1;
              }

              state.data.testimonials.splice(entityToDeleteIndex, 1);
            }),
          ),
        endorserName: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                const index = state.data.testimonials.findIndex(
                  (t) => t.id === input.id,
                );
                if (index !== -1)
                  state.data.testimonials[index].endorserName = input.newVal;
              }),
            ),
        },
        order: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                const active = state.data.testimonials.find(
                  (t) => t.id === input.activeId,
                );
                const over = state.data.testimonials.find(
                  (t) => t.id === input.overId,
                );

                if (!active || !over) {
                  return;
                }

                const updatedTestimonials = getReorderedEntities({
                  active,
                  over,
                  entities: state.data.testimonials,
                });

                updatedTestimonials.forEach((updatedTestimonial) => {
                  const index = state.data.testimonials.findIndex(
                    (t) => t.id === updatedTestimonial.id,
                  );
                  if (index !== -1)
                    state.data.testimonials[index].index =
                      updatedTestimonial.newIndex;
                });
              }),
            ),
        },
        text: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                const index = state.data.testimonials.findIndex(
                  (t) => t.id === input.id,
                );
                if (index !== -1)
                  state.data.testimonials[index].text = input.newVal;
              }),
            ),
        },
        image: {
          dbConnect: {
            imageId: {
              update: (input) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    const index = state.data.testimonials.findIndex(
                      (t) => t.id === input.id,
                    );
                    if (index !== -1)
                      state.data.testimonials[index].image.dbConnect.imageId =
                        input.newVal;
                  }),
                ),
            },
          },
          position: {
            x: {
              update: (input) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    console.log("updating...");

                    const index = state.data.testimonials.findIndex(
                      (t) => t.id === input.id,
                    );
                    if (index !== -1) {
                      console.log("found testimonial", input);

                      state.data.testimonials[index].image.position.x =
                        input.newVal;
                    }
                  }),
                ),
            },
            y: {
              update: (input) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    const index = state.data.testimonials.findIndex(
                      (t) => t.id === input.id,
                    );
                    if (index !== -1)
                      state.data.testimonials[index].image.position.x =
                        input.newVal;
                  }),
                ),
            },
          },
        },
      },
    },
  }));
};

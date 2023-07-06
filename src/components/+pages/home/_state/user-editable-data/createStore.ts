import { produce } from "immer";
import { createStore } from "zustand";

import type { UserEditableDataStore, UserEditableDbData } from "./store-types";

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
                const index = state.data.testimonials.findIndex(
                  (t) => t.id === input.id,
                );
                if (index !== -1)
                  state.data.testimonials[index].index = input.newVal;
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
                    const index = state.data.testimonials.findIndex(
                      (t) => t.id === input.id,
                    );
                    if (index !== -1)
                      state.data.testimonials[index].image.position.x =
                        input.newVal;
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

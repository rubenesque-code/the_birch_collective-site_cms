import { produce } from "immer";
import { createStore } from "zustand";

import { getReorderedEntities, sortByIndex } from "~/helpers/data/process";
import type { UserEditableDataStore, UserEditableDbData } from "./store-types";
import { generateUid } from "~/lib/external-packages-rename";

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
          infoPopover: {
            text: {
              update: (newValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.bannerImage.infoPopover.text = newValue;
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

        aboutUs: {
          heading: {
            update: (updatedValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.aboutUs.heading = updatedValue;
                }),
              ),
          },
          buttonText: {
            update: (updatedValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.aboutUs.buttonText = updatedValue;
                }),
              ),
          },
          entry: {
            create: (newEntry) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.aboutUs.entries.push(newEntry);
                }),
              ),
            delete: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  const entriesOrdered =
                    state.data.page.aboutUs.entries.sort(sortByIndex);

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
            updateText: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  const index = state.data.page.aboutUs.entries.findIndex(
                    (t) => t.id === input.id,
                  );
                  if (index !== -1)
                    state.data.page.aboutUs.entries[index].text = input.newVal;
                }),
              ),
            order: {
              update: (input) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    const entriesOrdered =
                      state.data.page.aboutUs.entries.sort(sortByIndex);

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
                      const index = state.data.page.aboutUs.entries.findIndex(
                        (t) => t.id === updatedEntry.id,
                      );
                      if (index !== -1)
                        state.data.page.aboutUs.entries[index].index =
                          updatedEntry.newIndex;
                    });
                  }),
                ),
            },
          },
        },

        workshops: {
          image: {
            dbConnections: {
              imageId: {
                update: (newValue) =>
                  set(
                    produce((state: UserEditableDataStore) => {
                      state.data.page.workshops.image.dbConnections.imageId =
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
                      state.data.page.workshops.image.position.x = newValue;
                    }),
                  ),
              },
              y: {
                update: (newValue) =>
                  set(
                    produce((state: UserEditableDataStore) => {
                      state.data.page.workshops.image.position.y = newValue;
                    }),
                  ),
              },
            },
          },
          textOverlay: {
            heading: {
              update: (newValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.workshops.textOverlay.heading = newValue;
                  }),
                ),
            },
            body: {
              update: (newValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.workshops.textOverlay.body = newValue;
                  }),
                ),
            },
          },
        },

        programmes: {
          heading: {
            update: (newValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.programmes.heading = newValue;
                }),
              ),
          },
          subheading: {
            update: (newValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.programmes.subheading = newValue;
                }),
              ),
          },
          entry: {
            add: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.programmes.entries.push({
                    dbConnections: { programmeId: input.dbConnect.programmeId },
                    id: input.id || generateUid(),
                  });
                }),
              ),
            remove: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  const entityToRemoveIndex =
                    state.data.page.programmes.entries.findIndex(
                      (p) => p.id === input.id,
                    );
                  if (entityToRemoveIndex !== -1)
                    state.data.page.programmes.entries.splice(
                      entityToRemoveIndex,
                      1,
                    );
                }),
              ),
          },
          buttonText: {
            update: (newValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.programmes.buttonText = newValue;
                }),
              ),
          },
        },

        photoAlbum: {
          heading: {
            update: (updatedValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.photoAlbum.heading = updatedValue;
                }),
              ),
          },
          entry: {
            create: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.photoAlbum.entries.push(input);
                }),
              ),
            delete: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  const entityToRemoveIndex =
                    state.data.page.photoAlbum.entries.findIndex(
                      (p) => p.id === input.id,
                    );
                  if (entityToRemoveIndex !== -1)
                    state.data.page.photoAlbum.entries.splice(
                      entityToRemoveIndex,
                      1,
                    );
                }),
              ),

            image: {
              dbConnections: {
                imageId: {
                  update: (input) =>
                    set(
                      produce((state: UserEditableDataStore) => {
                        const index =
                          state.data.page.photoAlbum.entries.findIndex(
                            (t) => t.id === input.id,
                          );
                        if (index !== -1)
                          state.data.page.photoAlbum.entries[
                            index
                          ].image.dbConnections.imageId = input.newVal;
                      }),
                    ),
                },
              },
              position: {
                x: {
                  update: (input) =>
                    set(
                      produce((state: UserEditableDataStore) => {
                        const index =
                          state.data.page.photoAlbum.entries.findIndex(
                            (t) => t.id === input.id,
                          );
                        if (index !== -1) {
                          state.data.page.photoAlbum.entries[
                            index
                          ].image.position.x = input.newVal;
                        }
                      }),
                    ),
                },
                y: {
                  update: (input) =>
                    set(
                      produce((state: UserEditableDataStore) => {
                        const index =
                          state.data.page.photoAlbum.entries.findIndex(
                            (t) => t.id === input.id,
                          );
                        if (index !== -1)
                          state.data.page.photoAlbum.entries[
                            index
                          ].image.position.y = input.newVal;
                      }),
                    ),
                },
              },
            },

            order: {
              update: (input) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    const entriesOrdered =
                      state.data.page.photoAlbum.entries.sort(sortByIndex);

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
                      const index =
                        state.data.page.photoAlbum.entries.findIndex(
                          (t) => t.id === updatedEntry.id,
                        );
                      if (index !== -1)
                        state.data.page.photoAlbum.entries[index].index =
                          updatedEntry.newIndex;
                    });
                  }),
                ),
            },
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
              const testimonialsOrdered =
                state.data.testimonials.sort(sortByIndex);

              const entityToDeleteIndex = testimonialsOrdered.findIndex(
                (t) => t.id === input.id,
              );
              if (entityToDeleteIndex === -1) return;

              testimonialsOrdered.splice(entityToDeleteIndex, 1);

              for (
                let i = entityToDeleteIndex;
                i < testimonialsOrdered.length;
                i++
              ) {
                testimonialsOrdered[i].index = testimonialsOrdered[i].index - 1;
              }
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
                const testimonialsOrdered =
                  state.data.testimonials.sort(sortByIndex);

                const active = testimonialsOrdered.find(
                  (t) => t.id === input.activeId,
                );
                const over = testimonialsOrdered.find(
                  (t) => t.id === input.overId,
                );

                if (!active || !over) {
                  return;
                }

                const updatedTestimonials = getReorderedEntities({
                  active,
                  over,
                  entities: testimonialsOrdered,
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
          dbConnections: {
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
                    if (index !== -1) {
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

      programme: {
        create: (input) =>
          set(
            produce((state: UserEditableDataStore) => {
              state.data.programmes.push(input);
            }),
          ),
        delete: (input) =>
          set(
            produce((state: UserEditableDataStore) => {
              const programmesOrdered = state.data.programmes.sort(sortByIndex);

              const entityToDeleteIndex = programmesOrdered.findIndex(
                (t) => t.id === input.id,
              );
              if (entityToDeleteIndex === -1) return;

              programmesOrdered.splice(entityToDeleteIndex, 1);

              for (
                let i = entityToDeleteIndex;
                i < programmesOrdered.length;
                i++
              ) {
                programmesOrdered[i].index = programmesOrdered[i].index - 1;
              }
            }),
          ),
        order: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                const programmesOrdered =
                  state.data.programmes.sort(sortByIndex);

                const active = programmesOrdered.find(
                  (t) => t.id === input.activeId,
                );
                const over = programmesOrdered.find(
                  (t) => t.id === input.overId,
                );

                if (!active || !over) {
                  return;
                }

                const updatedProgrammes = getReorderedEntities({
                  active,
                  over,
                  entities: programmesOrdered,
                });

                updatedProgrammes.forEach((updatedProgramme) => {
                  const index = state.data.programmes.findIndex(
                    (t) => t.id === updatedProgramme.id,
                  );
                  if (index !== -1)
                    state.data.programmes[index].index =
                      updatedProgramme.newIndex;
                });
              }),
            ),
        },
        summary: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                const index = state.data.programmes.findIndex(
                  (t) => t.id === input.id,
                );
                if (index !== -1)
                  state.data.programmes[index].summary = input.newVal;
              }),
            ),
        },
        title: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                const index = state.data.programmes.findIndex(
                  (t) => t.id === input.id,
                );
                if (index !== -1)
                  state.data.programmes[index].title = input.newVal;
              }),
            ),
        },
        subtitle: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                const index = state.data.programmes.findIndex(
                  (t) => t.id === input.id,
                );
                if (index !== -1)
                  state.data.programmes[index].subtitle = input.newVal;
              }),
            ),
        },
      },
    },
  }));
};

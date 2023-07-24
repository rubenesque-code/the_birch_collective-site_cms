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

        supportUs: {
          heading: {
            update: (updatedValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.supportUs.heading = updatedValue;
                }),
              ),
          },
          donate: {
            buttonText: {
              update: (updatedValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.supportUs.donate.buttonText = updatedValue;
                  }),
                ),
            },
            description: {
              update: (updatedValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.supportUs.donate.description = updatedValue;
                  }),
                ),
            },
            image: {
              dbConnections: {
                imageId: {
                  update: (newVal) =>
                    set(
                      produce((state: UserEditableDataStore) => {
                        state.data.page.supportUs.donate.image.dbConnections.imageId =
                          newVal;
                      }),
                    ),
                },
              },
              position: {
                x: {
                  update: (newVal) =>
                    set(
                      produce((state: UserEditableDataStore) => {
                        state.data.page.supportUs.donate.image.position.x =
                          newVal;
                      }),
                    ),
                },
                y: {
                  update: (newVal) =>
                    set(
                      produce((state: UserEditableDataStore) => {
                        state.data.page.supportUs.donate.image.position.y =
                          newVal;
                      }),
                    ),
                },
              },
            },
          },
          volunteer: {
            buttonText: {
              update: (updatedValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.supportUs.volunteer.buttonText =
                      updatedValue;
                  }),
                ),
            },
            description: {
              update: (updatedValue) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.page.supportUs.volunteer.description =
                      updatedValue;
                  }),
                ),
            },
            image: {
              dbConnections: {
                imageId: {
                  update: (newVal) =>
                    set(
                      produce((state: UserEditableDataStore) => {
                        state.data.page.supportUs.volunteer.image.dbConnections.imageId =
                          newVal;
                      }),
                    ),
                },
              },
              position: {
                x: {
                  update: (newVal) =>
                    set(
                      produce((state: UserEditableDataStore) => {
                        state.data.page.supportUs.volunteer.image.position.x =
                          newVal;
                      }),
                    ),
                },
                y: {
                  update: (newVal) =>
                    set(
                      produce((state: UserEditableDataStore) => {
                        state.data.page.supportUs.volunteer.image.position.y =
                          newVal;
                      }),
                    ),
                },
              },
            },
          },
        },

        supporters: {
          heading: {
            update: (updatedValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.supporters.heading = updatedValue;
                }),
              ),
          },
          subheading: {
            update: (updatedValue) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.supporters.subheading = updatedValue;
                }),
              ),
          },
          entry: {
            add: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.page.supporters.entries.push({
                    dbConnections: {
                      supporterId: input.dbConnections.supporterId,
                    },
                    id: generateUid(),
                  });
                }),
              ),
            remove: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  const entityToRemoveIndex =
                    state.data.page.supporters.entries.findIndex(
                      (p) => p.id === input.id,
                    );
                  if (entityToRemoveIndex !== -1)
                    state.data.page.supporters.entries.splice(
                      entityToRemoveIndex,
                      1,
                    );
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

      supporter: {
        create: (newSupporter) =>
          set(
            produce((state: UserEditableDataStore) => {
              state.data.supporters.push(newSupporter);
            }),
          ),
        delete: (input) =>
          set(
            produce((state: UserEditableDataStore) => {
              const supportersOrdered = state.data.supporters.sort(sortByIndex);

              const entityToDeleteIndex = supportersOrdered.findIndex(
                (t) => t.id === input.id,
              );
              if (entityToDeleteIndex === -1) return;

              supportersOrdered.splice(entityToDeleteIndex, 1);

              for (
                let i = entityToDeleteIndex;
                i < supportersOrdered.length;
                i++
              ) {
                supportersOrdered[i].index = supportersOrdered[i].index - 1;
              }
            }),
          ),
        order: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                const ordered = state.data.supporters.sort(sortByIndex);

                const active = ordered.find((t) => t.id === input.activeId);
                const over = ordered.find((t) => t.id === input.overId);

                if (!active || !over) {
                  return;
                }

                const updated = getReorderedEntities({
                  active,
                  over,
                  entities: ordered,
                });

                updated.forEach((updatedSupporter) => {
                  const index = state.data.supporters.findIndex(
                    (t) => t.id === updatedSupporter.id,
                  );
                  if (index !== -1)
                    state.data.supporters[index].index =
                      updatedSupporter.newIndex;
                });
              }),
            ),
        },
        name: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                const index = state.data.supporters.findIndex(
                  (t) => t.id === input.id,
                );
                if (index !== -1)
                  state.data.supporters[index].name = input.newVal;
              }),
            ),
        },
        url: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                const index = state.data.supporters.findIndex(
                  (t) => t.id === input.id,
                );
                if (index !== -1)
                  state.data.supporters[index].name = input.newVal;
              }),
            ),
        },
        image: {
          dbConnections: {
            imageId: {
              update: (input) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    const index = state.data.supporters.findIndex(
                      (t) => t.id === input.id,
                    );
                    if (index !== -1)
                      state.data.supporters[index].image.dbConnections.imageId =
                        input.newVal;
                  }),
                ),
            },
          },
        },
      },

      orgDetails: {
        name: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                state.data.orgDetails.name = input;
              }),
            ),
        },
        logoImage: {
          dbConnections: {
            imageId: {
              update: (input) =>
                set(
                  produce((state: UserEditableDataStore) => {
                    state.data.orgDetails.logoImage.dbConnections.imageId =
                      input;
                  }),
                ),
            },
          },
        },
        contact: {
          address: {
            update: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.orgDetails.contact.address = input;
                }),
              ),
          },
          email: {
            update: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.orgDetails.contact.email = input;
                }),
              ),
          },
          phoneNumber: {
            update: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.orgDetails.contact.phoneNumber = input;
                }),
              ),
          },
        },
        socialMediaLinks: {
          facebook: {
            update: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.orgDetails.socialMediaLinks.facebook = input;
                }),
              ),
          },
          instagram: {
            update: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.orgDetails.socialMediaLinks.instagram = input;
                }),
              ),
          },
          linkedIn: {
            update: (input) =>
              set(
                produce((state: UserEditableDataStore) => {
                  state.data.orgDetails.socialMediaLinks.linkedIn = input;
                }),
              ),
          },
        },
      },

      linkLabels: {
        aboutUs: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                state.data.linkLabels.aboutUs = input;
              }),
            ),
        },
        careers: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                state.data.linkLabels.careers = input;
              }),
            ),
        },
        donate: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                state.data.linkLabels.donate = input;
              }),
            ),
        },
        getInTouch: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                state.data.linkLabels.getInTouch = input;
              }),
            ),
        },
        getInvolved: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                state.data.linkLabels.getInvolved = input;
              }),
            ),
        },
        meetTheTeam: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                state.data.linkLabels.meetTheTeam = input;
              }),
            ),
        },
        programmes: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                state.data.linkLabels.programmes = input;
              }),
            ),
        },
        volunteer: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                state.data.linkLabels.volunteer = input;
              }),
            ),
        },
        workshops: {
          update: (input) =>
            set(
              produce((state: UserEditableDataStore) => {
                state.data.linkLabels.workshops = input;
              }),
            ),
        },
      },
    },
  }));
};

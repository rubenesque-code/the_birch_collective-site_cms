import { useState, type ReactElement } from "react";

import { TextAreaForm, TextInputForm } from "~/components/forms";
import { IconSwith } from "~/components/IconSwitch";
import ModalLayout from "~/components/layouts/Modal";
import { Modal } from "~/components/styled-bases";
import { WarningPanel } from "~/components/WarningPanel";
import { WithTooltip } from "~/components/WithTooltip";

import { createInitData, NewSectionCx } from "./_state";

import { UedCx } from "~/context/user-editable-data";
import {
  bgColourSwith,
  textColourSwith,
} from "~/helpers/data/switch-to-styles";
import { useToast } from "~/hooks";
import type { MyDb } from "~/types/database";

const NewSectionModal = ({
  button,
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
}) => {
  const {
    store: {
      data: { sections },
    },
  } = UedCx.Pages.TheoryOfChange.use();

  return (
    <NewSectionCx.Provider>
      {(newSectionCx) => (
        <Modal.VisibilityCx.Provider>
          {(newSectionModal) => (
            <Modal.VisibilityCx.Provider>
              {(warningModal) => {
                const handleCloseNewSectionModal = () => {
                  if (newSectionCx.revision.isUserEntry) {
                    warningModal.openModal();
                    return;
                  }
                  newSectionModal.closeModal();
                };

                return (
                  <>
                    {button({ openModal: newSectionModal.openModal })}

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={handleCloseNewSectionModal}
                      isOpen={newSectionModal.isOpen}
                      panelContent={
                        <NewSectionModalContent
                          onClose={handleCloseNewSectionModal}
                          closeNewSectionModal={newSectionModal.closeModal}
                        />
                      }
                    />

                    <Modal.OverlayAndPanelWrapper
                      onClickOutside={warningModal.closeModal}
                      isOpen={warningModal.isOpen}
                      panelContent={
                        <WarningPanel
                          callback={() => {
                            newSectionCx.store.actions.resetData(
                              createInitData({ index: sections.length }),
                            );
                            newSectionModal.closeModal();
                            warningModal.closeModal();
                          }}
                          closeModal={warningModal.closeModal}
                          text={{
                            title: "Close section creation?",
                            body: "Changes made will be lost.",
                          }}
                        />
                      }
                    />
                  </>
                );
              }}
            </Modal.VisibilityCx.Provider>
          )}
        </Modal.VisibilityCx.Provider>
      )}
    </NewSectionCx.Provider>
  );
};

export default NewSectionModal;

const NewSectionModalContent = ({
  onClose,
  closeNewSectionModal,
}: {
  onClose: () => void;
  closeNewSectionModal: () => void;
}) => {
  const [showIncompleteErrorMessage, setShowIncompleteErrorMessage] =
    useState(false);

  const {
    store: {
      data: { sections },
      actions: { sections: sectionsAction },
    },
  } = UedCx.Pages.TheoryOfChange.use();

  const {
    store: { data: newSection, actions: newSectionAction },
    revision: newSectionRevision,
  } = NewSectionCx.use();

  const toast = useToast();

  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Add new section</h3>
        <ModalLayout.Standard.Header.Info>
          Add bullets after creation
        </ModalLayout.Standard.Header.Info>
      </div>

      <div className="mt-sm flex-grow overflow-y-auto">
        <NewSection />
      </div>

      {showIncompleteErrorMessage ? (
        <div className="mt-sm w-[346px] text-sm">
          <p className="text-my-error-content">
            Can&apos;t create section. Requirements: title.
          </p>
        </div>
      ) : null}

      <div
        className={`flex items-center justify-between ${
          showIncompleteErrorMessage ? "mt-md" : "mt-xl"
        }`}
      >
        <button
          className="my-btn my-btn-neutral"
          type="button"
          onClick={onClose}
        >
          close
        </button>
        <button
          className="my-btn my-btn-action"
          type="button"
          onClick={() => {
            if (!newSectionRevision.areRequiredFields) {
              setShowIncompleteErrorMessage(true);
              setTimeout(() => {
                setShowIncompleteErrorMessage(false);
              }, 7000);
              return;
            }

            sectionsAction.create({
              ...newSection,
            });

            toast.neutral("Added section");

            closeNewSectionModal();

            setTimeout(() => {
              newSectionAction.resetData(
                createInitData({ index: sections.length }),
              );
            }, 200);
          }}
        >
          create
        </button>
      </div>
    </div>
  );
};

const NewSection = () => {
  const {
    store: {
      data: { title, description },
      actions,
    },
  } = NewSectionCx.use();

  return (
    <div className="relative w-[700px]">
      <div className="mt-sm">
        <div className="text-sm text-gray-400">Title</div>
        <div className="font-medium">
          <TextInputForm
            localStateValue={title}
            onSubmit={actions.title}
            input={{ placeholder: "Section title" }}
          />
        </div>
      </div>
      <div className="mt-sm">
        <div className="flex items-center gap-md text-sm text-gray-400">
          <span>Text</span>
          <span className="italic text-gray-300">optional</span>
        </div>
        <div className="font-medium">
          <TextAreaForm
            localStateValue={description || ""}
            onSubmit={actions.description}
            textArea={{ placeholder: "Section text" }}
          />
        </div>
      </div>
      <div className="mt-sm flex gap-2xl">
        <div>
          <div className="text-sm text-gray-400">Colour</div>
          <div className="mt-xs">
            <ColourModal />
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Bullet Icon</div>
          <div className="mt-xs">
            <IconModal />
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Bullet type</div>
          <div className="mt-xs">
            <BulletTypeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

const ColourModal = () => {
  const {
    store: {
      data: { colour },
      actions,
    },
  } = NewSectionCx.use();

  return (
    <Modal.WithVisibilityProvider
      button={({ openModal }) => (
        <WithTooltip text="click to change colour">
          <div
            className={`aspect-square w-[20px] cursor-pointer ${bgColourSwith(
              colour,
            )}`}
            onClick={openModal}
          />
        </WithTooltip>
      )}
      panelContent={({ closeModal }) => (
        <ModalLayout.Standard
          body={
            <div className="flex items-center gap-lg">
              <WithTooltip text="click to make brown">
                <div
                  className={`aspect-square w-[25px] cursor-pointer bg-brandBrown`}
                  onClick={() => {
                    if (colour === "brown") {
                      return;
                    }
                    actions.colour("brown");
                    closeModal();
                  }}
                />
              </WithTooltip>
              <WithTooltip text="click to make orange">
                <div
                  className={`aspect-square w-[25px] cursor-pointer bg-brandOrange`}
                  onClick={() => {
                    if (colour === "orange") {
                      return;
                    }
                    actions.colour("orange");
                    closeModal();
                  }}
                />
              </WithTooltip>
              <WithTooltip text="click to make green">
                <div
                  className={`aspect-square w-[25px] cursor-pointer bg-brandGreen`}
                  onClick={() => {
                    if (colour === "green") {
                      return;
                    }
                    actions.colour("green");
                    closeModal();
                  }}
                />
              </WithTooltip>
            </div>
          }
          showCloseSection={false}
          title="Choose colour"
          styles={{ outerWrapper: "h-[140px]" }}
        />
      )}
    />
  );
};

const iconNames = [
  "leaf",
  "tree",
  "orange",
  "potted-plant",
  "plant",
  "flower-tulip",
  "flower-lotus",
  "feather",
  "flame",
  "fish-simple",
  "mountains",
  "moon",
  "grains",
  "star",
  "tipi",
  "sun",
] as const;

const IconModal = () => {
  const {
    store: {
      data: {
        colour,
        bullets: { icon },
      },
    },
  } = NewSectionCx.use();

  return (
    <Modal.WithVisibilityProvider
      button={({ openModal }) => (
        <WithTooltip text="click to change icon">
          <div
            className={`grid aspect-square w-[20px] cursor-pointer place-items-center text-lg ${textColourSwith(
              colour,
            )}`}
            onClick={openModal}
          >
            {<IconSwith iconName={icon} />}
          </div>
        </WithTooltip>
      )}
      panelContent={({ closeModal }) => (
        <ModalLayout.Standard
          body={
            <div className="mt-xs flex flex-wrap items-center gap-lg">
              {iconNames.map((iconName, i) => (
                <IconModalIcon
                  closeModal={closeModal}
                  iconName={iconName}
                  key={i}
                />
              ))}
            </div>
          }
          showCloseSection={false}
          styles={{ outerWrapper: "h-[240px]" }}
          header={
            <ModalLayout.Standard.Header>
              <ModalLayout.Standard.Header.Title>
                Choose icon
              </ModalLayout.Standard.Header.Title>
              <ModalLayout.Standard.Header.Info>
                The icon is the bullet point within the section
              </ModalLayout.Standard.Header.Info>
            </ModalLayout.Standard.Header>
          }
        />
      )}
    />
  );
};

const IconModalIcon = ({
  closeModal,
  iconName,
}: {
  closeModal: () => void;
  iconName: MyDb["pages"]["theory-of-change"]["sections"][number]["bullets"]["icon"];
}) => {
  const {
    store: {
      data: {
        colour,
        bullets: { icon },
      },
      actions,
    },
  } = NewSectionCx.use();

  return (
    <WithTooltip text="click to select icon">
      <div
        className={`cursor-pointer rounded-full p-xs text-2xl transition-all ease-in-out hover:bg-gray-100 ${textColourSwith(
          colour,
        )}`}
        onClick={() => {
          if (icon === iconName) {
            return;
          }

          actions.bullets.icon(iconName);

          closeModal();
        }}
      >
        {<IconSwith iconName={iconName} />}
      </div>
    </WithTooltip>
  );
};

const BulletTypeSwitch = () => {
  const {
    store: {
      data: { colour, bullets },
      actions,
    },
  } = NewSectionCx.use();

  return (
    <WithTooltip text="click to change bullet type">
      <div
        className={`cursor-pointer ${textColourSwith(colour)}`}
        onClick={() =>
          actions.bullets.type(
            bullets.type === "text" ? "text-and-title" : "text",
          )
        }
      >
        {bullets.type}
      </div>
    </WithTooltip>
  );
};

import React, { type ReactNode } from "react";
import { Popover } from "@headlessui/react";
import { produce } from "immer";

import CareersModal from "~/components/careers-modal/+Entry";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import ModalLayout from "~/components/layouts/Modal";
import { ComponentMenu } from "~/components/menus";
import { Modal } from "~/components/styled-bases";
import { WarningPanel } from "~/components/WarningPanel";
import { WithTooltip } from "~/components/WithTooltip";

import { DbReadCx } from "~/context/db-data-read-only";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { useToast } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

const JobPosts = () => {
  const {
    store: {
      data: {
        careers: { entries: pageEntries },
      },
      actions: {
        careers: { entries: pageEntryAction },
      },
    },
  } = UedCx.Pages.Careers.use();

  const {
    store: { data: careers },
  } = UedCx.Careers.use();

  const pageEntriesSorted = React.useMemo(() => {
    const sorted = produce(pageEntries, (draft) => {
      draft.sort((entryA, entryB) => {
        const careerA = careers.find(
          (career) => career.id === entryA.dbConnections.careerId,
        );
        const careerB = careers.find(
          (career) => career.id === entryB.dbConnections.careerId,
        );

        if (!careerA && !careerB) {
          return 0;
        }
        if (!careerA) {
          return -1;
        }
        if (!careerB) {
          return 1;
        }
        return careerA.index - careerB.index;
      });
    });
    return sorted;
  }, [pageEntries, careers]);

  const toast = useToast();

  return (
    <div>
      <CmsLayout.EditBar>
        <CareersModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.Button
              icon={<Icon.Create />}
              onClick={openModal}
              text="Add job post"
            />
          )}
          connectCareer={(careerId) => {
            pageEntryAction.add({
              id: generateUid(),
              dbConnections: { careerId },
            });

            toast.neutral("added job to page");
          }}
          connectTooltip="add job posting to page"
          usedCareerIds={pageEntries.map(
            (entry) => entry.dbConnections.careerId,
          )}
        />
      </CmsLayout.EditBar>

      <div className="mt-lg">
        {!pageEntries.length ? (
          <p>No job postings yet.</p>
        ) : (
          <div className="mt-lg grid grid-cols-2 gap-x-lg gap-y-xl">
            {pageEntriesSorted.map((pageEntry) => (
              <DbReadCx.Pages.Careers.JobPost.Provider
                entry={pageEntry}
                key={pageEntry.id}
              >
                <ConnectCareer>
                  {({ connectedCareer }) => (
                    <DbReadCx.Career.Provider career={connectedCareer}>
                      <JobPost />
                    </DbReadCx.Career.Provider>
                  )}
                </ConnectCareer>
              </DbReadCx.Pages.Careers.JobPost.Provider>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPosts;

const ConnectCareer = ({
  children,
}: {
  children: (arg0: { connectedCareer: MyDb["career"] }) => ReactNode;
}) => {
  const pageEntry = DbReadCx.Pages.Careers.JobPost.use();

  const {
    store: { data: careers },
  } = UedCx.Careers.use();

  const connectedCareer = careers.find(
    (position) => position.id === pageEntry.dbConnections.careerId,
  );

  if (!connectedCareer) {
    return <UnfoundCareer />;
  }

  return children({ connectedCareer });
};

const UnfoundCareer = () => (
  <div className="group/career relative grid place-items-center rounded-md border-2 border-my-alert-content bg-gray-50 p-md">
    <UnfoundCareerMenu />
    <div className="grid place-items-center">
      <div className="text-5xl text-gray-500">
        <Icon.JobPost weight="light" />
      </div>
      <div className="mt-4 text-center text-my-alert-content">
        <p className="mt-1">Error - could not find job post.</p>
      </div>
      <div className="mt-4 max-w-[400px] text-center text-gray-500">
        A job post was added to the careers page that can&apos;t be found. It
        may have been deleted.
      </div>
    </div>
  </div>
);

const UnfoundCareerMenu = () => {
  const {
    store: {
      actions: {
        careers: { entries: pageJobPostAction },
      },
    },
  } = UedCx.Pages.Careers.use();

  const pageJobPost = DbReadCx.Pages.Careers.JobPost.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/career:opacity-40">
      <ComponentMenu.Button
        onClick={() => {
          pageJobPostAction.remove({
            id: pageJobPost.id,
          });

          toast.neutral("job posting removed");
        }}
        tooltip="remove job post"
        styles={{ button: "hover:text-my-alert-content hover:bg-my-alert" }}
      >
        <Icon.Remove weight="bold" />
      </ComponentMenu.Button>
    </ComponentMenu>
  );
};

const JobPost = () => {
  const { id, closingDate, description, docLinkButtons, docLinksText, title } =
    DbReadCx.Career.use();

  const {
    store: { actions, data: careers },
    revision: { undoKey },
  } = UedCx.Careers.use();

  const docLinkButtonsSorted = React.useMemo(
    () => deepSortByIndex(docLinkButtons),
    [docLinkButtons],
  );

  return (
    <div className="group/career relative">
      <CareerMenu />

      <div className="mt-sm">
        <div className="border-b border-gray-300 pb-sm">
          <div className="overflow-x-auto text-lg font-medium">
            <TextInputForm
              localStateValue={title}
              input={{
                placeholder: "position description",
              }}
              onSubmit={(updatedValue) => actions.title({ id, updatedValue })}
              tooltip="Click to edit title"
              key={undoKey}
            />
          </div>

          <div className="mt-xs">
            <div className="flex items-center gap-xs text-gray-500">
              <span>
                <Icon.Date />
              </span>
              <div className="flex gap-xs">
                <span>closes, </span>
                <span className="overflow-x-auto">
                  <TextInputForm
                    localStateValue={closingDate}
                    input={{
                      placeholder: "1 January 2031",
                    }}
                    onSubmit={(updatedValue) =>
                      actions.closingDate({ id, updatedValue })
                    }
                    tooltip="Click to edit closing date"
                    key={undoKey}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-prose prose mt-sm w-full max-w-full">
          <TextAreaForm
            localStateValue={description}
            textArea={{
              placeholder: "job description",
            }}
            onSubmit={(updatedValue) =>
              actions.description({ id, updatedValue })
            }
            tooltip="Click to edit description"
            key={undoKey}
          />
        </div>

        <div className="mt-md">
          <div className="text-gray-600">
            <TextAreaForm
              localStateValue={docLinksText}
              textArea={{
                placeholder: "Doc links text (optional)",
                styles: "font-medium italic",
              }}
              onSubmit={(updatedValue) =>
                actions.docLinksText({ id, updatedValue })
              }
              tooltip="edit doc links text (optional)"
              key={undoKey}
            />
          </div>
          <div className="mt-sm">
            <div className="flex flex-wrap items-center gap-x-md gap-y-sm">
              {!docLinkButtons.length ? (
                <p className="italic text-gray-400">No doc links yet.</p>
              ) : (
                docLinkButtonsSorted.map((docLinkButton) => (
                  <DbReadCx.Career.DocLinkButton.Provider
                    docLinkButton={docLinkButton}
                    key={docLinkButton.id}
                  >
                    <DocLinkButton />
                  </DbReadCx.Career.DocLinkButton.Provider>
                ))
              )}
            </div>
            <div className="mt-sm">
              <div
                className="group/add-doc-link flex cursor-pointer items-center gap-xs rounded-sm text-sm"
                onClick={() =>
                  actions.docLinkButtons.create({
                    careerId: id,
                    newEntry: {
                      id: generateUid(),
                      index: careers.length,
                      link: "",
                      text: "",
                    },
                  })
                }
              >
                <span className="text-blue-300">
                  <Icon.Create />
                </span>
                <span className="text-gray-400 transition-colors duration-75 ease-in-out group-hover/add-doc-link:text-gray-600">
                  Add doc link button
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CareerMenu = () => {
  const {
    store: {
      actions: {
        careers: { entries: pageJobPostAction },
      },
    },
  } = UedCx.Pages.Careers.use();

  const pageJobPost = DbReadCx.Pages.Careers.JobPost.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/career:opacity-40">
      <ComponentMenu.Button
        onClick={() => {
          pageJobPostAction.remove({
            id: pageJobPost.id,
          });

          toast.neutral("job posting removed");
        }}
        tooltip="remove job post"
        styles={{ button: "hover:text-my-alert-content hover:bg-my-alert" }}
      >
        <Icon.Remove weight="bold" />
      </ComponentMenu.Button>
    </ComponentMenu>
  );
};

const DocLinkButton = () => {
  const docLinkButton = DbReadCx.Career.DocLinkButton.use();

  const career = DbReadCx.Career.use();

  const {
    store: {
      actions: { docLinkButtons: docLinkButtonAction },
    },
    revision: { undoKey },
  } = UedCx.Careers.use();

  return (
    <div className="group/doc-link-button relative flex items-center gap-xs rounded-sm border border-blue-400 px-sm py-xxs transition-all duration-75 ease-in-out hover:bg-gray-100">
      <DocLinkButtonMenu />

      <DocLinkButtonLinkModal />

      <span className="overflow-x-auto text-gray-600">
        <TextInputForm
          localStateValue={docLinkButton.text}
          input={{
            placeholder: "button text",
          }}
          onSubmit={(updatedValue) =>
            docLinkButtonAction.text({
              careerId: career.id,
              docLinkButtonId: docLinkButton.id,
              updatedValue,
            })
          }
          tooltip="Click to edit download link button text"
          key={undoKey}
        />
      </span>
    </div>
  );
};

const DocLinkButtonMenu = () => {
  const {
    store: {
      actions: { docLinkButtons: docLinkButtonAction },
    },
  } = UedCx.Careers.use();

  const career = DbReadCx.Career.use();

  const docLinkButton = DbReadCx.Career.DocLinkButton.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="right-0 -top-1 -translate-y-full group-hover/doc-link-button:opacity-40">
      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            tooltip="delete doc link button"
            onClick={openModal}
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              docLinkButtonAction.delete({
                careerId: career.id,
                docLinkButtonId: docLinkButton.id,
              });

              toast.neutral("doc link button deleted");

              closeModal();
            }}
            closeModal={closeModal}
            text={{
              title: "Delete doc link button",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

const DocLinkButtonLinkModal = () => {
  const docLinkButton = DbReadCx.Career.DocLinkButton.use();

  const career = DbReadCx.Career.use();

  const {
    store: {
      actions: { docLinkButtons: docLinkButtonAction },
    },
    revision: { undoKey },
  } = UedCx.Careers.use();

  return (
    <Popover className="relative z-20 grid place-items-center">
      <Popover.Button>
        <WithTooltip text="Click to edit link">
          <span className="grid place-items-center text-blue-400">
            <Icon.Download />
          </span>
        </WithTooltip>
      </Popover.Button>

      <Popover.Panel
        className={`absolute -top-md left-0 w-[500px] -translate-y-full rounded-xl bg-white p-lg shadow-xl`}
      >
        <ModalLayout.Standard.Header>
          <ModalLayout.Standard.Header.Title>
            Edit doc link
          </ModalLayout.Standard.Header.Title>
          <ModalLayout.Standard.Header.Info>
            Paste in download link to document
          </ModalLayout.Standard.Header.Info>
        </ModalLayout.Standard.Header>
        <div className="mt-md overflow-x-auto">
          <TextInputForm
            localStateValue={docLinkButton.link}
            input={{
              placeholder: "Enter doc link",
            }}
            onSubmit={(updatedValue) =>
              docLinkButtonAction.link({
                careerId: career.id,
                docLinkButtonId: docLinkButton.id,
                updatedValue,
              })
            }
            tooltip="Click to edit download link"
            key={undoKey}
          />
        </div>
      </Popover.Panel>
    </Popover>
  );
};

import React from "react";
import Link from "next/link";
import { Leaf } from "@phosphor-icons/react";
import ReactTextareaAutosize from "react-textarea-autosize";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { DndKit } from "~/components/dnd-kit";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { ComponentMenu } from "~/components/menus";
import ProgrammesModal from "~/components/programmes-modal/+Entry";
import { Modal } from "~/components/styled-bases";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WarningPanel } from "~/components/WarningPanel";
import { WithTooltip } from "~/components/WithTooltip";

import { ProgrammeCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";
import { useFocused } from "~/hooks/useFocused";
import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

const ProgrammesList = () => (
  <div>
    <CmsLayout.EditBar className="opacity-50 transition-opacity duration-100 ease-in-out hover:opacity-100">
      <ProgrammesModal
        button={({ openModal }) => (
          <CmsLayout.EditBar.Button.Edit
            buttonText="Edit programmes"
            onClick={openModal}
          />
        )}
      />

      <CmsLayout.EditBar.Info
        infoText="Below fields are editable. Edit in depth from individual page."
        gap="xs"
      />
    </CmsLayout.EditBar>

    <div className="mt-xl">
      <Programmes />
    </div>
  </div>
);

export default ProgrammesList;

const Programmes = () => {
  const {
    store: { data: programmes, actions },
  } = UedCx.Programmes.use();

  const sorted = React.useMemo(() => deepSortByIndex(programmes), [programmes]);

  return (
    <div className="grid grid-cols-1 gap-2xl">
      <DndKit.Context elementIds={getIds(sorted)} onReorder={actions.reorder}>
        {sorted.map((programme) => (
          <DndKit.Element elementId={programme.id} key={programme.id}>
            <ProgrammeCx.Provider programme={programme}>
              <Programme />
            </ProgrammeCx.Provider>
          </DndKit.Element>
        ))}
      </DndKit.Context>
    </div>
  );
};

const Programme = () => {
  const { id, subtitle, summary, title } = ProgrammeCx.use();

  const {
    store: { actions },
    revision: { undoKey },
  } = UedCx.Programmes.use();

  const toast = useToast();

  return (
    <div className="group/programme">
      <CmsLayout.EditBar className="opacity-40 transition-opacity duration-100 ease-in-out group-hover/programme:opacity-80 hover:!opacity-100">
        <div>
          <Link href={`programmes/${id}`}>
            <CmsLayout.EditBar.Button
              icon={<Icon.InternalLink />}
              text="page"
            />
          </Link>
        </div>
        <div>
          <Modal.WithVisibilityProvider
            button={({ openModal }) => (
              <ComponentMenu.Button.Delete
                tooltip="delete programme"
                onClick={openModal}
                styles={{
                  inner: "!text-gray-400 hover:!text-my-alert-content",
                }}
              />
            )}
            panelContent={({ closeModal }) => (
              <WarningPanel
                callback={() => {
                  actions.delete({ id });

                  closeModal();

                  toast.neutral("deleted programme");
                }}
                closeModal={closeModal}
                text={{
                  title: "Delete programme",
                  body: "Are you sure?",
                }}
              />
            )}
          />
        </div>
      </CmsLayout.EditBar>

      <div className="mt-md flex gap-md">
        <div className="w-full max-w-[350px]">
          <div className="group/image relative aspect-[4/3] w-full ">
            <ImageMenu />
            <UserSelectedImageWrapper
              dbImageId={summary.image.dbConnections.imageId}
              placeholderText="summary image"
            >
              {({ dbImageId }) => (
                <ConnectImage dbImageId={dbImageId}>
                  {({ urls }) => (
                    <CustomisableImage
                      urls={urls}
                      position={summary.image.position}
                    />
                  )}
                </ConnectImage>
              )}
            </UserSelectedImageWrapper>
          </div>
        </div>
        <div className="flex-grow">
          <div className="font-display text-5xl text-brandOrange">
            <TextInputForm
              localStateValue={title}
              input={{
                placeholder: "Programme title",
                styles: "tracking-wide font-bold",
              }}
              onSubmit={(inputValue) =>
                actions.title({ id, updatedValue: inputValue })
              }
              tooltip="Click to edit title"
              key={undoKey}
            />
          </div>
          <div className="mt-xxs font-display text-3xl text-brandOrange">
            <TextAreaForm
              localStateValue={subtitle}
              textArea={{
                placeholder: "Programme subtitle",
                styles: "tracking-wide font-bold",
              }}
              onSubmit={(inputValue) =>
                actions.subtitle({ id, updatedValue: inputValue })
              }
              tooltip="Click to edit subtitle"
              key={undoKey}
            />
          </div>
          <div className="custom-prose_no-p-margin prose mt-xs max-w-full font-medium">
            <TextAreaForm
              localStateValue={summary.mainText}
              textArea={{
                placeholder: "Programme summary",
                styles: "tracking-wide font-medium",
              }}
              onSubmit={(inputValue) =>
                actions.subtitle({ id, updatedValue: inputValue })
              }
              tooltip="Click to edit subtitle"
              key={undoKey}
            />
          </div>
          <div>
            <ProgrammeBullets />
          </div>
          <div className="mt-xs">
            <AddBulletForm />
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageMenu = () => {
  const {
    store: {
      actions: {
        summary: { image: imageAction },
      },
    },
  } = UedCx.Programmes.use();

  const {
    id,
    summary: { image },
  } = ProgrammeCx.use();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/image:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(updatedValue) =>
              imageAction.position.x({ id, updatedValue })
            }
            updateY={(updatedValue) =>
              imageAction.position.y({ id, updatedValue })
            }
            styles={{ wrapper: "right-0 top-0", menuItemsWrapper: "right-0" }}
          />

          <ComponentMenu.Divider />
        </>
      ) : null}

      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          imageAction.dbConnections.imageId({ id, updatedValue: dbImageId });

          imageAction.position.x({ id, updatedValue: 50 });
          imageAction.position.y({ id, updatedValue: 50 });
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />
    </ComponentMenu>
  );
};

const ProgrammeBullets = () => {
  const {
    id: programmeId,
    summary: { bullets },
  } = ProgrammeCx.use();

  const {
    store: {
      actions: {
        summary: { bullets: bulletsAction },
      },
    },
  } = UedCx.Programmes.use();

  const sorted = React.useMemo(() => deepSortByIndex(bullets), [bullets]);

  return (
    <div className="mt-xs">
      {!sorted.length ? (
        <p className="italic text-gray-500">No programme bullets yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-xxs">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={(input) =>
              bulletsAction.reorder({ programmeId, bullets: input })
            }
          >
            {sorted.map((bullet) => (
              <DndKit.Element elementId={bullet.id} key={bullet.id}>
                <ProgrammeBullet bullet={bullet} />
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const ProgrammeBullet = ({
  bullet,
}: {
  bullet: MyDb["programme"]["summary"]["bullets"][number];
}) => {
  const { id: programmeId } = ProgrammeCx.use();

  const {
    store: {
      actions: {
        summary: { bullets: bulletAction },
      },
    },
    revision: { undoKey },
  } = UedCx.Programmes.use();

  return (
    <div className="group/bullet flex items-start gap-sm">
      <div className="relative translate-y-[6px] text-xs text-brandLightBrown">
        <ProgrammeBulletMenu bulletId={bullet.id} />
        <Leaf />
      </div>
      <div className="flex-grow  text-gray-600">
        <TextAreaForm
          localStateValue={bullet.text}
          textArea={{
            placeholder: "Bullet text",
            styles: "tracking-wide leading-relaxed",
          }}
          onSubmit={(inputValue) =>
            bulletAction.text({
              bulletId: bullet.id,
              programmeId,
              updatedValue: inputValue,
            })
          }
          tooltip="Click to edit bullet text"
          key={undoKey}
        />
      </div>
    </div>
  );
};

const ProgrammeBulletMenu = ({ bulletId }: { bulletId: string }) => {
  const {
    store: {
      actions: {
        summary: { bullets: bulletAction },
      },
    },
  } = UedCx.Programmes.use();

  const { id: programmeId } = ProgrammeCx.use();

  const toast = useToast();

  return (
    <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-colors duration-75 ease-in-out group-hover/bullet:z-10 group-hover/bullet:opacity-60 hover:!opacity-100">
      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            onClick={openModal}
            tooltip="delete bullet"
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              bulletAction.delete({ bulletId, programmeId });

              closeModal();

              toast.neutral("deleted programme bullet");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete programme bullet",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </div>
  );
};

const AddBulletForm = () => {
  const [newBulletText, setNewBulletText] = React.useState("");

  const [isFocused, { focusHandlers }] = useFocused();

  const {
    store: {
      actions: {
        summary: { bullets: bulletAction },
      },
    },
  } = UedCx.Programmes.use();

  const {
    id: programmeId,
    summary: { bullets },
  } = ProgrammeCx.use();

  return (
    <div
      className={`rounded-md px-4 py-2 transition-all duration-100 ease-in-out ${
        isFocused ? "border border-blue-300" : ""
      }`}
    >
      <form
        className="flex w-full items-center gap-sm text-sm"
        onSubmit={(e) => {
          e.preventDefault();

          bulletAction.create({
            programmeId,
            newEntry: {
              id: generateUid(),
              text: newBulletText,
              index: bullets.length,
            },
          });

          setNewBulletText("");
        }}
      >
        <div className="text-gray-400">
          <Icon.Create />
        </div>
        <WithTooltip text="click to type in new bullet">
          <ReactTextareaAutosize
            className={`z-10 w-full resize-none outline-none ${
              isFocused ? "bg-transparent" : "bg-transparent "
            }`}
            value={newBulletText}
            onChange={(e) => {
              setNewBulletText(e.target.value);
            }}
            placeholder="Add bullet"
            autoComplete="off"
            {...focusHandlers}
          />
        </WithTooltip>
        {newBulletText.length ? (
          <button className="my-btn my-btn-neutral" type="submit">
            Submit
          </button>
        ) : null}
      </form>
    </div>
  );
};

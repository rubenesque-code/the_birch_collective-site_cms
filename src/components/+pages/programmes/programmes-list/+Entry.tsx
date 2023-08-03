import ReactTextareaAutosize from "react-textarea-autosize";

import { ProgrammeCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";

import CmsLayout from "~/components/layouts/Cms";
import ProgrammesModal from "~/components/programmes-modal/+Entry";
import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import React from "react";
import { deepSortByIndex } from "~/helpers/data/process";
import { DndKit } from "~/components/dnd-kit";
import { getIds } from "~/helpers/data/query";
import { ComponentMenu } from "~/components/menus";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { useFocused } from "~/hooks/useFocused";
import { generateUid } from "~/lib/external-packages-rename";
import { Icon } from "~/components/icons";
import { WithTooltip } from "~/components/WithTooltip";
import type { MyDb } from "~/types/database";
import { Leaf } from "@phosphor-icons/react";

const ProgrammesList = () => {
  return (
    <div>
      <CmsLayout.EditBar>
        <ProgrammesModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.EditButton
              buttonText="Edit programmes"
              onClick={openModal}
            />
          )}
        />
        <CmsLayout.EditBar.Info
          infoText="Edit fields below. Edit in depth from individual page."
          gap="xs"
        />
      </CmsLayout.EditBar>
      <div className="mt-xl">
        <Programmes />
      </div>
    </div>
  );
};

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
          <ProgrammeCx.Provider programme={programme} key={programme.id}>
            <Programme />
          </ProgrammeCx.Provider>
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

  return (
    <div className="flex gap-md">
      <div className="w-full max-w-[350px]">
        <div className="group/image relative aspect-[4/3] w-full ">
          <ImageMenu />
          <UserSelectedImageWrapper
            dbImageId={summary.image.dbConnections.imageId}
            placeholderText="summary image"
          >
            {({ dbImageId }) => (
              <DbImageWrapper dbImageId={dbImageId}>
                {({ urls }) => (
                  <CustomisableImage
                    urls={urls}
                    position={summary.image.position}
                  />
                )}
              </DbImageWrapper>
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
  );
};

const ProgrammeBullets = () => {
  const {
    summary: { bullets },
  } = ProgrammeCx.use();

  const sorted = React.useMemo(() => deepSortByIndex(bullets), [bullets]);

  return (
    <>
      {!sorted.length ? (
        <p className="italic text-gray-500">No programme bullets yet.</p>
      ) : (
        sorted.map((bullet) => (
          <ProgrammeBullet bullet={bullet} key={bullet.id} />
        ))
      )}
    </>
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
    <div className="flex gap-xs">
      <div className="translate-y-[6px] text-xs text-brandLightBrown">
        <Leaf />
      </div>
      <div className="flex-grow  text-gray-600">
        <TextAreaForm
          localStateValue={bullet.text}
          textArea={{
            placeholder: "Bullet text",
            styles: "tracking-wide",
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

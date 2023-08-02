import React, { type ReactElement } from "react";

import { UedCx } from "~/context/user-editable-data";
import { AboutCx } from "~/context/entities/about";

import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";

import { useToast } from "~/hooks";

import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { Modal } from "~/components/styled-bases";
import { CreateModal } from "./CreateModal";
import ModalLayout from "~/components/layouts/Modal";
import { DndKit } from "~/components/dnd-kit";
import { ComponentMenu } from "~/components/menus";
import { WarningPanel } from "~/components/WarningPanel";
import { TextAreaForm, TextInputForm } from "~/components/forms";

const MembersModal = ({
  button,
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
}) => (
  <Modal.WithVisibilityProvider button={button} panelContent={<Content />} />
);

export default MembersModal;

const Content = () => {
  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <ModalLayout.UserEdit
      body={<Members />}
      closeModal={closeModal}
      createEntityModal={<CreateModal />}
      title="Edit team members"
    />
  );
};

const Members = () => {
  const {
    store: {
      data: {
        theTeam: { members },
      },
      actions: {
        theTeam: { members: membersAction },
      },
    },
  } = UedCx.Pages.AboutUs.use();

  const sorted = React.useMemo(() => deepSortByIndex(members), [members]);

  return (
    <div>
      {!members.length ? (
        <div className="text-gray-600">No members yet.</div>
      ) : (
        <div className="grid grid-cols-2 gap-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={membersAction.reorder}
          >
            {sorted.map((member) => (
              <DndKit.Element elementId={member.id} key={member.id}>
                <AboutCx.TeamMember.Provider teamMember={member}>
                  <Member />
                </AboutCx.TeamMember.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Member = () => {
  const { id, bio, image, name, role } = AboutCx.TeamMember.use();

  const {
    store: {
      actions: {
        theTeam: { members: memberAction },
      },
    },
  } = UedCx.Pages.AboutUs.use();

  return (
    <div className="group/member relative">
      <MemberMenu />
      <div className={`cursor-pointer rounded-lg border p-sm `}>
        <div className="relative aspect-square w-[200px] rounded-full">
          <UserSelectedImageWrapper
            dbImageId={image.dbConnections.imageId}
            placeholderText="member image"
            isCircle
          >
            {({ dbImageId }) => (
              <DbImageWrapper dbImageId={dbImageId}>
                {({ urls }) => (
                  <CustomisableImage
                    urls={urls}
                    objectFit="cover"
                    position={image.position}
                    isCircle
                  />
                )}
              </DbImageWrapper>
            )}
          </UserSelectedImageWrapper>
        </div>
        <div className="mt-md">
          <div className="text-sm text-gray-400">Name</div>
          <div className="font-medium">
            <TextInputForm
              localStateValue={name}
              onSubmit={(inputValue) =>
                memberAction.name({ id, updatedValue: inputValue })
              }
              input={{ placeholder: "Member name" }}
              tooltip="Click to edit name"
            />
          </div>
        </div>
        <div className="mt-md">
          <div className="text-sm text-gray-400">role</div>
          <div className="overflow-auto font-medium">
            <TextInputForm
              localStateValue={role}
              onSubmit={(inputValue) =>
                memberAction.role({ id, updatedValue: inputValue })
              }
              input={{ placeholder: "Member role" }}
              tooltip="Click to edit role"
            />
          </div>
        </div>
        <div className="mt-md">
          <div className="text-sm text-gray-400">bio</div>
          <div className="max-h-[200px] overflow-y-auto">
            <TextAreaForm
              localStateValue={bio}
              onSubmit={(inputValue) =>
                memberAction.bio({ id, updatedValue: inputValue })
              }
              textArea={{ placeholder: "Member bio" }}
              tooltip="Click to edit bio"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MemberMenu = () => {
  const { id, image } = AboutCx.TeamMember.use();

  const {
    store: {
      actions: {
        theTeam: { members: memberAction },
      },
    },
  } = UedCx.Pages.AboutUs.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/member:opacity-40">
      {image.dbConnections.imageId ? (
        <>
          <ComponentMenu.Image.PositionMenu
            position={image.position}
            updateX={(updatedValue) =>
              memberAction.image.position.x({ id, updatedValue })
            }
            updateY={(updatedValue) =>
              memberAction.image.position.y({ id, updatedValue })
            }
            styles={{ wrapper: "right-0 top-0", menuItemsWrapper: "right-0" }}
          />

          <ComponentMenu.Divider />
        </>
      ) : null}
      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          memberAction.image.dbConnections.imageId({
            id,
            updatedValue: dbImageId,
          });
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />

      <ComponentMenu.Divider />

      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            tooltip="delete member"
            onClick={openModal}
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              memberAction.delete({ id });
              closeModal();
              toast.neutral("deleted member");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete member",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

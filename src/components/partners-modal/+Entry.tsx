import React, { type ReactElement } from "react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { Modal } from "~/components/styled-bases";
import { PartnerCx } from "~/context/entities";
import { deepSortByIndex } from "~/helpers/data/process";
import { getIds } from "~/helpers/data/query";
import { useToast } from "~/hooks";
import { WarningPanel } from "../WarningPanel";
import { DndKit } from "../dnd-kit";
import { TextInputForm } from "../forms";
import { Icon } from "../icons";
import { ComponentMenu } from "../menus";
import { CreateModal } from "./CreateModal";
import {
  ComponentApiCx,
  type ContextValue as ComponentApiProps,
} from "./_state";
import { UedCx } from "~/context/user-editable-data";

const PartnersModal = ({
  button,
  ...componentApiProps
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
} & ComponentApiProps) => (
  <ComponentApiCx.Provider {...componentApiProps}>
    <Modal.WithVisibilityProvider
      button={({ openModal }) => button({ openModal })}
      panelContent={<Content />}
    />
  </ComponentApiCx.Provider>
);

export default PartnersModal;

const Content = () => {
  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <div className="relative flex max-h-[70vh] min-h-[500px] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Edit partners</h3>
      </div>
      <div className="mt-sm">
        <CreateModal />
      </div>
      <div className="mt-sm flex-grow overflow-y-auto">
        <Partners />
      </div>
      <div className="mt-xl">
        <button
          className="my-btn my-btn-neutral"
          type="button"
          onClick={closeModal}
        >
          close
        </button>
      </div>
    </div>
  );
};

const Partners = () => {
  const {
    store: { data: partners, actions },
  } = UedCx.Partners.use();

  const sorted = React.useMemo(() => deepSortByIndex(partners), [partners]);

  return (
    <div>
      {!partners.length ? (
        <div className="text-gray-600">No partners yet.</div>
      ) : (
        <div className="grid grid-cols-4 gap-sm">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={actions.reorder}
          >
            {sorted.map((partner) => (
              <DndKit.Element elementId={partner.id} key={partner.id}>
                <PartnerCx.Provider partner={partner}>
                  <Partner />
                </PartnerCx.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Partner = () => {
  const { id, image, name, url } = PartnerCx.use();

  const {
    store: { actions },
  } = UedCx.Partners.use();

  return (
    <div className="group/partner relative">
      <PartnerMenu />
      <div className={`cursor-pointer rounded-lg border p-sm `}>
        <div className="relative aspect-video">
          <UserSelectedImageWrapper
            dbImageId={image.dbConnections.imageId}
            placeholderText="partner image"
          >
            {({ dbImageId }) => (
              <ConnectImage dbImageId={dbImageId}>
                {({ urls }) => (
                  <CustomisableImage urls={urls} objectFit="contain" />
                )}
              </ConnectImage>
            )}
          </UserSelectedImageWrapper>
        </div>
        <div className="mt-md">
          <div className="text-sm text-gray-400">Name</div>
          <div className="font-medium">
            <TextInputForm
              localStateValue={name}
              onSubmit={(inputValue) =>
                actions.name({ id, newVal: inputValue })
              }
              input={{ placeholder: "Partner name" }}
              tooltip="Click to edit name"
            />
          </div>
        </div>
        <div className="mt-md">
          <div className="text-sm text-gray-400">Link</div>
          <div className="overflow-auto font-medium">
            <TextInputForm
              localStateValue={url}
              onSubmit={(inputValue) => actions.url({ id, newVal: inputValue })}
              input={{ placeholder: "Partner link" }}
              tooltip="Click to edit link"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PartnerMenu = () => {
  const { connectPartner: connectPartner, usedPartnerIds: usedPartnerIds } =
    ComponentApiCx.use();

  const {
    store: { actions },
  } = UedCx.Partners.use();

  const { id } = PartnerCx.use();

  const isUsed = usedPartnerIds.includes(id);

  const toast = useToast();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/partner:opacity-40">
      <ComponentMenu.Image.UploadAndLibraryModal
        onUploadOrSelect={({ dbImageId }) => {
          actions.image.dbConnections.imageId({
            id,
            newVal: dbImageId,
          });
        }}
        styles={{
          menu: { itemsWrapper: "right-0 -bottom-1 translate-y-full" },
        }}
      />

      <ComponentMenu.Divider />

      <ComponentMenu.Button
        tooltip={
          isUsed ? "can't add - already part of landing" : "add to landing"
        }
        onClick={() => {
          if (isUsed) {
            return;
          }
          connectPartner(id);
        }}
        isDisabled={isUsed}
      >
        <Icon.ConnectEntity />
      </ComponentMenu.Button>

      <ComponentMenu.Divider />

      <Modal.WithVisibilityProvider
        button={({ openModal }) => (
          <ComponentMenu.Button.Delete
            tooltip="delete partner"
            onClick={openModal}
          />
        )}
        panelContent={({ closeModal }) => (
          <WarningPanel
            callback={() => {
              actions.delete({ id });
              closeModal();
              toast.neutral("deleted partner");
            }}
            closeModal={closeModal}
            text={{
              title: "Delete partner",
              body: "Are you sure?",
            }}
          />
        )}
      />
    </ComponentMenu>
  );
};

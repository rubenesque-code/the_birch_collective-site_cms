import { type ReactElement } from "react";
import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { WithTooltip } from "~/components/WithTooltip";
import { Modal } from "~/components/styled-bases";
import { SupporterCx } from "~/context/entities";
import { UserEditableDataCx } from "../+pages/home/_state";
import {
  ComponentApiCx,
  type ContextValue as ComponentApiProps,
} from "./_state";
import { CreateModal } from "./CreateModal";

// create new, add to landing, re-arrange order, delete, update image (no position), update link, update title

const SupportersModal = ({
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

export default SupportersModal;

const Content = () => {
  const { closeModal } = Modal.VisibilityCx.use();

  return (
    <div className="relative flex max-h-[70vh] min-h-[500px] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">Edit supporters</h3>
      </div>
      <div className="mt-sm">
        <CreateModal />
      </div>
      <div className="mt-sm flex-grow overflow-y-auto">
        <Supporters />
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

const Supporters = () => {
  const { supporters } = UserEditableDataCx.useAllData();

  return (
    <div>
      {!supporters.length ? (
        <div className="text-gray-600">No supporters yet.</div>
      ) : (
        <div className="grid grid-cols-4 gap-sm">
          {supporters.map((supporter) => (
            <SupporterCx.Provider supporter={supporter} key={supporter.id}>
              <Supporter />
            </SupporterCx.Provider>
          ))}
        </div>
      )}
    </div>
  );
};

const Supporter = () => {
  const { connectSupporter, usedSupporterIds } = ComponentApiCx.use();

  const { id, image } = SupporterCx.use();

  return (
    <WithTooltip text="add to landing">
      <div
        className="cursor-pointer rounded-lg border p-sm hover:bg-gray-100"
        onClick={() => {
          connectSupporter(id);
        }}
      >
        <UserSelectedImageWrapper
          dbImageId={image.dbConnections.imageId}
          placeholderText="banner image"
        >
          {({ dbImageId }) => (
            <DbImageWrapper dbImageId={dbImageId}>
              {({ urls }) => <CustomisableImage urls={urls} />}
            </DbImageWrapper>
          )}
        </UserSelectedImageWrapper>
      </div>
    </WithTooltip>
  );
};

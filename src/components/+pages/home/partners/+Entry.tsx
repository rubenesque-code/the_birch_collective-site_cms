import React, { type ReactNode } from "react";
import { produce } from "immer";

import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import { ComponentMenu } from "~/components/menus";
import PartnersModal from "~/components/partners-modal/+Entry";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";

import { LandingCx, PartnerCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { useToast } from "~/hooks";
import type { MyDb } from "~/types/database";

const Partners = () => (
  <div className="group/partners">
    <Headings />
    <Entries />
  </div>
);

export default Partners;

const Headings = () => {
  const { partners } = UedCx.Pages.Landing.useData();

  const { partners: partnersAction } = UedCx.Pages.Landing.useAction();

  const { undoKey } = UedCx.Pages.Landing.useRevision();

  return (
    <div className="">
      <div className="overflow-x-auto text-center font-display text-6xl text-brandOrange">
        <TextInputForm
          localStateValue={partners.heading}
          onSubmit={partnersAction.heading}
          input={{
            placeholder: "Partners heading",
            styles: "font-bold tracking-wide text-center",
          }}
          tooltip="click to edit partners heading"
          key={undoKey}
        />
      </div>
      <div className="mt-3 text-center font-light xs:mt-4 xs:text-lg sm:mt-6 sm:text-xl lg:text-2xl">
        <TextAreaForm
          localStateValue={partners.subheading}
          textArea={{
            placeholder: " subheading",
            styles: "tracking-wide text-center",
          }}
          onSubmit={partnersAction.subheading}
          tooltip="Click to edit partners subheading"
          key={undoKey}
        />
      </div>
    </div>
  );
};

const Entries = () => {
  const {
    partners: { entries },
  } = UedCx.Pages.Landing.useData();

  const {
    store: { data: partners },
  } = UedCx.Partners.use();

  const {
    partners: { entries: entriesAction },
  } = UedCx.Pages.Landing.useAction();

  const entriesSorted = React.useMemo(() => {
    const sorted = produce(entries, (draft) => {
      draft.sort((entryA, entryB) => {
        const partnerA = partners.find(
          (partner) => partner.id === entryA.dbConnections.partnerId,
        );
        const partnerB = partners.find(
          (partner) => partner.id === entryB.dbConnections.partnerId,
        );

        if (!partnerA && !partnerB) {
          return 0;
        }
        if (!partnerA) {
          return -1;
        }
        if (!partnerB) {
          return 1;
        }
        return partnerA.index - partnerB.index;
      });
    });
    return sorted;
  }, [entries, partners]);

  const toast = useToast();

  return (
    <div className="mt-md">
      <CmsLayout.EditBar className="opacity-40 group-hover/testimonials:opacity-80 hover:!opacity-100">
        <PartnersModal
          button={({ openModal }) => (
            <div
              className="my-btn my-btn-neutral flex cursor-pointer items-center gap-xs rounded-sm border-transparent"
              onClick={openModal}
            >
              <span className="text-gray-400">
                <Icon.Configure />
              </span>
              <span className="">Edit partners</span>
            </div>
          )}
          connectPartner={(partnerId) => {
            entriesAction.add({ dbConnections: { partnerId } });
            toast.neutral("added partner to landing");
          }}
          usedPartnerIds={entries.map((entry) => entry.dbConnections.partnerId)}
        />
      </CmsLayout.EditBar>

      {!entries.length ? (
        <div className="mt-md text-gray-800">
          No partners added to landing page yet.
        </div>
      ) : (
        <div className="mt-lg grid grid-cols-4 gap-lg">
          {entriesSorted.map((partner) => (
            <LandingCx.Partner.Provider partner={partner} key={partner.id}>
              <ConnectPartner>
                {({ connectedPartner }) => (
                  <PartnerCx.Provider partner={connectedPartner}>
                    <Partner />
                  </PartnerCx.Provider>
                )}
              </ConnectPartner>
            </LandingCx.Partner.Provider>
          ))}
        </div>
      )}
    </div>
  );
};

const ConnectPartner = ({
  children,
}: {
  children: (arg0: { connectedPartner: MyDb["partner"] }) => ReactNode;
}) => {
  const landingPartner = LandingCx.Partner.use();

  const {
    store: { data: partners },
  } = UedCx.Partners.use();

  const queriedPartner = partners.find(
    (partner) => partner.id === landingPartner.dbConnections.partnerId,
  );

  if (!queriedPartner) {
    return <UnfoundPartner />;
  }

  return children({ connectedPartner: queriedPartner });
};

const UnfoundPartner = () => (
  <div className="group/partner relative flex aspect-video flex-col items-center overflow-x-auto rounded-md border-2 border-my-alert-content bg-gray-50 p-sm">
    <PartnerMenu />
    <div className="text-5xl text-gray-500">
      <Icon.Partner weight="light" />
    </div>
    <div className="mt-4 text-center text-my-alert-content">
      <p className="mt-1">Error - can&apos;t find partner.</p>
    </div>
    <div className="mt-4 max-w-[400px] text-center text-gray-500">
      A partner was added to the landing page that can&apos;t be found. It may
      have been deleted.
    </div>
  </div>
);

const Partner = () => {
  const { image } = PartnerCx.use();

  return (
    <div className="group/partner relative">
      <PartnerMenu />
      <div className="relative aspect-video">
        <UserSelectedImageWrapper
          dbImageId={image.dbConnections.imageId}
          placeholderText="partner image"
        >
          {({ dbImageId }) => (
            <ConnectImage connectedImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage urls={urls} objectFit="contain" />
              )}
            </ConnectImage>
          )}
        </UserSelectedImageWrapper>
      </div>
    </div>
  );
};

const PartnerMenu = () => {
  const {
    partners: {
      entries: { remove },
    },
  } = UedCx.Pages.Landing.useAction();

  const { id } = LandingCx.Partner.use();

  const toast = useToast();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/partner:opacity-40">
      <ComponentMenu.Button
        onClick={() => {
          remove({ id });

          toast.neutral("partner removed from landing");
        }}
        tooltip="remove partner from landing"
        styles={{ button: "hover:text-my-alert-content hover:bg-my-alert" }}
      >
        <Icon.Remove weight="bold" />
      </ComponentMenu.Button>
    </ComponentMenu>
  );
};

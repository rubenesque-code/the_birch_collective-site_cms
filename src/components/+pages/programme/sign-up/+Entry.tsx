import React, { type ReactElement } from "react";
import { Popover } from "@headlessui/react";

import EmailNotificationModal from "~/components/email-notification-modal/+Entry";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { GoogleDocDownloadLinkInstructionsModal } from "~/components/google-doc-download-instructions-modal";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";
import ModalLayout from "~/components/layouts/Modal";
import { WithTooltip } from "~/components/WithTooltip";

import { UedCx } from "~/context/user-editable-data";

const SignUp = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const {
    store: {
      data: { signUp },
      actions: { signUp: signUpAction },
    },
    revision: { undoKey },
  } = UedCx.Programme.use();

  return (
    <div className="group/sign-up">
      <CmsLayout.EditBar
        className={`${
          !modalIsOpen
            ? "opacity-40 group-hover/sign-up:opacity-80 hover:!opacity-100"
            : "opacity-100"
        } `}
      >
        {signUp.type === "online-form" ? (
          <EmailNotificationModal
            button={({ openModal }) => (
              <CmsLayout.EditBar.Button
                icon={<Icon.EmailNotify />}
                text="Email"
                onClick={openModal}
                tooltip="Edit notified emails on sign up"
              />
            )}
            currentEmails={signUp.notifyEmails}
            onRemove={signUpAction.notifyEmails.remove}
            onSelect={signUpAction.notifyEmails.add}
          />
        ) : (
          <GoogleDocDownloadLinkInstructionsModal
            button={
              <CmsLayout.EditBar.Button
                icon={<Icon.Info />}
                text="Create Link Instructions"
                tooltip="How to create a download link from Google Docs"
              />
            }
            onClose={() => setModalIsOpen(false)}
            onOpen={() => setModalIsOpen(true)}
          />
        )}

        <CmsLayout.EditBar.Button
          icon={<Icon.Update />}
          text={
            signUp.type === "online-form"
              ? "change to download sheet"
              : "change to online sign-up form"
          }
          onClick={() =>
            signUpAction.type(
              signUp.type === "download-sheet"
                ? "online-form"
                : "download-sheet",
            )
          }
        />
      </CmsLayout.EditBar>

      <div className="overflow-x-auto text-center font-display text-5xl text-brandLightOrange">
        <TextInputForm
          localStateValue={signUp.heading}
          input={{
            placeholder: "Sign up heading",
            styles: "text-center tracking-wider font-bold",
          }}
          onSubmit={signUpAction.heading}
          tooltip="Click to edit sign up heading"
          key={undoKey}
        />
      </div>

      <div className="custom-prose prose mt-xs w-full max-w-full text-center">
        <TextAreaForm
          localStateValue={signUp.text}
          textArea={{
            placeholder: "Sign up text",
            styles: "text-center",
          }}
          onSubmit={signUpAction.text}
          tooltip="Click to edit tickets text"
          key={undoKey}
        />
      </div>

      {signUp.type === "online-form" ? <FormButton /> : <DownloadButton />}
    </div>
  );
};

export default SignUp;

const FormButton = () => {
  const {
    store: {
      data: { signUp },
      actions: { signUp: signUpAction },
    },
    revision: { undoKey },
  } = UedCx.Programme.use();

  return (
    <div className="mt-lg flex justify-center">
      <div className="flex  items-center gap-xs rounded-lg bg-orange px-sm py-xs font-display text-2xl text-white">
        <div>
          <Icon.SignUp />
        </div>

        <div className="overflow-x-auto">
          <TextInputForm
            localStateValue={signUp.buttonText}
            input={{
              placeholder: "Sign up form button text",
              styles: "tracking-wide font-bold",
            }}
            onSubmit={signUpAction.buttonText}
            tooltip="Click to edit sign up form button text"
            key={undoKey}
          />
        </div>
      </div>
    </div>
  );
};

const DownloadButton = () => {
  const {
    store: {
      data: { signUp },
      actions: { signUp: signUpAction },
    },
    revision: { undoKey },
  } = UedCx.Programme.use();

  return (
    <div className="mt-lg flex justify-center">
      <div className="flex  items-center gap-xs rounded-lg bg-orange px-sm py-xs">
        <DocLinkButtonLinkModal
          button={
            <WithTooltip text="Click to edit the download link">
              <span className="grid place-items-center text-2xl text-white">
                <Icon.Download />
              </span>
            </WithTooltip>
          }
        />

        <div className="overflow-x-auto font-display text-2xl text-white">
          <TextInputForm
            localStateValue={signUp.buttonText}
            input={{
              placeholder: "Sign up form button text",
              styles: "tracking-wide font-bold",
            }}
            onSubmit={signUpAction.buttonText}
            tooltip="Click to edit sign up form button text"
            key={undoKey}
          />
        </div>
      </div>
    </div>
  );
};

const DocLinkButtonLinkModal = ({ button }: { button: ReactElement }) => {
  const {
    store: {
      actions: { signUp: signUpAction },
      data: { signUp },
    },
    revision: { undoKey },
  } = UedCx.Programme.use();

  return (
    <Popover className="relative z-20 grid place-items-center">
      <Popover.Button>{button}</Popover.Button>

      <Popover.Panel
        className={`absolute -top-md left-0 w-[500px] -translate-y-full rounded-xl bg-white p-lg shadow-xl`}
      >
        <ModalLayout.Standard.Header>
          <ModalLayout.Standard.Header.Title>
            Edit link
          </ModalLayout.Standard.Header.Title>
          <ModalLayout.Standard.Header.Info>
            Paste in download link to document
          </ModalLayout.Standard.Header.Info>
        </ModalLayout.Standard.Header>
        <div className="mt-md overflow-x-auto">
          <TextInputForm
            localStateValue={signUp.downloadLink || ""}
            input={{
              placeholder: "Enter doc link",
            }}
            onSubmit={(updatedValue) => signUpAction.downloadLink(updatedValue)}
            tooltip="Click to edit download link"
            key={undoKey}
          />
        </div>
      </Popover.Panel>
    </Popover>
  );
};

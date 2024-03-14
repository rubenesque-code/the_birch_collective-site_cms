import React, { type ReactElement } from "react";
import { Popover } from "@headlessui/react";

import EmailNotificationModal from "~/components/email-notification-modal/+Entry";
import { TextAreaForm, TextInputForm } from "~/components/forms";
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
          /*           <DocLinkButtonLinkModal
            button={
              <CmsLayout.EditBar.Button
                icon={<Icon.Download />}
                text="Download link"
                tooltip="Click to edit the download link"
              />
            }
          /> */
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

const GoogleDocDownloadLinkInstructionsModal = ({
  button,
  onClose,
  onOpen,
}: {
  button: ReactElement;
  onOpen?: () => void;
  onClose?: () => void;
}) => {
  return (
    <Popover className="relative z-20 grid place-items-center">
      {({ open }) => (
        <>
          <OnModalOpen onClose={onClose} onOpen={onOpen} open={open} />

          <Popover.Button>{button}</Popover.Button>

          <Popover.Panel
            className={`absolute -top-md left-0 w-[700px] -translate-y-full rounded-xl bg-white p-lg shadow-xl`}
          >
            <ModalLayout.Standard.Header>
              <ModalLayout.Standard.Header.Title>
                Google Doc Download Link Instructions
              </ModalLayout.Standard.Header.Title>
            </ModalLayout.Standard.Header>

            <div className="mt-md flex flex-col gap-md overflow-x-auto">
              <div>
                <p className="flex gap-xs">
                  <span>1.</span>
                  <b>Share the Document</b>
                </p>
                <p>
                  First, you need to make sure the Google Doc is shared so that
                  others can access it. Click the &apos;Share&apos; button in
                  the top-right corner of the Google Doc.
                </p>
              </div>

              <div>
                <p className="flex gap-xs">
                  <span>2.</span>
                  <b>Adjust Sharing Settings</b>
                </p>
                <p>
                  In the sharing settings, make sure that &apos;Anyone with the
                  link&apos; has &apos;View&apos; access. This will allow anyone
                  with the link to view the document.
                </p>
              </div>

              <div>
                <p className="flex gap-xs">
                  <span>3.</span>
                  <b>Get the Shareable Link</b>
                </p>
                <p>
                  Once you&apos;ve adjusted the sharing settings, you can copy
                  the shareable link provided. It should look something like
                  &nbsp;
                  <i>
                    https://docs.google.com/document/d/your_document_id/edit
                  </i>
                  .
                </p>
              </div>

              <div>
                <p className="flex gap-xs">
                  <span>4.</span>
                  <b>Convert to Downloadable Link</b>
                </p>
                <p>
                  To make it downloadable, you need to change the sharing link
                  slightly. Instead of /edit at the end, you&apos;ll replace it
                  with <i>/export?format=pdf</i> if you want to provide the
                  document as a PDF file. If you want another format, you can
                  replace pdf with docx, rtf, txt, etc. So, the modified link
                  will look like &nbsp;
                  <i>
                    https://docs.google.com/document/d/your_document_id/export?format=pdf
                  </i>
                  .
                </p>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

const OnModalOpen = ({
  open,
  onClose,
  onOpen,
}: {
  open: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}) => {
  React.useEffect(() => {
    if (open && onOpen) {
      onOpen();
    } else if (!open && onClose) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return null;
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

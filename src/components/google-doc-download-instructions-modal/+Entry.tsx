import React, { type ReactElement } from "react";
import { Popover } from "@headlessui/react";

import ModalLayout from "~/components/layouts/Modal";

const GoogleDocDownloadLinkInstructionsModal = ({
  button,
  onClose,
  onOpen,
  position,
}: {
  button: ReactElement;
  onOpen?: () => void;
  onClose?: () => void;
  position?: "left" | "right";
}) => {
  return (
    <Popover className="relative z-20 grid place-items-center">
      {({ open }) => (
        <>
          <OnModalOpen onClose={onClose} onOpen={onOpen} open={open} />

          <Popover.Button>{button}</Popover.Button>

          <Popover.Panel
            className={`absolute -top-md w-[700px] -translate-y-full rounded-xl bg-white p-lg shadow-xl ${
              position === "right" ? "right-0" : "left-0 "
            }`}
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

export default GoogleDocDownloadLinkInstructionsModal;

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

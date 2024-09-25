import type { ReactElement } from "react";

import ModalLayout from "~/components/layouts/Modal";
import { Modal } from "~/components/styled-bases";
import { WithTooltip } from "~/components/WithTooltip";

import { Icon } from "../icons";

import { strArrayDivergence } from "~/helpers/query-arr";

type Props = {
  currentEmails: string[];
  onSelect: (email: string) => void;
  onRemove: (email: string) => void;
  button: (arg0: { openModal: () => void }) => ReactElement;
};

const allEmails = [
  "amy@thebirchcollective.co.uk",
  "ro@thebirchcollective.co.uk",
  "tim@thebirchcollective.co.uk",
  "james@thebirchcollective.co.uk",
];

const EmailNotificationModal = ({
  button,
  currentEmails,
  onSelect,
  onRemove,
}: Props) => (
  <Modal.WithVisibilityProvider
    button={button}
    panelContent={
      <ModalLayout.Standard
        body={
          <div className="pb-lg">
            <h3 className="border-b pb-sm">Notified emails</h3>

            {!currentEmails.length ? (
              <p className="mt-sm italic text-gray-400">None added yet</p>
            ) : (
              <div className="mt-sm flex flex-col items-start gap-sm">
                {currentEmails.map((email) => (
                  <Email
                    email={email}
                    onClick={() => onRemove(email)}
                    isInUse
                    key={email}
                  />
                ))}
              </div>
            )}

            <h3 className="mt-lg border-b pb-sm">Add emails</h3>

            {!strArrayDivergence(allEmails, currentEmails).length ? (
              <p className="mt-sm italic text-gray-400">None to add</p>
            ) : (
              <div className="mt-sm flex flex-col items-start gap-sm">
                {strArrayDivergence(allEmails, currentEmails).map((email) => (
                  <Email
                    email={email}
                    onClick={() => onSelect(email)}
                    key={email}
                  />
                ))}
              </div>
            )}
          </div>
        }
        showCloseSection={false}
        styles={{ outerWrapper: "h-auto w-auto" }}
      />
    }
  />
);

export default EmailNotificationModal;

const Email = ({
  email,
  onClick,
  isInUse,
}: {
  onClick?: () => void;
  email: string;
  isInUse?: boolean;
}) => (
  <WithTooltip text={isInUse ? "remove" : "add"}>
    <div
      className={`flex cursor-pointer items-center gap-sm rounded-md px-sm py-xs text-gray-700 transition-all ease-in-out hover:bg-gray-100 ${
        !isInUse ? "hover:text-blue-400" : "hover:text-red-400"
      }`}
      onClick={onClick}
    >
      <span className="text-gray-400">
        <Icon.EmailNotify />
      </span>
      <span className="">{email}</span>
    </div>
  </WithTooltip>
);

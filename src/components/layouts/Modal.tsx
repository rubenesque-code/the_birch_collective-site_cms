import type { ReactElement, ReactNode } from "react";

import { Icon } from "../icons";

function ModalLayout() {
  throw new Error(
    "ModalLayout exists for naming purposes only and should not be used as a component",
  );
}

export default ModalLayout;

const Standard = ({
  createEntityModal,
  body,
  title,
  closeModal,
  styles,
  header,
  showCloseSection = true,
}: {
  createEntityModal?: ReactElement;
  body: ReactElement;
  title?: string;
  closeModal?: () => void;
  styles?: {
    outerWrapper?: string;
  };
  header?: ReactElement;
  showCloseSection?: boolean;
}) => (
  <div
    className={`relative flex h-[1200px] max-h-[70vh] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl ${
      styles?.outerWrapper || ""
    }`}
  >
    {title ? (
      <div className="border-b border-b-gray-200 pb-sm">
        <h3 className="leading-6">{title}</h3>
      </div>
    ) : null}
    {header ? header : null}
    {createEntityModal ? (
      <div className="mt-sm">{createEntityModal}</div>
    ) : null}
    <div className="mt-sm flex-grow overflow-y-auto">{body}</div>
    {showCloseSection ? (
      <div className="mt-xl">
        <button
          className="my-btn my-btn-neutral"
          type="button"
          onClick={closeModal}
        >
          close
        </button>
      </div>
    ) : null}
  </div>
);

ModalLayout.Standard = Standard;

const Header = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
    {children}
  </div>
);

Standard.Header = Header;

const HeaderTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="leading-6">{children}</h3>
);

const HeaderInfo = ({ children }: { children: ReactNode }) => (
  <h5 className="flex items-center gap-xs text-sm text-gray-500">
    <span className="text-gray-400">
      <Icon.Info />
    </span>
    {children}
  </h5>
);

Header.Title = HeaderTitle;
Header.Info = HeaderInfo;

import type { ReactElement, ReactNode } from "react";

import { Icon } from "../icons";
import { WithTooltip } from "../WithTooltip";

function CmsLayout() {
  throw new Error(
    "CmsLayout exists for naming purposes only and should not be used as a component",
  );
}

export default CmsLayout;

const Page = ({ children }: { children: ReactNode }) => (
  <div className="flex h-screen w-screen flex-col overflow-hidden">
    {children}
  </div>
);

CmsLayout.Page = Page;

const Body = ({
  children,
  styles,
}: {
  children: ReactNode;
  styles?: {
    outer?: string;
    inner?: string;
  };
}) => (
  <div
    className={`grid h-full flex-grow place-items-center overflow-y-auto overflow-x-hidden bg-gray-100 scrollbar-thin
  ${styles?.outer || ""}`}
  >
    <div
      className={`div w-screen max-w-[1200px] p-sm pr-md
       ${styles?.inner || ""}`}
    >
      {children}
    </div>
  </div>
);

CmsLayout.Body = Body;

const EditBar = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-center justify-between rounded-md border border-dashed px-4 py-2 transition-opacity duration-100 ease-in-out  ${
      className || ""
    }`}
  >
    {children}
  </div>
);

CmsLayout.EditBar = EditBar;

const EditBarInfo = ({
  infoText,
  gap = "sm",
}: {
  infoText: string;
  gap?: "sm" | "xs";
}) => (
  <div
    className={`flex items-center text-sm text-gray-400 ${
      gap === "xs" ? "gap-xs" : "gap-sm"
    }`}
  >
    <span>
      <Icon.Info />
    </span>
    <p>{infoText}</p>
  </div>
);

EditBar.Info = EditBarInfo;

const EditBarButton = ({
  icon,
  onClick,
  text,
  tooltip,
}: {
  onClick?: () => void;
  icon: ReactElement;
  text: string;
  tooltip?: string;
}) => (
  <WithTooltip text={tooltip || ""} isDisabled={!tooltip}>
    <div
      className="my-btn my-btn-neutral flex cursor-pointer items-center gap-xs rounded-sm border-transparent"
      onClick={onClick}
    >
      <span className="text-gray-400">{icon}</span>
      <span className="">{text}</span>
    </div>
  </WithTooltip>
);

EditBar.Button = EditBarButton;

const EditBarEditButton = ({
  buttonText,
  onClick,
  tooltip,
}: {
  buttonText: string;
  onClick: () => void;
  tooltip?: string;
}) => (
  <EditBarButton
    icon={<Icon.Configure />}
    onClick={onClick}
    text={buttonText}
    tooltip={tooltip}
  />
);

EditBarButton.Edit = EditBarEditButton;

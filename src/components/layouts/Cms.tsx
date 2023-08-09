import type { ReactElement, ReactNode } from "react";

import { Icon } from "../icons";
import { WithTooltip } from "../WithTooltip";

function CmsLayout() {
  throw new Error(
    "CmsLayout exists for naming purposes only and should not be used as a component",
  );
}

export default CmsLayout;

const Body = ({ children }: { children: ReactNode }) => (
  <div className="flex h-screen w-screen flex-col overflow-hidden">
    {children}
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
}: {
  buttonText: string;
  onClick: () => void;
}) => (
  <EditBarButton
    icon={<Icon.Configure />}
    onClick={onClick}
    text={buttonText}
  />
);

EditBarButton.Edit = EditBarEditButton;

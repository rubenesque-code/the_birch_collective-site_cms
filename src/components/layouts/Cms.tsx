import type { ReactNode } from "react";

import { Icon } from "../icons";

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

const EditBar = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-between rounded-md border border-dashed px-4 py-2">
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

const EditBarEditButton = ({
  buttonText,
  onClick,
}: {
  buttonText: string;
  onClick: () => void;
}) => (
  <div
    className="my-btn my-btn-neutral flex cursor-pointer items-center gap-xs rounded-sm border-transparent"
    onClick={onClick}
  >
    <span className="text-gray-400">
      <Icon.Configure />
    </span>
    <span className="">{buttonText}</span>
  </div>
);

EditBar.Info = EditBarInfo;
EditBar.EditButton = EditBarEditButton;

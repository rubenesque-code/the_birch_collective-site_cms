import type { ReactNode } from "react";

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

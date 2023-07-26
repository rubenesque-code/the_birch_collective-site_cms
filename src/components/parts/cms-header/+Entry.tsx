import { MyMenu } from "~/components/styled-bases";
import { SideBarMenu } from "./SideBarMenu";
import { WithTooltip } from "~/components/WithTooltip";
import { Icon } from "~/components/icons";
import { RevisionButtons } from "./RevisionButtons";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";

const CmsHeader = (props: ContextApiCxProps) => (
  <ComponentApiCx.Provider {...props}>
    <div className="flex items-center justify-between border-b bg-gray-50 px-md py-sm">
      <SideBarMenu />
      <div className="flex items-center gap-2xl">
        <UserStatusMenu />
        <RevisionButtons />
      </div>
    </div>
  </ComponentApiCx.Provider>
);

export default CmsHeader;

const UserStatusMenu = () => (
  <div className="relative">
    <MyMenu
      button={<UserStatusButton />}
      styles={{ itemsWrapper: "absolute -bottom-1 right-0 translate-y-full" }}
    >
      <StatusMenuContent />
    </MyMenu>
  </div>
);

const UserStatusButton = () => (
  <WithTooltip text="user menu">
    <div className="cursor-pointer">
      <div className="text-blue-300">Admin</div>
    </div>
  </WithTooltip>
);

const StatusMenuContent = () => (
  <div className="bg-white p-6">
    <h3>Admin</h3>
    <div className="ml-[20px] mt-6 flex flex-col gap-4">
      <div className="flex cursor-pointer items-center gap-7 rounded-lg px-4 py-1 hover:bg-gray-100">
        <div className="text-2xl text-gray-400">
          <Icon.SignOut />
        </div>
        <div className="whitespace-nowrap text-sm font-light text-gray-500">
          Sign out
        </div>
      </div>
    </div>
  </div>
);

// import { signOut, useSession } from "next-auth/react";

import { MyMenu } from "~/components/styled-bases";
import { SideBarMenu } from "./SideBarMenu";
import { WithTooltip } from "~/components/WithTooltip";
import { Icon } from "~/components/icons";
import { Revision } from "./Revision";

const Header = () => (
  <div className="flex items-center justify-between border-b bg-gray-50 px-md py-sm">
    <SideBarMenu />
    <div className="flex items-center gap-2xl">
      <UserStatusMenu />
      {/* <DeployModal /> */}
      <Revision />
    </div>
  </div>
);

export default Header;

const UserStatusMenu = () => {
  /*   const { data } = useSession();

  if (!data) {
    return null;
  } */

  return (
    <div className="relative">
      <MyMenu
        button={<UserStatusButton />}
        styles={{ itemsWrapper: "absolute -bottom-1 right-0 translate-y-full" }}
      >
        <StatusMenuContent />
      </MyMenu>
    </div>
  );
};

const UserStatusButton = () => {
  // const { data } = useSession();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // const role = data!.user.role;

  return (
    <WithTooltip text="user menu">
      <div className="cursor-pointer">
        <div className="text-blue-400">Admin</div>
      </div>
    </WithTooltip>
  );
};

const StatusMenuContent = () => {
  return (
    <div className="bg-white p-6">
      <h3>Admin</h3>
      <div className="ml-[20px] mt-6 flex flex-col gap-4">
        <div
          className="flex cursor-pointer items-center gap-7 rounded-lg px-4 py-1 hover:bg-gray-100"
          // onClick={() => void signOut()}
        >
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
};

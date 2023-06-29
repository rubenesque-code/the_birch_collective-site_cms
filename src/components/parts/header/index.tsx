// import { signOut, useSession } from "next-auth/react";

import { MyMenu } from "~/components/styled-bases";
import { SideBarMenu } from "./SideBarMenu";
import { WithTooltip } from "~/components/WithTooltip";
import { Icon } from "~/components/icons";
import { SaveContext } from "./_state";

const Header = () => (
  <div className="flex items-center justify-between border-b bg-gray-50 px-md py-sm">
    <SideBarMenu />
    <div className="flex items-center gap-12">
      <StatusMenu />
      {/* <DeployModal /> */}
      <SaveUndoButtons />
    </div>
  </div>
);

export default Header;

const StatusMenu = () => {
  /*   const { data } = useSession();

  if (!data) {
    return null;
  } */

  return (
    <div className="relative">
      <MyMenu
        button={<StatusButton />}
        styles={{ itemsWrapper: "absolute -bottom-1 right-0 translate-y-full" }}
      >
        <StatusMenuContent />
      </MyMenu>
    </div>
  );
};

const StatusButton = () => {
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

const SaveUndoButtons = () => {
  const {
    actions: { save },
    data: { isChange },
  } = SaveContext.use();

  return (
    <div className="flex items-center gap-sm">
      <WithTooltip text={isChange ? "save" : "nothing to save"}>
        <button
          className={`relative text-2xl transition-colors ease-in-out ${
            !isChange
              ? "cursor-auto text-gray-200 hover:text-gray-300"
              : "cursor-pointer text-gray-400 hover:text-gray-500"
          }`}
          onClick={() => {
            if (!isChange) {
              return;
            }
            save();
          }}
          type="button"
        >
          <Icon.Save weight="light" />
          {isChange ? (
            <span
              className={`absolute -left-[1px] -top-[1px] h-[8px] w-[8px] rounded-full bg-green-active`}
            />
          ) : null}
        </button>
      </WithTooltip>
    </div>
  );
};

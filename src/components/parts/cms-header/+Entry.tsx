import { Icon } from "~/components/icons";
import { Modal, MyMenu } from "~/components/styled-bases";
import UnsavedWarningPanel from "~/components/UnsavedWarningPanel";
import { WithTooltip } from "~/components/WithTooltip";

import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import { RevisionButtons } from "./RevisionButtons";
import { SideBarMenu } from "./SideBarMenu";

import AuthCx from "~/context/AuthenticationContext";
import fbAuth from "~/my-firebase/auth";

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

const StatusMenuContent = () => {
  const {
    data: { isChange },
  } = ComponentApiCx.use();

  const { user } = AuthCx.use();

  return (
    <div className="rounded-md bg-white p-lg">
      <h3>Admin</h3>

      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion*/}
      <p className="mt-xxs text-sm text-gray-400">{user!.email}</p>

      <div className="ml-[20px] mt-lg flex flex-col gap-4">
        <Modal.WithVisibilityProvider
          button={({ openModal: openWarningModal }) => (
            <div
              className="group/button flex cursor-pointer items-center gap-7 rounded-lg px-4 py-1 transition-all duration-100 ease-in-out hover:bg-gray-100"
              onClick={() => {
                if (isChange) {
                  openWarningModal();
                  return;
                }

                void fbAuth.mutate.signOut();
              }}
            >
              <div className="text-2xl text-gray-400">
                <Icon.SignOut />
              </div>

              <div className="whitespace-nowrap text-sm font-light text-gray-500 transition-colors duration-100 ease-in-out group-hover/button:text-blue-400">
                Sign out
              </div>
            </div>
          )}
          panelContent={({ closeModal }) => (
            <UnsavedWarningPanel
              callback={() => void fbAuth.mutate.signOut()}
              closeModal={closeModal}
            />
          )}
        />
      </div>
    </div>
  );
};

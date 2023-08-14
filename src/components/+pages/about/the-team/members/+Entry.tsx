import React from "react";
import Accordion from "~/components/Accordion";
import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import CmsLayout from "~/components/layouts/Cms";
import { AboutCx } from "~/context/entities/about";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import MembersModal from "./members-modal/+Entry";

const Members = () => {
  const {
    store: {
      data: {
        theTeam: { members },
      },
    },
  } = UedCx.Pages.AboutUs.use();

  const sorted = React.useMemo(() => deepSortByIndex(members), [members]);

  return (
    <div>
      <CmsLayout.EditBar>
        <MembersModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.Button.Edit
              buttonText="Edit members"
              onClick={openModal}
            />
          )}
        />
        <CmsLayout.EditBar.Info
          infoText="Edit member fields from pop-up (left)"
          gap="xs"
        />
      </CmsLayout.EditBar>
      <div className="flex justify-center">
        <div className="mt-lg grid grid-cols-2 gap-lg">
          {sorted.map((member) => (
            <AboutCx.TeamMember.Provider teamMember={member} key={member.id}>
              <Member />
            </AboutCx.TeamMember.Provider>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;

const Member = () => {
  const { bio, image, name, role } = AboutCx.TeamMember.use();

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-[200px] rounded-full">
        <UserSelectedImageWrapper
          dbImageId={image.dbConnections.imageId}
          placeholderText="member image"
          isCircle
        >
          {({ dbImageId }) => (
            <ConnectImage dbImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage urls={urls} objectFit="cover" isCircle />
              )}
            </ConnectImage>
          )}
        </UserSelectedImageWrapper>
      </div>
      <div className="mt-md">
        <div
          className={`text-center text-xl ${
            name.length ? "text-brandGreen" : "text-gray-400"
          } `}
        >
          {name.length ? name : "role"}
        </div>
        <div
          className={`text-center text-lg ${
            role.length ? "text-brandBrown" : "text-gray-400"
          }`}
        >
          {role.length ? role : "role"}
        </div>
        <div className="mt-sm">
          <Accordion numLinesClamped={4}>
            <div className={`prose ${bio.length ? "" : "text-gray-400"}`}>
              {bio.length ? bio : "bio"}
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

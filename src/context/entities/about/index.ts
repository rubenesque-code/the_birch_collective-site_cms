import { TeamMemberCx } from "./TeamMemberCx";

function AboutCx() {
  throw new Error(
    "AboutCx exists for naming purposes only and should not be used as a component",
  );
}

export { AboutCx };

AboutCx.TeamMember = TeamMemberCx;

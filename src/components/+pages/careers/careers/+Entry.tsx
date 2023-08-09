import { TextInputForm } from "~/components/forms";
import { UedCx } from "~/context/user-editable-data";
import JobPosts from "./job-posts/+Entry";
import { Icon } from "~/components/icons";

const Careers = () => (
  <div>
    <Heading />
    <div className="mt-md">
      {/* <div className="w-1/2">
        <div className="border-b border-gray-300 pb-sm">
          <div className="font-medium">Volunteer Co-ordinator</div>
          <div className="mt-xs">
            <div className="flex items-center gap-xs text-gray-500">
              <span>
                <Icon.Date />
              </span>
              <div className="flex gap-xs">
                <span>closes, </span>
                <span>12 September 2023</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-sm">
          This a Full Remote job, the offer is available from: United Kingdom
          This offer from GitHub has been enriched by Jobgether and got a 84.75%
          flex score. GitHub has changed the way software is built, and we have
          a unique opportunity to look further ahead to identify how software
          development can be faster, safer, easier, and more accessible. We’re
          looking for talented, experienced polymaths to join us in this
          mission!
        </div>
        <div className="mt-md">
          <div className="text-gray-600">Download details and forms</div>
          <div className="mt-sm flex items-center gap-md ">
            <div className="flex cursor-pointer items-center gap-xs rounded-sm border border-blue-400 px-sm py-xxs transition-all duration-75 ease-in-out hover:bg-gray-100">
              <span className="text-blue-400">
                <Icon.Download />
              </span>
              <span className="text-gray-600">Job details</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  </div>
);

export default Careers;

const Heading = () => {
  const {
    store: {
      data: {
        careers: { heading },
      },
      actions: {
        careers: { heading: headingAction },
      },
    },
    revision: { undoKey },
  } = UedCx.Pages.Careers.use();

  return (
    <div className="font-display text-5xl  text-brandRed">
      <TextInputForm
        localStateValue={heading}
        onSubmit={headingAction}
        input={{
          placeholder: "Careers heading",
          styles: "font-bold tracking-wide",
        }}
        tooltip="Click to edit careers heading"
        key={undoKey}
      />
    </div>
  );
};

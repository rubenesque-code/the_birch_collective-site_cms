import { Icon } from "~/components/icons";
import { ComponentMenu } from "~/components/menus";
import Slides from "./slides/+Entry";
import { EditModal } from "./slides/edit/+Entry";

const Posters = () => (
  <div className="group/posters relative">
    <ComponentMenu styles="right-1 top-1 group-hover/posters:opacity-40">
      <EditModal
        button={({ openModal }) => (
          <ComponentMenu.Button tooltip="Edit posters" onClick={openModal}>
            <Icon.Configure />
          </ComponentMenu.Button>
        )}
      />
    </ComponentMenu>
    <div>
      <div className="relative ml-xl h-[400px] overflow-visible ">
        <Slides />
      </div>
    </div>
    <div className="text-right text-sm text-gray-500">flyers!</div>
  </div>
);

export default Posters;

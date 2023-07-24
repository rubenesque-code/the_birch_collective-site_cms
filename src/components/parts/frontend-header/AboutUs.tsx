import { Popover } from "@headlessui/react";
import { UserEditableDataCx } from "~/components/+pages/home/_state";
import { TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";

const AboutUs = () => {
  const { linkLabels } = UserEditableDataCx.useAllData();

  const { linkLabels: linkLabelAction } = UserEditableDataCx.useAction();

  return (
    <div className="flex items-center gap-xs">
      <div className="text-sm font-semibold uppercase tracking-wide lg:text-base xl:text-lg">
        <TextInputForm
          localStateValue={linkLabels.aboutUs}
          onSubmit={({ inputValue }) =>
            linkLabelAction.aboutUs.update(inputValue)
          }
          input={{
            placeholder: "About us menu button text",
            styles: "uppercase tracking-wide",
          }}
          tooltip="Click to edit text"
        />
      </div>
      <Popover className="relative">
        <Popover.Button>
          <div className="">
            <Icon.CaretDown />
          </div>
        </Popover.Button>

        <Popover.Panel className={`absolute right-0 bg-white p-lg shadow-lg`}>
          Hello
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default AboutUs;

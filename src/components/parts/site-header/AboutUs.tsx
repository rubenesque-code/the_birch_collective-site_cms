import { Popover } from "@headlessui/react";

import { WithTooltip } from "~/components/WithTooltip";
import { TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { UedCx } from "~/context/user-editable-data";

const AboutUs = () => {
  const linkLabels = UedCx.LinkLabels.useData();

  const linkLabelAction = UedCx.LinkLabels.useAction();

  return (
    <div className="flex items-center gap-xxs">
      <div className="max-w-[300px] overflow-x-auto text-sm font-semibold uppercase tracking-wide text-gray-700 lg:text-base xl:text-lg">
        <TextInputForm
          localStateValue={linkLabels.aboutUs}
          onSubmit={linkLabelAction.aboutUs}
          input={{
            placeholder: "About us link text",
            styles: "uppercase tracking-wide",
          }}
          tooltip="Click to edit about us link text"
        />
      </div>

      <Popover className="relative grid place-items-center">
        <Popover.Button>
          <WithTooltip text="open menu">
            <div className="rounded-full p-1 hover:bg-gray-100">
              <Icon.CaretDown />
            </div>
          </WithTooltip>
        </Popover.Button>

        <Popover.Panel
          className={`absolute bottom-0 left-0 z-30 -translate-x-1/2 translate-y-full rounded-sm border bg-white p-lg shadow-lg`}
        >
          <PanelContent />
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default AboutUs;

const PanelContent = () => {
  const header = UedCx.Header.useData();

  const headerAction = UedCx.Header.useAction();

  return (
    <div>
      <div className="font-display text-4xl font-bold tracking-wide text-displayGreen">
        <TextInputForm
          localStateValue={header.aboutUs.popover.heading}
          onSubmit={headerAction.aboutUs.popover.heading}
          input={{
            placeholder: "About us menu heading",
            styles: "tracking-wide",
          }}
          tooltip="Click to edit about us menu heading"
        />
      </div>
      <div className="mt-2 text-lg">
        <TextInputForm
          localStateValue={header.aboutUs.popover.subheading}
          onSubmit={headerAction.aboutUs.popover.subheading}
          input={{
            placeholder: "About us menu subheading",
          }}
          tooltip="Click to edit about us menu subheading"
        />
      </div>
      <PanelLinks />
    </div>
  );
};

const PanelLinks = () => {
  const linkLabels = UedCx.LinkLabels.useData();

  const linkLabelAction = UedCx.LinkLabels.useAction();

  return (
    <div className="mt-8 flex gap-xl">
      <div className="flex max-w-[300px] items-center gap-1 overflow-x-auto px-3 py-1">
        <div className="grid place-items-center text-lg text-displayGreen">
          <Icon.CaretRight weight="bold" />
        </div>
        <div className="text-lg uppercase tracking-wide">
          <TextInputForm
            localStateValue={linkLabels.aboutUs}
            onSubmit={linkLabelAction.aboutUs}
            input={{
              placeholder: "About us link text",
              styles: "tracking-wide uppercase",
            }}
            tooltip="Click to edit about us link text"
          />
        </div>
      </div>

      <div className="flex max-w-[300px] items-center gap-1 overflow-x-auto px-3 py-1">
        <div className="grid place-items-center text-lg text-displayGreen">
          <Icon.CaretRight weight="bold" />
        </div>
        <div className="text-lg uppercase tracking-wide">
          <TextInputForm
            localStateValue={linkLabels.meetTheTeam}
            onSubmit={linkLabelAction.meetTheTeam}
            input={{
              placeholder: "Meet the team link text",
              styles: "tracking-wide uppercase",
            }}
            tooltip="Click to edit meet the team link text"
          />
        </div>
      </div>

      <div className="flex max-w-[300px] items-center gap-1 overflow-x-auto px-3 py-1">
        <div className="grid place-items-center text-lg text-displayGreen">
          <Icon.CaretRight weight="bold" />
        </div>
        <div className="text-lg uppercase tracking-wide">
          <TextInputForm
            localStateValue={linkLabels.getInTouch}
            onSubmit={linkLabelAction.getInTouch}
            input={{
              placeholder: "Contact link text",
              styles: "tracking-wide uppercase",
            }}
            tooltip="Click to edit contact link text"
          />
        </div>
      </div>
    </div>
  );
};

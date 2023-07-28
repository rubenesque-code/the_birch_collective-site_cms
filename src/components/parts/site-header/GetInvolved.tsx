import { Popover } from "@headlessui/react";
import { UserEditableDataCx } from "~/components/+pages/home-old/_state";
import { WithTooltip } from "~/components/WithTooltip";
import { TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";

const GetInvolved = () => {
  const { linkLabels } = UserEditableDataCx.useAllData();

  const { linkLabels: linkLabelAction } = UserEditableDataCx.useAction();

  return (
    <div className="flex items-center gap-xxs">
      <div className="max-w-[300px] overflow-x-auto text-sm font-semibold uppercase tracking-wide text-gray-700 lg:text-base xl:text-lg">
        <TextInputForm
          localStateValue={linkLabels.getInvolved}
          onSubmit={linkLabelAction.getInvolved.update}
          input={{
            placeholder: "Get involved link text",
            styles: "uppercase tracking-wide",
          }}
          tooltip="Click to edit get involved link text"
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
          className={`absolute bottom-0 right-0 z-30 translate-y-full rounded-sm border bg-white p-lg shadow-lg`}
        >
          <PanelContent />
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default GetInvolved;

const PanelContent = () => {
  const { header } = UserEditableDataCx.useAllData();

  const { header: headerAction } = UserEditableDataCx.useAction();

  return (
    <div>
      <div className="font-display text-4xl font-bold tracking-wide text-displayGreen">
        <TextInputForm
          localStateValue={header.getInvolved.popover.heading}
          onSubmit={headerAction.getInvolved.popover.heading.update}
          input={{
            placeholder: "Get involved menu heading",
            styles: "tracking-wide",
          }}
          tooltip="Click to edit get involved menu heading"
        />
      </div>
      <div className="mt-2 text-lg">
        <TextInputForm
          localStateValue={header.getInvolved.popover.subheading}
          onSubmit={headerAction.getInvolved.popover.subheading.update}
          input={{
            placeholder: "Get involved menu subheading",
          }}
          tooltip="Click to edit get involved menu subheading"
        />
      </div>
      <PanelLinks />
    </div>
  );
};

const PanelLinks = () => {
  const { linkLabels } = UserEditableDataCx.useAllData();

  const { linkLabels: linkLabelAction } = UserEditableDataCx.useAction();

  return (
    <div className="mt-8 flex gap-xl">
      <div className="flex max-w-[300px] items-center gap-1 overflow-x-auto px-3 py-1">
        <div className="grid place-items-center text-lg text-displayGreen">
          <Icon.CaretRight weight="bold" />
        </div>
        <div className="text-lg uppercase tracking-wide">
          <TextInputForm
            localStateValue={linkLabels.donate}
            onSubmit={linkLabelAction.donate.update}
            input={{
              placeholder: "Donate link text",
              styles: "tracking-wide uppercase",
            }}
            tooltip="Click to edit donate link text"
          />
        </div>
      </div>

      <div className="flex max-w-[300px] items-center gap-1 overflow-x-auto px-3 py-1">
        <div className="grid place-items-center text-lg text-displayGreen">
          <Icon.CaretRight weight="bold" />
        </div>
        <div className="text-lg uppercase tracking-wide">
          <TextInputForm
            localStateValue={linkLabels.volunteer}
            onSubmit={linkLabelAction.volunteer.update}
            input={{
              placeholder: "Volunteer link text",
              styles: "tracking-wide uppercase",
            }}
            tooltip="Click to edit volunteer link text"
          />
        </div>
      </div>

      <div className="flex max-w-[300px] items-center gap-1 overflow-x-auto px-3 py-1">
        <div className="grid place-items-center text-lg text-displayGreen">
          <Icon.CaretRight weight="bold" />
        </div>
        <div className="text-lg uppercase tracking-wide">
          <TextInputForm
            localStateValue={linkLabels.careers}
            onSubmit={linkLabelAction.careers.update}
            input={{
              placeholder: "Careers link text",
              styles: "tracking-wide uppercase",
            }}
            tooltip="Click to edit careers link text"
          />
        </div>
      </div>
    </div>
  );
};

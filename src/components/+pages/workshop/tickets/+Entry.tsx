import { Popover } from "@headlessui/react";
import TextInputPopoverPanel from "~/components/TextInputPopoverPanel";
import { WithTooltip } from "~/components/WithTooltip";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import { UedCx } from "~/context/user-editable-data";

const Tickets = () => {
  const {
    store: {
      data: { tickets },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Workshop.use();

  return (
    <div className="">
      <div className="font-display text-3xl font-bold tracking-wider text-brandGreen">
        <TextInputForm
          localStateValue={tickets.heading}
          input={{
            placeholder: "Tickets heading",
          }}
          onSubmit={actions.tickets.heading}
          tooltip="Click to edit tickets heading"
          key={undoKey}
        />
      </div>

      <div className="custom-prose prose mt-sm w-full max-w-full">
        <TextAreaForm
          localStateValue={tickets.text}
          textArea={{
            placeholder: "Tickets text",
          }}
          onSubmit={actions.tickets.text}
          tooltip="Click to edit tickets text"
          key={undoKey}
        />
      </div>

      <div className="mt-md inline-flex cursor-pointer items-center gap-sm rounded-lg bg-brandGreen px-sm py-xs text-white">
        <TextInputForm
          localStateValue={tickets.signUpButton.text}
          input={{
            placeholder: "Tickets button link text",
          }}
          onSubmit={actions.tickets.signUpButton.text}
          tooltip="Click to edit tickets button link text"
          key={undoKey}
        />
        <TicketsLinkModal />
      </div>
    </div>
  );
};

export default Tickets;

const TicketsLinkModal = () => {
  const {
    store: {
      data: {
        tickets: { signUpButton },
      },
      actions,
    },
    revision: { undoKey },
  } = UedCx.Pages.Workshop.use();

  return (
    <Popover className="relative z-10 grid place-items-center">
      <Popover.Button>
        <WithTooltip text="Click to edit link">
          <span>
            <Icon.ExternalLink />
          </span>
        </WithTooltip>
      </Popover.Button>

      <Popover.Panel className={`absolute -top-xs left-0 -translate-y-full`}>
        <TextInputPopoverPanel
          input={
            <TextInputForm
              localStateValue={signUpButton.link}
              onSubmit={actions.signUpLink.link}
              input={{ placeholder: "Enter eventbrite link" }}
              tooltip="Click to update eventbrite link"
              key={undoKey}
            />
          }
          title="Workshop eventbrite link"
        />
      </Popover.Panel>
    </Popover>
  );
};

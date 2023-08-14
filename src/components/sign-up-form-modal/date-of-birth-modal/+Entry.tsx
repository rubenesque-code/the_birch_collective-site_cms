import { Popover } from "@headlessui/react";
import { WithTooltip } from "~/components/WithTooltip";
import Calendar from "~/components/Calendar";

import { formatDateDMYStr } from "~/helpers/date";
import { type ReactElement } from "react";

const DateOfBirthModal = ({
  date,
  onChange,
  placeholder = "date",
  button,
}: {
  date: Date | undefined | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  button: (arg0: { dateStr: string }) => ReactElement;
}) => {
  const dateStr = date ? formatDateDMYStr(date, "en") : placeholder;

  return (
    <Popover className="relative z-30">
      <WithTooltip text="click to select date">
        <Popover.Button>{button({ dateStr })}</Popover.Button>
      </WithTooltip>
      <Popover.Panel
        className={`absolute top-1/2 z-20 -translate-y-1/2 border bg-white shadow-lg`}
      >
        <div>
          <h3 className="mx-sm border-b pb-xs pt-sm">Select date of birth</h3>
          <Calendar date={date} onChange={onChange} />
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default DateOfBirthModal;

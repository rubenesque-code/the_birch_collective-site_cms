import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

import { Calendar as CalendarRaw } from "react-date-range";

const Calendar = ({
  date,
  onChange,
}: {
  date: Date | undefined | null;

  onChange: (date: Date) => void;
}) => (
  <CalendarRaw
    date={date || undefined}
    onChange={onChange}
    maxDate={new Date()}
  />
);

export default Calendar;

import { type ReactElement, useState } from "react";
import { Icon } from "./icons";

const Accordion = ({
  children,
  numLinesClamped,
}: {
  children: ReactElement | string;
  numLinesClamped: 1 | 2 | 3 | 4;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const lineClampToken =
    numLinesClamped === 1
      ? "line-clamp-1"
      : numLinesClamped === 2
      ? "line-clamp-2"
      : numLinesClamped === 3
      ? "line-clamp-3"
      : "line-clamp-4";

  return (
    <div className="flex flex-col gap-2">
      <div className={`${!isOpen ? lineClampToken : "line-clamp-none"}`}>
        {children}
      </div>
      <button
        className="ml-2 flex items-center gap-2 text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-light uppercase">
          {!isOpen ? "read more" : "show less"}
        </span>
        {!isOpen ? <Icon.CaretDown /> : <Icon.CaretUp />}
      </button>
    </div>
  );
};

export default Accordion;

import { DebounceInput } from "react-debounce-input";

import { Icon } from "./icons";
import { WithTooltip } from "./WithTooltip";

const inputId = "default-search";

export const SearchInput = ({
  placeholder = "Search",
  inputValue,
  setInputValue,
}: {
  placeholder?: string;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}) => (
  <>
    <label
      htmlFor={inputId}
      className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Search
    </label>

    <div className="relative w-full max-w-[500px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-sm text-gray-400">
        <Icon.Search />
      </div>

      <DebounceInput
        type="text"
        id={inputId}
        className="border-base-300 block w-full rounded-md border px-xs py-xs pl-xl text-sm text-gray-900 outline-none transition-colors focus-within:bg-gray-50"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          const value = e.target.value;
          setInputValue(value);
        }}
        autoComplete="off"
        debounceTimeout={500}
      />

      {inputValue.length ? (
        <WithTooltip text="clear input">
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-300 transition-all duration-75 ease-in-out hover:bg-gray-100 hover:text-gray-600"
            onClick={() => setInputValue("")}
            type="button"
          >
            <Icon.XCircle />
          </button>
        </WithTooltip>
      ) : null}
    </div>
  </>
);

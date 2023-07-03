import DOMPurify from "dompurify";
import { useRef, useState } from "react";
import { useMeasure } from "react-use";

import type { MyPick } from "~/types/utilities";
import { WithTooltip } from "../WithTooltip";

export const TextInputForm = (props: {
  initialValue: string | null;
  input: MyPick<
    InputProps,
    "autoFocus" | "minWidth" | "placeholder" | "styles"
  >;
  onSubmit: (arg0: { inputValue: string }) => void;
  tooltip?: string;
}) => {
  const [inputValue, setInputValue] = useState(props.initialValue || "");
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!inputValue.length) {
      return;
    }

    const clean = DOMPurify.sanitize(inputValue);

    props.onSubmit({
      inputValue: clean,
    });
  };

  return (
    <WithTooltip
      text={props.tooltip || ""}
      isDisabled={!props.tooltip?.length || inputIsFocused}
      placement="top"
    >
      <form
        className="relative inline-block max-w-full"
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
        onBlur={handleSubmit}
      >
        <div className="form-control">
          <Input
            isFocused={inputIsFocused}
            setIsFocused={setInputIsFocused}
            setValue={setInputValue}
            value={inputValue}
            {...props.input}
          />
        </div>
      </form>
    </WithTooltip>
  );
};

type InputProps = {
  autoFocus?: boolean;
  isFocused: boolean;
  minWidth?: number;
  placeholder?: string;
  setIsFocused: (value: boolean) => void;
  setValue: (value: string) => void;
  trailingSpace?: number;
  value: string;
  styles?: string;
};

const Input = ({
  autoFocus = false,
  isFocused,
  minWidth = 50,
  placeholder,
  setIsFocused,
  setValue,
  styles = "",
  trailingSpace = 20,
  value,
}: InputProps) => {
  const [isBlurredOnInitialRender, setIsBlurredOnInitialRender] =
    useState(false);

  const [dummyInputRef, { width: dummyInputWidth }] =
    useMeasure<HTMLParagraphElement>();

  const inputWidth = dummyInputWidth + (isFocused ? trailingSpace : 0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div
        className={`relative h-full rounded-sm transition-colors duration-75 ease-in-out focus-within:bg-gray-100`}
      >
        <p
          className={`invisible absolute whitespace-nowrap ${styles}`}
          ref={dummyInputRef}
        >
          {value.length ? value : placeholder}
        </p>
        <input
          className={`z-10 bg-transparent outline-none ${styles}`}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={placeholder}
          type="text"
          autoComplete="off"
          onFocus={(e) => {
            if (!autoFocus && !isBlurredOnInitialRender) {
              e.currentTarget.blur();
              setIsBlurredOnInitialRender(true);
            }

            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{
            width: inputWidth > minWidth ? inputWidth : minWidth,
          }}
          ref={inputRef}
        />
      </div>
    </>
  );
};

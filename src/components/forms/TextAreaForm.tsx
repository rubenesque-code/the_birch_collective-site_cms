import DOMPurify from "dompurify";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import type { MyPick } from "~/types/utilities";
import { WithTooltip } from "../WithTooltip";

export const TextAreaForm = (props: {
  localStateValue: string | null;
  input?: MyPick<
    TextAreaProps,
    "autoFocus" | "minWidth" | "placeholder" | "styles"
  >;
  onSubmit: (arg0: { inputValue: string }) => void;
  tooltip?: string;
}) => {
  const [inputValue, setInputValue] = useState(props.localStateValue || "");
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
        className="relative inline-block w-full max-w-full"
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
        onBlur={handleSubmit}
      >
        <div className="form-control">
          <TextArea
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

type TextAreaProps = {
  setIsFocused: (value: boolean) => void;
  setValue: (value: string) => void;
  value: string;
  autoFocus?: boolean;
  isFocused: boolean;
  minWidth?: number;
  placeholder?: string;
  trailingSpace?: number;
  styles?: string;
};

const TextArea = ({
  autoFocus = false,
  isFocused,
  placeholder = "write here",
  setIsFocused,
  setValue,
  styles = "",
  value,
}: TextAreaProps) => {
  const [isBlurredOnInitialRender, setIsBlurredOnInitialRender] =
    useState(false);

  return (
    <>
      <div
        className={`relative h-full w-full rounded-sm transition-colors duration-75 ease-in-out focus-within:bg-gray-100`}
      >
        <ReactTextareaAutosize
          className={`z-10 w-full resize-none bg-transparent outline-none ${styles} ${
            isFocused ? "pl-1 text-gray-800" : ""
          }`}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={placeholder}
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
        />
      </div>
    </>
  );
};

import DOMPurify from "dompurify";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import type { MyPick } from "~/types/utilities";
import { WithTooltip } from "../WithTooltip";

// todo: if have y overflow (it's set on parent of this component), tooltip follows position of top of this component which is overflowed so looks funny.

type Props = {
  localStateValue: string | null;
  textArea?: MyPick<TextAreaProps, "minWidth" | "placeholder" | "styles">;
  onSubmit: (inputValue: string) => void;
  tooltip?: string;
  submitOnBlur?: boolean;
};

export const TextAreaForm = (props: Props) => {
  return <ActualComponent {...props} />;
};

const ActualComponent = (props: Props) => {
  const [inputValue, setInputValue] = useState(props.localStateValue || "");
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!inputValue.length) {
      return;
    }

    const clean = DOMPurify.sanitize(inputValue);

    props.onSubmit(clean);
  };

  return (
    <form
      className="relative inline-block w-full max-w-full"
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
      }}
      onBlur={handleSubmit}
    >
      <WithTooltip
        text={props.tooltip || ""}
        isDisabled={!props.tooltip?.length || inputIsFocused}
        placement="top"
      >
        <div className="form-control">
          <TextArea
            isFocused={inputIsFocused}
            setIsFocused={setInputIsFocused}
            setValue={setInputValue}
            value={inputValue}
            {...props.textArea}
          />
        </div>
      </WithTooltip>
    </form>
  );
};

type TextAreaProps = {
  setIsFocused: (value: boolean) => void;
  setValue: (value: string) => void;
  value: string;
  isFocused: boolean;
  minWidth?: number;
  placeholder?: string;
  trailingSpace?: number;
  styles?: string;
  // autoFocus?: boolean;
};

const TextArea = ({
  isFocused,
  placeholder = "write here",
  setIsFocused,
  setValue,
  styles = "",
  value,
}: // autoFocus,
TextAreaProps) => {
  /*   const [isBlurredOnInitialRender, setIsBlurredOnInitialRender] =
    useState(false); */

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
          onFocus={() => {
            /*             if (!autoFocus && !isBlurredOnInitialRender) {
              // · handle unwanted autofocus (bug?)
              e.currentTarget.blur();
              setIsBlurredOnInitialRender(true);
              console.log("1");
            } */

            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          cols={2}
          autoComplete="off"
          autoFocus={false}
        />
      </div>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ReactElement, cloneElement } from "react";

import { createPortal } from "react-dom";
import { type Config, usePopperTooltip } from "react-popper-tooltip";

export type TooltipProps = {
  yOffset?: number;
  children: ReactElement;
  placement?: Config["placement"];
  text:
    | string
    | {
        header: string;
        body: string;
      };
  isDisabled?: boolean;
  type?: "info" | "action" | "extended-info";
};

export const WithTooltip = ({
  children,
  placement = "auto",
  text,
  isDisabled = false,
  yOffset = 10,
  type = "info",
}: TooltipProps) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ delayShow: 500, placement, offset: [0, yOffset] });

  const show = visible && !isDisabled;

  return (
    <>
      {cloneElement(children, {
        ...children.props,
        ref: setTriggerRef,
      })}
      {show
        ? createPortal(
            <div
              className={`z-50 whitespace-nowrap rounded-sm font-sans text-sm transition-opacity duration-75 ease-in-out ${
                !show ? "invisible opacity-0" : "visible opacity-100"
              }`}
              {...getTooltipProps()}
              ref={setTooltipRef}
            >
              {typeof text === "string" ? (
                <div
                  className={`px-2 py-0.5 ${
                    type === "extended-info"
                      ? "border-info text-info-content border"
                      : type === "action"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {text}
                </div>
              ) : (
                <div className="gap-xxs flex w-[30ch] flex-col whitespace-normal border border-gray-600 bg-[#fafafa] px-2 py-0.5 text-left text-gray-700">
                  <p className="font-medium capitalize">{text.header}</p>
                  <p className="text-gray-600">{text.body}</p>
                </div>
              )}
            </div>,
            document.body,
          )
        : null}
    </>
  );
};

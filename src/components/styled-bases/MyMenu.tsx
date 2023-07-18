import { type ReactNode, type ReactElement } from "react";

import { MyTransition } from "./MyTransition";
import { Menu } from "@headlessui/react";

export const MyMenu = ({
  button,
  children,
  styles,
}: {
  button:
    | ReactElement
    | ((arg0: { isOpen: boolean; close: () => void }) => ReactElement);
  children:
    | ReactNode
    | ((arg0: { isOpen: boolean; close: () => void }) => ReactNode);
  styles?: { buttonWrapper?: string; itemsWrapper?: string };
}) => (
  <Menu>
    {({ open: isOpen, close }) => (
      <>
        <Menu.Button className={styles?.buttonWrapper}>
          {typeof button === "function" ? button({ isOpen, close }) : button}
        </Menu.Button>
        <MyTransition.ScaleAndOpacity>
          <Menu.Items
            className={`absolute z-50  rounded-md bg-white shadow-xl focus:outline-none ${
              styles?.itemsWrapper || ""
            }`}
          >
            <div className="px-1 py-1">
              {typeof children === "function"
                ? children({ isOpen, close })
                : children}
            </div>
          </Menu.Items>
        </MyTransition.ScaleAndOpacity>
      </>
    )}
  </Menu>
);

MyMenu.Item = Menu.Item;

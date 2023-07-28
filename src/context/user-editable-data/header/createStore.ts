import { produce } from "immer";
import lodash from "lodash";
import * as z from "zustand";

import type {
  GetObjValue,
  ObjFieldsToStr,
  OmitObjArrProps,
} from "../_helpers/types";
import type { Store } from "./types";

// TODO: abstraction for delete (entity with index), order

export const createStore = (input: { initData: Store["data"] }) =>
  z.createStore<Store>((set) => {
    function nonArrAction<
      TKeyStr extends ObjFieldsToStr<OmitObjArrProps<Store["data"]>>,
    >(keys: TKeyStr) {
      return (newValue: GetObjValue<Store["data"], TKeyStr>) =>
        set(
          produce((store: Store) => {
            lodash.set(store.data, keys, newValue);
          }),
        );
    }

    return {
      data: input.initData,

      actions: {
        overWrite: (updatedData) =>
          set(
            produce((store: Store) => {
              store.data = updatedData;
            }),
          ),

        aboutUs: {
          popover: {
            heading: nonArrAction("aboutUs.popover.heading"),
            subheading: nonArrAction("aboutUs.popover.subheading"),
          },
        },
        getInvolved: {
          popover: {
            heading: nonArrAction("getInvolved.popover.heading"),
            subheading: nonArrAction("getInvolved.popover.subheading"),
          },
        },
      },
    };
  });

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

        aboutUs: nonArrAction("aboutUs"),
        careers: nonArrAction("careers"),
        donate: nonArrAction("donate"),
        getInTouch: nonArrAction("getInTouch"),
        getInvolved: nonArrAction("getInvolved"),
        meetTheTeam: nonArrAction("meetTheTeam"),
        programmes: nonArrAction("programmes"),
        volunteer: nonArrAction("volunteer"),
        workshops: nonArrAction("workshops"),
        testimonials: nonArrAction("testimonials"),
        theoryOfChange: nonArrAction("theoryOfChange"),
      },
    };
  });

import { produce } from "immer";
import lodash from "lodash";

// todo: should exclude id from below. Make explicitly about docs, i.e. {id: string}

export function compareUpdatedObjAndCreateNewByDiffVals<
  TObj extends Record<string, unknown>,
>(original: TObj, updated: TObj) {
  const newObj: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(original)) {
    const isEqual = lodash.isEqual(value, updated[key]);
    if (!isEqual) {
      newObj[key] = updated[key];
    }
  }

  return newObj as Partial<TObj>;
}

export function deepSortByIndex<TDoc extends { index: number }>(docs: TDoc[]) {
  return produce(docs, (draft) => draft.sort((a, b) => a.index - b.index));
}

import lodash from "lodash";
import { checkObjectHasField } from "~/helpers/queryObject";

// □ need to memoise?

/** returns ids of arr1 not in arr2 */
function arrayDivergenceByIds<TDoc extends { id: string }>(
  items1: TDoc[],
  items2: TDoc[],
) {
  const ids1 = items1.map((item) => item.id);
  const ids2 = items2.map((item) => item.id);

  const ids1NotInIds2 = ids1.filter((id1) => !ids2.includes(id1));

  return ids1NotInIds2;
}

/** returns items of arr1 not in arr2 */
function arrayDivergence<TDoc extends { id: string }>(
  items1: TDoc[],
  items2: TDoc[],
) {
  const ids1NotInIds2 = arrayDivergenceByIds(items1, items2);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return ids1NotInIds2.map((id1) => items1.find((item1) => item1.id === id1)!);
}
/** returns [item1, item2] */
function getArrayUnion<TDoc extends { id: string }>(
  items1: TDoc[],
  items2: TDoc[],
) {
  const ids1 = items1.map((item) => item.id);
  const ids2 = items2.map((item) => item.id);

  const idsInBoth = ids1.filter((id1) => ids2.includes(id1));

  const pairs = idsInBoth.map((id) => [
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    items1.find((item1) => item1.id === id)!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    items2.find((item2) => item2.id === id)!,
  ]) as unknown as [TDoc, TDoc][];

  return pairs;
}

function processUpdatedDoc<
  TDoc extends { id: string } & Record<string, unknown>,
>(input: { original: TDoc; updated: TDoc }) {
  const changedFields: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input.original)) {
    if (key === "id") {
      continue;
    }
    const updatedValue = input.updated[key];
    const isEqual = lodash.isEqual(value, updatedValue);
    if (isEqual) {
      continue;
    }
    changedFields[key] = updatedValue;
  }

  const isChange = checkObjectHasField(changedFields);
  if (!isChange) {
    return null;
  }

  const docWithChangedFields = {
    id: input.original.id,
    ...changedFields,
  };

  return docWithChangedFields;
}
function processUpdatedDocs<TDoc extends { id: string }>(
  pairs: [TDoc, TDoc][],
) {
  return pairs
    .map(([original, updated]) => processUpdatedDoc({ original, updated }))
    .flatMap((doc) => (doc ? doc : []));
}

export function useDocsSaveData<TDoc extends { id: string }>(input: {
  dbData: TDoc[];
  userEditedData: TDoc[];
}) {
  // new
  const created = arrayDivergence(input.userEditedData, input.dbData);

  const deleted = arrayDivergenceByIds(input.dbData, input.userEditedData);

  const persistedPairs = getArrayUnion(input.userEditedData, input.dbData);
  // map docs. return partial of each changed doc - fields that have changed + id.
  const updated = processUpdatedDocs(persistedPairs);

  return {
    saveData: {
      created,
      deleted,
      updated,
    },
    isChange: Boolean(created.length || deleted.length || updated.length),
  };
}

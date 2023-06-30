import { useMemo } from "react";
import { compareUpdatedObjAndCreateNewByDiffVals } from "~/helpers/data/process";
import { checkObjectHasField } from "~/helpers/queryObject";

export function useSaveData<TObj extends Record<string, unknown>>(input: {
  dbData: TObj;
  localData: TObj;
}) {
  const diff = useMemo(
    () =>
      compareUpdatedObjAndCreateNewByDiffVals(input.dbData, input.localData),
    [input.localData, input.dbData],
  );

  return { saveData: diff, isChange: checkObjectHasField(diff) };
}

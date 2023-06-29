import { useMemo } from "react";
import { compareUpdatedObjAndCreateNewByDiffVals } from "~/helpers/data/process";
import { checkObjectHasField } from "~/helpers/queryObject";

export function useSaveData<TObj extends Record<string, unknown>>(input: {
  initData: TObj;
  currData: TObj;
}) {
  const diff = useMemo(
    () =>
      compareUpdatedObjAndCreateNewByDiffVals(input.initData, input.currData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [input.currData],
  );

  return { saveData: diff, isChange: checkObjectHasField(diff) };
}

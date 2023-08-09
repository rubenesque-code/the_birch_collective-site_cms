import { useMemo } from "react";
import { compareUpdatedObjAndCreateNewByDiffVals } from "~/helpers/data/process";
import { checkObjectHasField } from "~/helpers/queryObject";

export function useDocRevisionData<
  TDoc extends Record<string, unknown>,
>(input: { dbData: TDoc; userEditedData: TDoc }) {
  const diff = useMemo(
    () =>
      compareUpdatedObjAndCreateNewByDiffVals(
        input.dbData,
        input.userEditedData,
      ),
    [input.userEditedData, input.dbData],
  );

  const isChange = checkObjectHasField(diff);

  return { saveData: isChange ? diff : null, isChange };
}

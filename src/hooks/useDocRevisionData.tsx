import { useEffect, useMemo, useState } from "react";
import { compareUpdatedObjAndCreateNewByDiffVals } from "~/helpers/data/process";
import { checkObjectHasField } from "~/helpers/queryObject";
import { generateUid } from "~/lib/external-packages-rename";

export function useDocRevisionData<
  TDoc extends Record<string, unknown>,
>(input: { dbData: TDoc; userEditedData: TDoc }) {
  const [changeKey, setChangeKey] = useState(generateUid());

  const diff = useMemo(
    () =>
      compareUpdatedObjAndCreateNewByDiffVals(
        input.dbData,
        input.userEditedData,
      ),
    [input.userEditedData, input.dbData],
  );

  const isChange = checkObjectHasField(diff);

  useEffect(() => {
    if (!isChange) {
      return;
    }
    setChangeKey(generateUid());
  }, [isChange]);

  return { saveData: diff, isChange, changeKey };
}

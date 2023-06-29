// logo, org name - not editable
// banner image + title needn't be movable
import { useMemo, type ReactElement } from "react";
import { useMutation, useQuery } from "react-query";

import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";
import BannerImage from "./BannerImage";
import OrgNameAndMotto from "./OrgNameAndMotto";
import { UserEditableDataStore } from "./_state";
import { useToast } from "~/hooks";
import { reactToast } from "~/components/react-toast";
import lodash from "lodash";

// □ need to have production values in env.local?
// □ abstraction for react-query onMutate, etc.
// □ could use zod in saving to db

// Todo: how to save

const HomePage = () => {
  return (
    <InitData>
      {(dbData) => (
        <UserEditableDataStore.Provider dbData={dbData}>
          <Save />
          <div className="min-h-screen">
            <BannerImage />
            <OrgNameAndMotto />
          </div>
        </UserEditableDataStore.Provider>
      )}
    </InitData>
  );
};

export default HomePage;

type DbData = MyDb["pages"]["landing"];

const InitData = ({
  children,
}: {
  children: (data: DbData) => ReactElement;
}) => {
  const query = useQuery("landing", myDb.pages.landing.fetch);

  if (!query.data) {
    return <div>Loading...</div>;
  }

  return children(query.data);
};

function myCompare<TObj extends Record<string, unknown>>(
  original: TObj,
  updated: TObj,
) {
  const newObj: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(original)) {
    const isEqual = lodash.isEqual(value, updated[key]);
    if (!isEqual) {
      newObj[key] = updated[key];
    }
  }

  return newObj as Partial<TObj>;
}

const Save = () => {
  const initData = UserEditableDataStore.useInitDbData();
  const currData = UserEditableDataStore.useAllData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const result = useMemo(() => myCompare(initData, currData), [currData]);

  const toast = useToast();

  const mutation = useMutation(
    (input: Parameters<typeof myDb.pages.landing.update>[0]) =>
      myDb.pages.landing.update(input),
  );

  return (
    <div>
      <button
        onClick={() =>
          toast.promise(() => mutation.mutateAsync(result), {
            pending: "saving",
            error: "save error",
            success: "saved",
          })
        }
      >
        SAVE
      </button>
    </div>
  );
};

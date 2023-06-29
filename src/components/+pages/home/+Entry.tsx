// logo, org name - not editable
// banner image + title needn't be movable
import { useMemo, type ReactElement } from "react";
import { useMutation, useQuery } from "react-query";
import lodash from "lodash";

import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";
import BannerImage from "./BannerImage";
import OrgNameAndMotto from "./OrgNameAndMotto";
import { UserEditableDataStore } from "./_state";
import { useToast } from "~/hooks";
import { PageDataFetch } from "~/components/PageDataFetch";
import { useSaveData } from "~/hooks/useSaveData";
import Header_ from "~/components/parts/header";
import { SaveContext } from "~/components/parts/header/_state";

// □ need to have production values in env.local?
// □ abstraction for react-query onMutate, etc.
// □ could use zod in saving to db

const HomePage = () => {
  return (
    <InitData>
      {(dbData) => (
        <UserEditableDataStore.Provider dbData={dbData}>
          <Header />
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

  if (query.isLoading) {
    return <PageDataFetch.Loading />;
  }

  if (query.isError || !query.data) {
    return <PageDataFetch.Error />;
  }

  return children(query.data);
};

const Header = () => {
  const initData = UserEditableDataStore.useInitDbData();
  const currData = UserEditableDataStore.useAllData();

  const { saveData, isChange } = useSaveData({ currData, initData });

  const toast = useToast();

  const saveMutation = useMutation(
    (input: Parameters<typeof myDb.pages.landing.update>[0]) =>
      myDb.pages.landing.update(input),
  );

  return (
    <SaveContext.Provider
      actions={{
        save: () =>
          toast.promise(() => saveMutation.mutateAsync(saveData), {
            pending: "saving",
            error: "save error",
            success: "saved",
          }),
        undo: () => console.log("UNDO"),
      }}
      data={{ isChange }}
    >
      <Header_ />
      <button
        onClick={() =>
          toast.promise(() => saveMutation.mutateAsync(saveData), {
            pending: "saving",
            error: "save error",
            success: "saved",
          })
        }
      >
        SAVE
      </button>
    </SaveContext.Provider>
  );
};

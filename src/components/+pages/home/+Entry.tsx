// logo, org name - not editable
// banner image + title needn't be movable
import { type ReactElement } from "react";
import { useMutation, useQuery } from "react-query";

import { PageDataFetch } from "~/components/PageDataFetch";
import Header_ from "~/components/parts/header";
import { SaveContext } from "~/components/parts/header/_state";
import { useToast } from "~/hooks";
import { useSaveData } from "~/hooks/useSaveData";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";
import BannerImage from "./BannerImage";
import OrgNameAndMotto from "./OrgNameAndMotto";
import { UserEditableData } from "./_state";
import { CurrentDbData } from "./_state/CurrentDbData";

// □ need to have production values in env.local?
// □ abstraction for react-query onMutate, onSuccess, etc.
// □ could use zod in saving to db

const HomePage = () => {
  return (
    <InitData>
      {(initDbData) => (
        <CurrentDbData.Provider initDbData={initDbData}>
          <UserEditableData.Provider initDbData={initDbData}>
            <Header />
            <div className="min-h-screen">
              <BannerImage />
              <OrgNameAndMotto />
            </div>
          </UserEditableData.Provider>
        </CurrentDbData.Provider>
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

// TODO: image upload and add to local state. Get to work with fetch first.

const Header = () => {
  const currentDbData = CurrentDbData.use();
  const localData = UserEditableData.useAllData();

  const { saveData, isChange } = useSaveData({
    dbData: currentDbData.data,
    localData,
  });

  const toast = useToast();

  const saveMutation = useMutation(
    (input: Parameters<typeof myDb.pages.landing.update>[0]) =>
      myDb.pages.landing.update(input),
  );

  const save = () => {
    if (!isChange) {
      return;
    }

    toast.promise(
      () =>
        saveMutation.mutateAsync(saveData, {
          onSuccess() {
            currentDbData.overwrite(localData);
          },
        }),
      {
        pending: "saving",
        error: "save error",
        success: "saved",
      },
    );
  };

  const userAction = UserEditableData.useAction();

  const undo = () => {
    if (!isChange) {
      return;
    }
    userAction.allData.overwrite(currentDbData.data);
  };

  return (
    <SaveContext.Provider
      actions={{
        save,
        undo,
      }}
      data={{ isChange }}
    >
      <Header_ />
    </SaveContext.Provider>
  );
};

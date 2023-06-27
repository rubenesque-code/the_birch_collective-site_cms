// logo, org name - not editable
// banner image + title needn't be movable
import { useEffect } from "react";
import { useQuery } from "react-query";
import { create as createStore } from "zustand";

import BannerImage from "./BannerImage";
import OrgNameAndMotto from "./OrgNameAndMotto";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

// □ need to have production values in env.local?

type LandingState = { landing: MyDb["pages"]["landing"] } | undefined;
type LandingActions = { populate: (dbData: LandingState) => void };
type LandingStore = { state: LandingState; actions: LandingActions };

const useLandingStore = createStore<LandingStore>()((set) => ({
  state: undefined,
  actions: {
    populate(dbData) {
      set({ state: dbData });
    },
  },
}));

const useData = () => {
  const query = useQuery("landing", myDb.pages.landing.fetch);

  const landingStore = useLandingStore();

  useEffect(() => {
    if (query.isFetched && query.data) {
      landingStore.actions.populate({ landing: query.data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isLoading]);
};

const HomePage = () => {
  useData();

  const landingData = useLandingStore((state) => state.state);

  return (
    <div>
      <BannerImage />
      <OrgNameAndMotto />
      {JSON.stringify(landingData)}
    </div>
  );
};

export default HomePage;

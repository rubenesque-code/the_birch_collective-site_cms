// logo, org name - not editable
// banner image + title needn't be movable
import { type ReactElement } from "react";
import { useQuery } from "react-query";

import { PageDataFetch } from "~/components/PageDataFetch";
import Header from "~/components/parts/header";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";
import BannerImage from "./BannerImage";
import OrgHeadings from "./OrgHeadings";
import { UserEditableData } from "./_state";
import { CurrentDbData } from "./_state/CurrentDbData";
import { RevisionContext } from "./_state/RevisionContext";
import { TestimonialSlides } from "./testimonial-slides";

// □ need to have production values in env.local?
// □ abstraction for react-query onMutate, onSuccess, etc.
// □ could use zod in saving to db
// □ image blur up works?
// □ change image x pos working?

// □ sort out x overflow. also, max w for inputs
// □ banner image info widget
// □ save context is correct? Should be in header?

const HomePage = () => {
  return (
    <InitData>
      {(initDbData) => (
        <CurrentDbData.Provider initDbData={initDbData}>
          <UserEditableData.Provider initDbData={initDbData}>
            <RevisionContext.Provider>
              {({ actions, data }) => (
                <>
                  <Header
                    actions={actions}
                    data={{ isChange: data.isChange }}
                  />
                  <div className="min-h-screen w-screen overflow-hidden">
                    <BannerImage />
                    <OrgHeadings />
                    <TestimonialSlides />
                  </div>
                </>
              )}
            </RevisionContext.Provider>
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

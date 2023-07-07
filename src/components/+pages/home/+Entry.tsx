// logo, org name - not editable
// banner image + title needn't be movable
import { type ReactElement } from "react";
import { useQuery } from "react-query";

import { PageDataFetch } from "~/components/PageDataFetch";
import Header from "~/components/parts/header";
import { myDb } from "~/my-firebase/firestore";
import BannerImage from "./BannerImage";
import OrgHeadings from "./OrgHeadings";
import { UserEditableDataCx, type UserEditableDbData } from "./_state";
import { RevisionContext } from "./_state/RevisionContext";
import { TestimonialSlides } from "./testimonial-slides";

// □ need to have production values in env.local?
// □ abstraction for react-query onMutate, onSuccess, etc.
// □ could use zod in saving to db
// □ image blur up works?
// □ should be able to work out by aspect ratio of image container and aspect ratio of image natural dimensions whether can move up/down and/or left/right

// □ sort out x overflow. also, max w for inputs
// □ banner image info widget
// □ save context is correct? Should be in header?
// □ scrollbar needn't go up to header
// □ UserEditableDataCx should be renamed - have other editable Cx e.g. new testimonial. Rename to e.g. page editable cx

const HomePage = () => {
  return (
    <InitData>
      {(initDbData) => (
        <UserEditableDataCx.Provider initDbData={initDbData}>
          <RevisionContext.Provider initDbData={initDbData}>
            {({ actions, data }) => (
              <>
                <Header actions={actions} data={{ isChange: data.isChange }} />
                <div className="min-h-screen w-screen overflow-hidden">
                  <BannerImage />
                  <OrgHeadings />
                  <TestimonialSlides />
                </div>
              </>
            )}
          </RevisionContext.Provider>
        </UserEditableDataCx.Provider>
      )}
    </InitData>
  );
};

export default HomePage;

const InitData = ({
  children,
}: {
  children: (data: UserEditableDbData) => ReactElement;
}) => {
  const landingQuery = useQuery("landing", myDb.pages.landing.fetch);
  const testimonialsQuery = useQuery("testimonials", myDb.testimonial.fetchAll);

  if (landingQuery.isLoading || testimonialsQuery.isLoading) {
    return <PageDataFetch.Loading />;
  }

  if (
    landingQuery.isError ||
    !landingQuery.data ||
    testimonialsQuery.isError ||
    !testimonialsQuery.data
  ) {
    return <PageDataFetch.Error />;
  }

  return children({
    page: landingQuery.data,
    testimonials: testimonialsQuery.data,
  });
};

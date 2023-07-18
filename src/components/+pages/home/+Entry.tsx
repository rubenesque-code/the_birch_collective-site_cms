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
import { RevisionCx } from "./_state/RevisionCx";
import TestimonialSlides from "./testimonial-slides/+Entry";
import AboutUs from "./about-us/+Entry";
import PageLayout from "~/components/layouts/Page";
import Workshops from "./workshops/+Entry";

// □ need to have production values in env.local?
// □ abstraction for react-query onMutate, onSuccess, etc.
// □ use zod in saving to db?
// □ check image blur up works.
// □ should be able to work out by aspect ratio of image container and aspect ratio of image natural dimensions whether can move up/down and/or left/right.
// □ maybe do image abstraction.
// □ UserEditableDataCx should be renamed - have other editable Cx e.g. new testimonial. Rename to e.g. page editable cx

const HomePage = () => {
  return (
    <InitData>
      {(initDbData) => (
        <UserEditableDataCx.Provider initDbData={initDbData}>
          <RevisionCx.Provider initDbData={initDbData}>
            {({ actions, data }) => (
              <div className="flex h-screen w-screen flex-col overflow-hidden">
                <Header actions={actions} data={{ isChange: data.isChange }} />
                <PageLayout.Body
                  styles={{
                    outer:
                      "h-full flex-grow overflow-y-auto overflow-x-hidden bg-gray-100 scrollbar-thin ",
                    inner: "p-sm pr-md",
                  }}
                >
                  <div className="bg-white">
                    {/*                     <BannerImage />
                    <PageLayout.Section.Default>
                      <OrgHeadings />
                    </PageLayout.Section.Default>
                    <PageLayout.Section.Default>
                      <TestimonialSlides />
                    </PageLayout.Section.Default>
                    <PageLayout.Section.Default>
                      <AboutUs />
                    </PageLayout.Section.Default> */}
                    <PageLayout.Section.Default>
                      <Workshops />
                    </PageLayout.Section.Default>
                  </div>
                </PageLayout.Body>
              </div>
            )}
          </RevisionCx.Provider>
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

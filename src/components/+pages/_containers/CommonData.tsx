import { useQuery } from "react-query";

import { UedCx } from "~/context/user-editable-data";
import { myDb } from "~/my-firebase/firestore";
import { type MyDb } from "~/types/database";

function CommonData() {
  throw new Error(
    "CommonData exists for naming purposes only and should not be used as a component",
  );
}

export { CommonData };

export type CommonDbData = {
  orgDetails: MyDb["singles"]["orgDetails"];
  linkLabels: MyDb["singles"]["linkLabels"];
  header: MyDb["singles"]["header"];
  footer: MyDb["singles"]["footer"];

  images: MyDb["image"][];
  keywords: MyDb["keyword"][];
};

const useQueries = () => {
  const footerQuery = useQuery("footer", myDb.footer.fetch);
  const headerQuery = useQuery("header", myDb.header.fetch);
  const linkLabelsQuery = useQuery("link-labels", myDb.linkLabels.fetch);
  const orgDetailsQuery = useQuery("org-details", myDb.orgDetails.fetch);

  const imagesQuery = useQuery("images", myDb.image.fetchAll);
  const keywordsQuery = useQuery("keywords", myDb.keyword.fetchAll);

  return {
    footerQuery,
    headerQuery,
    linkLabelsQuery,
    orgDetailsQuery,
    imagesQuery,
    keywordsQuery,
  };
};

CommonData.useQueries = useQueries;

const CommonUserEditProviders = ({
  children,
  dbData,
}: {
  children: React.ReactElement;
  dbData: CommonDbData;
}) => (
  <UedCx.OrgDetails.Provider initData={dbData.orgDetails}>
    <UedCx.LinkLabels.Provider initData={dbData.linkLabels}>
      <UedCx.Header.Provider initData={dbData.header}>
        <UedCx.Footer.Provider initData={dbData.footer}>
          <UedCx.Images.Provider initData={dbData.images}>
            <UedCx.Keywords.Provider initData={dbData.keywords}>
              {children}
            </UedCx.Keywords.Provider>
          </UedCx.Images.Provider>
        </UedCx.Footer.Provider>
      </UedCx.Header.Provider>
    </UedCx.LinkLabels.Provider>
  </UedCx.OrgDetails.Provider>
);

CommonData.UserEditProviders = CommonUserEditProviders;

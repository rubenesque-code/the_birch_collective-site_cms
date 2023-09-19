import { useQueryClient } from "react-query";

import { SearchCx } from "../_state";

import { UedCx } from "~/context/user-editable-data";
import { fuzzySearch } from "~/helpers/fuzzy-search";
import { NextImage } from "~/lib";
import type { MyDb } from "~/types/database";

const processImages = (images: MyDb["image"][], keywords: MyDb["keyword"][]) =>
  images.map(({ keywords: imageKeywords, ...restImage }) => ({
    ...restImage,
    keywords: imageKeywords
      .map((imageKeyword) =>
        keywords.find(
          (keyword) => keyword.id === imageKeyword.dbConnections.keywordId,
        ),
      )
      .flatMap((keyword) => (keyword ? [keyword.text] : [])),
  }));

const ImageGrid = () => {
  const {
    store: { data: images },
  } = UedCx.Images.use();
  const {
    store: { data: keywords },
  } = UedCx.Keywords.use();

  const imagesProcessed = processImages(images, keywords);

  const { query } = SearchCx.use();

  const usedImageIds = useImageIdsInUse();

  const filtered = !query.length
    ? images
    : fuzzySearch({
        entities: imagesProcessed,
        keys: ["keywords"],
        pattern: query,
      });

  return (
    <div>
      {!images.length ? (
        <p>No images yet.</p>
      ) : !filtered.length ? (
        <p>No images for search term.</p>
      ) : (
        <div className="grid grid-cols-3 gap-sm pr-2 xl:grid-cols-4">
          {filtered.map((image) => (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image
              isUsed={usedImageIds.includes(image.id)}
              image={image}
              key={image.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGrid;

function getConnectedImageId<
  TEntity extends { dbConnections: { imageId: string | null } },
>(entity: TEntity) {
  return entity.dbConnections.imageId;
}

const useImageIdsInUse = () => {
  const queryClient = useQueryClient();

  const landingPage = queryClient.getQueryData(
    "landing-page",
  ) as MyDb["pages"]["landing"];

  const landingPageImageIds = [
    getConnectedImageId(landingPage.bannerImage),
    ...landingPage.photoAlbum.entries.map((entry) =>
      getConnectedImageId(entry.image),
    ),
    getConnectedImageId(landingPage.supportUs.donate.image),
    getConnectedImageId(landingPage.supportUs.volunteer.image),
    getConnectedImageId(landingPage.workshops.image),
  ];

  const aboutPage = queryClient.getQueryData(
    "about-page",
  ) as MyDb["pages"]["aboutUs"];

  const aboutPageImageIds = [
    getConnectedImageId(aboutPage.bannerImage),
    ...aboutPage.theTeam.members.map((entry) =>
      getConnectedImageId(entry.image),
    ),
  ];

  const programmesPage = queryClient.getQueryData(
    "programmes-page",
  ) as MyDb["pages"]["programmes"];

  const programmesPageImageIds = [
    getConnectedImageId(programmesPage.bannerImage),
  ];

  const donatePage = queryClient.getQueryData(
    "donate-page",
  ) as MyDb["pages"]["donate"];

  const donatePageImageIds = [
    getConnectedImageId(donatePage.bannerImage),
    getConnectedImageId(donatePage.body.image),
  ];

  const volunteerPage = queryClient.getQueryData(
    "volunteer-page",
  ) as MyDb["pages"]["volunteer-positions"];

  const volunteerPageImageIds = [
    getConnectedImageId(volunteerPage.bannerImage),
  ];

  const careersPage = queryClient.getQueryData(
    "careers-page",
  ) as MyDb["pages"]["careers"];

  const careersPageImageIds = [getConnectedImageId(careersPage.bannerImage)];

  const workshopsPage = queryClient.getQueryData(
    "workshops-page",
  ) as MyDb["pages"]["workshops"];

  const workshopsPageImageIds = [
    getConnectedImageId(workshopsPage.bannerImage),
    getConnectedImageId(workshopsPage.aboutAmy.image),
  ];

  const testimonialsPage = queryClient.getQueryData(
    "testimonials-page",
  ) as MyDb["pages"]["testimonials"];

  const testimonialsPageImageIds = [
    getConnectedImageId(testimonialsPage.bannerImage),
  ];

  const theoryOfChangePage = queryClient.getQueryData(
    "theory-of-change-page",
  ) as MyDb["pages"]["theory-of-change"];

  const theoryOfChangePageImageIds = [
    getConnectedImageId(theoryOfChangePage.bannerImage),
  ];

  const participantTestimonials = queryClient.getQueryData(
    "participant-testimonials",
  ) as MyDb["participant-testimonial"][];

  const participantTestimonialsImageIds = participantTestimonials.map(
    (t) => t.image.dbConnect.imageId,
  );

  const professionalTestimonials = queryClient.getQueryData(
    "professional-testimonials",
  ) as MyDb["professional-testimonial"][];

  const professionalTestimonialsImageIds = professionalTestimonials.map((t) =>
    getConnectedImageId(t.image),
  );

  const programmes = queryClient.getQueryData(
    "programmes",
  ) as MyDb["programme"][];

  const programmeImageIds = programmes.flatMap((p) => [
    getConnectedImageId(p.bannerImage),
    ...p.posters.map((p) => getConnectedImageId(p.image)),
    ...p.photoAlbum.entries.map((p) => getConnectedImageId(p.image)),
    getConnectedImageId(p.summary.image),
  ]);

  const supporters = queryClient.getQueryData(
    "supporters",
  ) as MyDb["supporter"][];

  const supporterImageIds = supporters.flatMap((s) => [
    getConnectedImageId(s.image),
  ]);

  const partners = queryClient.getQueryData("partners") as MyDb["partner"][];

  const partnerImageIds = partners.flatMap((s) => [
    getConnectedImageId(s.image),
  ]);

  const workshops = queryClient.getQueryData("workshops") as MyDb["workshop"][];

  const workshopsImageIds = workshops.flatMap((w) => [
    getConnectedImageId(w.bannerImage),
    ...w.photoAlbum.entries.map((p) => getConnectedImageId(p.image)),
    getConnectedImageId(w.summary.image),
  ]);

  const orgDetails = queryClient.getQueryData(
    "org-details",
  ) as MyDb["singles"]["orgDetails"];

  const orgDetailsImageIds = [getConnectedImageId(orgDetails.logoImage)];

  const allUsedImageIds = [
    landingPageImageIds,
    aboutPageImageIds,
    programmesPageImageIds,
    donatePageImageIds,
    volunteerPageImageIds,
    careersPageImageIds,
    workshopsPageImageIds,
    testimonialsPageImageIds,
    theoryOfChangePageImageIds,
    participantTestimonialsImageIds,
    professionalTestimonialsImageIds,
    programmeImageIds,
    supporterImageIds,
    partnerImageIds,
    workshopsImageIds,
    orgDetailsImageIds,
  ]
    .flatMap((arr) => arr)
    .flatMap((id) => (id ? [id] : []));

  return allUsedImageIds;
};

const Image = ({
  image,
  isUsed,
}: {
  image: MyDb["image"] | ReturnType<typeof processImages>[number];
  isUsed: boolean;
}) => (
  <div
    className={`border-base-200 relative flex aspect-square  flex-col rounded-lg border p-sm`}
  >
    {!isUsed ? (
      <div className="absolute left-xs top-xs z-30 rounded-lg bg-blue-400 px-xs text-sm text-white">
        Not used
      </div>
    ) : null}

    <div className="relative h-full bg-gray-50">
      <NextImage
        alt=""
        fill
        src={image.urls.large}
        blurDataURL={image.urls.blur}
        placeholder="blur"
        className="absolute left-0 top-0 h-full w-full"
        style={{
          objectFit: "contain",
        }}
        loading="lazy"
      />
    </div>
  </div>
);

import React from "react";
import { useMutation, useQueryClient } from "react-query";

import { Icon } from "~/components/icons";
import ModalLayout from "~/components/layouts/Modal";
import { ComponentMenu } from "~/components/menus";
import { Modal, MyMenu } from "~/components/styled-bases";
import { WarningPanel } from "~/components/WarningPanel";
import { WithTooltip } from "~/components/WithTooltip";

import { FiltersCx } from "../_state";

import { DbReadCx } from "~/context/db-data-read-only";
import { UedCx } from "~/context/user-editable-data";
import { getIds } from "~/helpers/data/query";
import { fuzzySearch } from "~/helpers/fuzzy-search";
import { strArrayDivergence } from "~/helpers/query-arr";
import { useToast } from "~/hooks";
import { generateUid, NextImage } from "~/lib";
import { myFirebaseTransactions } from "~/my-firebase/transactions";
import type { MyDb } from "~/types/database";

const processImages = (images: MyDb["image"][], keywords: MyDb["keyword"][]) =>
  images.map((image) => {
    const { keywords: imageKeywords, ...restImage } = image;

    return {
      ...restImage,
      keywords: imageKeywords
        .map((imageKeyword) =>
          keywords.find(
            (keyword) => keyword.id === imageKeyword.dbConnections.keywordId,
          ),
        )
        .flatMap((keyword) => (keyword ? [keyword.text] : [])),
    };
  });

const ImageGrid = () => {
  const {
    store: { data: allImages },
  } = UedCx.Images.use();
  const {
    store: { data: keywords },
  } = UedCx.Keywords.use();

  const imagesProcessed = processImages(allImages, keywords);

  const { query, imageType } = FiltersCx.use();

  const usedImageIds = useImageIdsInUse();

  const queryIsInUse = (imageId: string) => usedImageIds.includes(imageId);

  const filteredByType = imagesProcessed.filter((image) => {
    const isInUse = queryIsInUse(image.id);

    return imageType === "all"
      ? true
      : imageType === "used"
      ? isInUse
      : !isInUse;
  });

  const filtered =
    !query.length && imageType === "all"
      ? allImages
      : !query.length
      ? filteredByType
      : fuzzySearch({
          entities: filteredByType,
          keys: ["keywords"],
          pattern: query,
        });

  return (
    <div>
      {!allImages.length ? (
        <p className="text-gray-600">No images yet.</p>
      ) : !filtered.length ? (
        <p className="text-gray-600">No images for search term.</p>
      ) : (
        <div className="grid grid-cols-3 gap-sm pr-2 xl:grid-cols-4">
          {filtered.map((fuzzyQueryImage) => (
            <DbReadCx.Image.Provider
              image={
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                allImages.find((image) => image.id === fuzzyQueryImage.id)!
              }
              key={fuzzyQueryImage.id}
            >
              <MyImage isUsed={usedImageIds.includes(fuzzyQueryImage.id)} />
            </DbReadCx.Image.Provider>
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

const MyImage = ({ isUsed }: { isUsed: boolean }) => {
  const image = DbReadCx.Image.use();

  return (
    <div
      className={`border-base-200 group/image relative flex  aspect-square flex-col rounded-lg border p-sm`}
    >
      <Menu isUsed={isUsed} />

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
};

const Menu = ({ isUsed }: { isUsed: boolean }) => {
  const image = DbReadCx.Image.use();

  const toast = useToast();

  const deleteImageMutation = useMutation(
    myFirebaseTransactions.deleteImageFromFirestoreAndStorage,
  );

  const queryClient = useQueryClient();

  return (
    <ComponentMenu styles="right-1 top-1 group-hover/image:opacity-40">
      <KeywordsModal />

      {isUsed ? null : (
        <>
          <ComponentMenu.Divider />

          <Modal.WithVisibilityProvider
            button={({ openModal }) => (
              <ComponentMenu.Button.Delete
                tooltip="delete image"
                onClick={() => {
                  openModal();
                  console.log("image:", image);
                }}
              />
            )}
            panelContent={({ closeModal }) => (
              <WarningPanel
                callback={() => {
                  closeModal();

                  toast.promise(
                    () =>
                      deleteImageMutation.mutateAsync(
                        {
                          id: image.id,
                          storageIds: image.storageIds,
                        },

                        {
                          async onSuccess() {
                            await queryClient.invalidateQueries("images");
                            await queryClient.fetchQuery("images");
                          },
                        },
                      ),
                    {
                      pending: "deleting",
                      error: "delete error",
                      success: "deleted",
                    },
                  );
                }}
                closeModal={closeModal}
                text={{
                  title: "Delete image",
                  body: "Are you sure?",
                }}
              />
            )}
          />
        </>
      )}
    </ComponentMenu>
  );
};

const KeywordsModal = () => (
  <Modal.WithVisibilityProvider
    button={({ openModal }) => (
      <ComponentMenu.Button tooltip="keywords" onClick={openModal}>
        <Icon.Keyword />
      </ComponentMenu.Button>
    )}
    panelContent={
      <ModalLayout.Standard
        title="Edit keywords"
        body={
          <div>
            <div>
              <AddKeyword />
            </div>

            <div className="mt-lg">
              <ImageKeywords />
            </div>
          </div>
        }
        styles={{ outerWrapper: "h-[600px]" }}
      />
    }
  />
);

const ImageKeywords = () => {
  const image = DbReadCx.Image.use();

  const {
    store: { actions },
  } = UedCx.Images.use();

  const {
    store: { data: keywordStore },
  } = UedCx.Keywords.use();

  const entries = (
    image.keywords
      .map((entry) => ({
        id: entry.id,
        connectedKeyword: keywordStore.find(
          (keyword) => keyword.id === entry.dbConnections.keywordId,
        ),
      }))
      .filter((entry) => entry.connectedKeyword) as {
      id: string;
      connectedKeyword: MyDb["keyword"];
    }[]
  ).sort((a, b) =>
    a.connectedKeyword.text.localeCompare(b.connectedKeyword.text),
  );

  return (
    <div className="">
      {!image.keywords.length ? (
        <p className="text-gray-400">None yet.</p>
      ) : (
        <div className="flex flex-wrap items-center gap-x-sm gap-y-xs">
          {entries.map((entry, i) => (
            <div
              className="group/keyword relative border-b border-transparent text-sm text-gray-500 transition-all duration-100 ease-in-out hover:border-gray-300"
              key={entry.id}
            >
              <span>{entry.connectedKeyword.text}</span>

              {i < entries.length - 1 ? "," : ""}

              <WithTooltip text="remove">
                <div
                  className="absolute right-0 top-0 -translate-y-full cursor-pointer rounded-full p-xxs text-xs opacity-0 transition-opacity duration-100 ease-in-out group-hover/keyword:opacity-100 hover:bg-gray-100 hover:text-my-alert-content"
                  onClick={() =>
                    actions.keywords.remove({
                      findBy: { imageId: image.id, keywordId: entry.id },
                    })
                  }
                >
                  <Icon.Remove />
                </div>
              </WithTooltip>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AddKeyword = () => (
  <MyMenu
    button={
      <button
        className={`group my-btn-create mb-sm flex items-center gap-xs rounded-md px-sm py-1.5 text-white`}
        type="button"
      >
        <span className="text-sm">
          <Icon.Create />
        </span>
        <span className="text-sm font-medium">Add new</span>
      </button>
    }
    styles={{ itemsWrapper: "border translate-y-xxs" }}
  >
    <AddKeywordPanel />
  </MyMenu>
);

const AddKeywordPanel = () => {
  const [inputValue, setInputValue] = React.useState("");

  const { store: keywordStore } = UedCx.Keywords.use();

  const image = DbReadCx.Image.use();

  const {
    store: { actions: imageActions },
  } = UedCx.Images.use();

  const existingKeywordMatch = keywordStore.data.find(
    (keyword) => keyword.text.toLowerCase() === inputValue.toLowerCase(),
  );

  const existingKeywordMatchIsAlreadyConnected = existingKeywordMatch
    ? image.keywords.some(
        (entry) => entry.dbConnections.keywordId === existingKeywordMatch.id,
      )
    : null;

  const inputValueIsValid =
    inputValue.length && !existingKeywordMatchIsAlreadyConnected;

  const handleSubmit = () => {
    if (!inputValueIsValid) {
      return;
    }

    if (existingKeywordMatch) {
      imageActions.keywords.add({
        data: {
          dbConnections: { keywordId: existingKeywordMatch.id },
        },
        findBy: { imageId: image.id },
      });

      setInputValue("");

      return;
    }

    const newKeywordId = generateUid();

    keywordStore.actions.create({ id: newKeywordId, text: inputValue });

    imageActions.keywords.add({
      data: { dbConnections: { keywordId: newKeywordId } },
      findBy: { imageId: image.id },
    });

    setInputValue("");
  };

  return (
    <div className="">
      <form
        className="relative flex items-center gap-sm border-b py-xs pl-2xl pr-xl"
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "Space") {
            e.stopPropagation();
          }
        }}
      >
        <div className="relative">
          <input
            className={`min-w-[220px] rounded-sm py-xxs text-gray-700 focus-within:bg-gray-50`}
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for or add keyword..."
            value={inputValue}
            size={1}
            autoComplete="one-time-code"
            id="keyword-input"
          />
          <label
            className="absolute -left-[3rem] top-1/2 -translate-x-full -translate-y-1/2"
            htmlFor="keyword-input"
          >
            <SearchOrAddIcon />
          </label>
        </div>

        <div
          className={`text-xs text-gray-400 ${
            inputValueIsValid ? "opacity-100" : "opacity-0"
          }`}
        >
          Press enter to submit
        </div>
      </form>

      <SearchList inputValue={inputValue} />
    </div>
  );
};

const SearchOrAddIcon = () => (
  <div className="relative text-gray-400">
    <span className="absolute -left-[1px] -top-[1px] -translate-x-full text-xs">
      <Icon.Create />
    </span>

    <div className="h-[20px] w-[1px] rotate-45 bg-gray-300" />

    <span className="absolute -bottom-[1px] -right-[1px] translate-x-full text-xs">
      <Icon.Search />
    </span>
  </div>
);

const SearchList = ({ inputValue }: { inputValue: string }) => {
  const keywordStore = UedCx.Keywords.use();

  const image = DbReadCx.Image.use();

  const {
    store: { actions: imageActions },
  } = UedCx.Images.use();

  const unused = strArrayDivergence(
    getIds(keywordStore.store.data),
    image.keywords.map((k) => k.dbConnections.keywordId),
  )
    .map(
      (keywordId) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        keywordStore.store.data.find((keyword) => keyword.id === keywordId)!,
    )
    .sort((a, b) => a.text.localeCompare(b.text));

  const filteredByInputValue = !inputValue.length
    ? unused
    : fuzzySearch({
        entities: unused,
        keys: ["text"],
        pattern: inputValue,
      }).sort((a, b) => a.text.localeCompare(b.text));

  return (
    <div className="px-[4.5rem] py-sm">
      {!keywordStore.store.data.length ? (
        <p className="pl-md text-gray-400">None yet.</p>
      ) : !unused.length ? (
        <p className="pl-md text-gray-400">None unused.</p>
      ) : !filteredByInputValue.length ? (
        <p className="pl-md text-gray-400">No matches.</p>
      ) : (
        <div className="flex max-h-[200px] flex-col items-start gap-xs overflow-y-auto">
          {filteredByInputValue.map((keyword) => (
            <WithTooltip text="Click to add keyword to image" key={keyword.id}>
              <div
                className="cursor-pointer rounded-lg px-md text-gray-600 hover:bg-gray-100"
                onClick={() =>
                  imageActions.keywords.add({
                    data: {
                      dbConnections: { keywordId: keyword.id },
                    },
                    findBy: { imageId: image.id },
                  })
                }
              >
                {keyword.text}
              </div>
            </WithTooltip>
          ))}
        </div>
      )}
    </div>
  );
};

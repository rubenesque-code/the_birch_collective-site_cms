import { Icon } from "~/components/icons";
import { SearchInput } from "~/components/SearchInput";

import { ComponentApi, ModalsVisibilityContext } from "../_state";
import { SearchContext } from "./_state";

import { UedCx } from "~/context/user-editable-data";
import { fuzzySearch } from "~/helpers/fuzzy-search";
import { useToast } from "~/hooks";
import { NextImage } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

export const ImageLibrary = ({ closeModal }: { closeModal: () => void }) => (
  <div className="relative flex h-[700px] max-h-[70vh] w-[90vw] max-w-[1200px] flex-col rounded-2xl bg-white p-6 text-left shadow-xl">
    <div className="flex items-center justify-between border-b border-b-gray-200 pb-sm">
      <h3 className="pb-xs leading-6">Image library</h3>

      <p className="flex items-center gap-xs text-sm text-gray-400">
        <span>
          <Icon.Info />
        </span>

        <span>Click on an image to add it the document</span>
      </p>
    </div>

    <SearchContext.Provider>
      {({ query, setQuery }) => (
        <>
          <div className="mt-md">
            <SearchInput
              inputValue={query}
              setInputValue={setQuery}
              placeholder="Search by keyword"
            />
          </div>

          <div className="mt-md flex-grow overflow-y-auto">
            <Images />
          </div>
        </>
      )}
    </SearchContext.Provider>

    <div className="mt-xl">
      <button
        className="my-btn my-btn-neutral"
        type="button"
        onClick={() => closeModal()}
      >
        close
      </button>
    </div>
  </div>
);

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

const Images = () => {
  const {
    store: { data: images },
  } = UedCx.Images.use();
  const {
    store: { data: keywords },
  } = UedCx.Keywords.use();

  const imagesProcessed = processImages(images, keywords);

  const { query } = SearchContext.use();

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
            <Image image={image} key={image.id} />
          ))}
        </div>
      )}
    </div>
  );
};

const Image = ({
  image,
}: {
  image: MyDb["image"] | ReturnType<typeof processImages>[number];
}) => {
  const { onUploadOrSelect } = ComponentApi.use();
  const { imageLibrary } = ModalsVisibilityContext.use();

  const toast = useToast();

  return (
    <div
      className={`border-base-200 flex aspect-square cursor-pointer flex-col rounded-lg border p-sm hover:bg-gray-100`}
      onClick={() => {
        onUploadOrSelect({ dbImageId: image.id });
        toast.neutral("updated image");
        imageLibrary.close();
      }}
    >
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

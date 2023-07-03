import type { ReactElement } from "react";
import { useQuery } from "react-query";
import { myDb } from "~/my-firebase/firestore";
import { ImagesContext } from "./_state";
import type { MyDb } from "~/types/database";
import { ComponentAPI, ModalsVisibilityContext } from "../_state";
import { NextImage } from "~/lib/external-packages-rename";
import { Icon } from "~/components/icons";

// if have already fetched image - shouldn't need to fetch again (in firestoreImageWrapper)

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
    <div className="mt-md flex-grow overflow-y-auto">
      <ImagesQueryWrapper>
        <Images />
      </ImagesQueryWrapper>
    </div>
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

const ImagesQueryWrapper = ({ children }: { children: ReactElement }) => {
  const query = useQuery("images", myDb.image.fetchAll);
  console.log("query:", query);

  return (
    <div>
      {query.isLoading ? (
        <p>Loading images...</p>
      ) : query.isError || !query.data ? (
        <p></p>
      ) : (
        <ImagesContext.Provider images={query.data}>
          {children}
        </ImagesContext.Provider>
      )}
    </div>
  );
};

const Images = () => {
  const { images } = ImagesContext.use();

  return (
    <div>
      {!images.length ? (
        <p>No images yet.</p>
      ) : (
        <div className="grid cursor-pointer grid-cols-3 gap-sm pr-2 xl:grid-cols-4">
          {images.map((image) => (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image image={image} key={image.id} />
          ))}
        </div>
      )}
    </div>
  );
};

const Image = ({ image }: { image: MyDb["image"] }) => {
  const { onUploadOrSelect } = ComponentAPI.use();
  const { imageLibrary } = ModalsVisibilityContext.use();

  return (
    <div
      className={`border-base-200 flex aspect-square flex-col rounded-lg border p-sm hover:bg-gray-50`}
      onClick={() => {
        onUploadOrSelect({ firestoreImageId: image.id });
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

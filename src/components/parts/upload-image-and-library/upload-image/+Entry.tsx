import { useMemo, type ChangeEvent } from "react";
import imageCompression from "browser-image-compression";
import { useMutation } from "react-query";

import { AsyncOverlay } from "~/components/AsyncOverlay";
import { Icon } from "~/components/icons";

import { ComponentAPI, ModalsVisibilityContext } from "../_state";
import { NewImageCx } from "./_state";
import Keywords from "./keywords/+Entry";

import { useToast } from "~/hooks";
import { generateUid, NextImage } from "~/lib/external-packages-rename";
import { myFirebaseTransactions } from "~/my-firebase/transactions";

export const UploadImage = () => (
  <div className="relative w-[600px] max-w-[90vw] rounded-2xl bg-white p-6 text-left shadow-xl">
    <h3 className="border-b-base-300 text-base-content border-b pb-sm leading-6">
      Upload Image
    </h3>
    <div className="mt-md">
      <NewImageCx.Provider>
        <Form />
      </NewImageCx.Provider>
    </div>
  </div>
);

const Form = () => {
  /*   const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    naturalHeight: number;
    naturalWidth: number;
  } | null>(null); */
  const { data: newImageData } = NewImageCx.use();

  const { onUploadOrSelect: onUpload } = ComponentAPI.use();

  const {
    uploadModal: { close: closeThisModal },
  } = ModalsVisibilityContext.use();

  const toast = useToast();

  const uploadMutation = useMutation(async (input: { firestoreId: string }) => {
    if (
      !newImageData.file ||
      !newImageData.dimensions.naturalHeight ||
      !newImageData.dimensions.naturalWidth
    ) {
      return;
    }

    const optimisedImageFile = await imageCompression(newImageData.file, {
      maxWidthOrHeight: 1200,
      initialQuality: 0.8,
    });

    await myFirebaseTransactions.uploadImageToStorageAndCreateFirestoreImage({
      file: optimisedImageFile,
      firestoreId: input.firestoreId,
      naturalDimensions: {
        height: newImageData.dimensions.naturalHeight,
        width: newImageData.dimensions.naturalWidth,
      },
    });
  });

  const upload = () => {
    if (
      !newImageData.file ||
      !newImageData.dimensions.naturalHeight ||
      !newImageData.dimensions.naturalWidth
    ) {
      return;
    }

    const firestoreId = generateUid();

    toast.promise(
      () =>
        uploadMutation.mutateAsync(
          { firestoreId },

          {
            onSuccess() {
              onUpload({ dbImageId: firestoreId });
            },
          },
        ),
      {
        pending: "uploading image",
        error: "image upload error",
        success: "image uploaded",
      },
    );
  };

  return (
    <div>
      <div className="max-h-[60vh] overflow-y-auto pr-xs">
        {newImageData.file ? <ImageFileDisplay /> : null}
        <ImageFileInput />
      </div>
      {newImageData.file ? (
        <div className="mt-xl">
          <Keywords />
        </div>
      ) : null}
      <div className="mt-lg flex items-center justify-between pt-sm">
        <button
          className="my-btn my-btn-neutral"
          type="button"
          onClick={closeThisModal}
        >
          {!newImageData.file ? "close" : "cancel"}
        </button>
        {!newImageData.file ? null : (
          <button
            className="my-btn my-btn-action"
            onClick={upload}
            type="button"
          >
            Upload
          </button>
        )}
      </div>
      <AsyncOverlay
        closeButton={{ onClick: closeThisModal }}
        status={uploadMutation.status}
      />
    </div>
  );
};

const ImageFileDisplay = () => {
  const { data, actions } = NewImageCx.use();

  const file = data.file as File;

  const imgSrc = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <div className="my-md gap-8">
      <div className="inline-block">
        <NextImage
          width={300}
          height={300}
          src={imgSrc}
          className="bg-gray-50"
          alt=""
          onLoadingComplete={(e) => {
            actions.dimensions.naturalHeight(e.naturalHeight);
            actions.dimensions.naturalWidth(e.naturalWidth);
          }}
        />
      </div>
      <p className="text-sm text-gray-400">{file.name}</p>
    </div>
  );
};

const uploadInputId = "image-upload-input-id";

const ImageFileInput = () => {
  const {
    data: { file },

    actions,
  } = NewImageCx.use();

  const handleImageInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (!files) {
      return;
    }

    const file = files[0];

    if (!file) {
      return;
    }

    const isImage = file.name.match(/.(jpg|jpeg|png|webp|avif|gif|tiff)$/i);

    if (!isImage) {
      return;
    }

    const isAcceptedImage = file.name.match(/.(jpg|jpeg|png|webp)$/i);

    if (!isAcceptedImage) {
      return;
    }

    actions.file(file);
  };

  return (
    <div>
      <label
        className="group inline-flex cursor-pointer items-center gap-2 rounded-sm border border-gray-300 px-sm py-1 transition-all duration-75 ease-in-out hover:bg-gray-100"
        htmlFor={uploadInputId}
      >
        <span className="group-hover:text-base-content text-gray-400">
          <Icon.FileImage />
        </span>
        <span className="text-sm text-gray-700">
          {!file ? "Choose file" : "Change file"}
        </span>
      </label>
      <input
        className="hidden"
        accept="image/png, image/jpg, image/jpeg, image/webp"
        onChange={handleImageInputFileChange}
        id={uploadInputId}
        name="files"
        type="file"
        autoComplete="off"
      />
      <p className="mt-xs text-sm text-gray-400">
        Accepted image types: png, jpg, jpeg, webp
      </p>
    </div>
  );
};

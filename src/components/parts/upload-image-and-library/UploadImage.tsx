import { type ChangeEvent, useState, useMemo } from "react";
import { useMutation } from "react-query";
import { AsyncOverlay } from "~/components/AsyncOverlay";

import { Icon } from "~/components/icons";
import { NextImage } from "~/components/next-image";
import { useToast } from "~/hooks";
import { myFirebaseTransactions } from "~/my-firebase/transactions";
import { ComponentAPI, ModalsVisibility } from "./_state";
import { generateUid } from "~/lib/external-packages-namespace";

export const UploadImage = () => (
  // export const UploadImage = (props: { closeModal: () => void }) => (
  <div className="relative w-[600px] max-w-[90vw] rounded-2xl bg-white p-6 text-left shadow-xl">
    <h3 className="border-b-base-300 text-base-content border-b pb-sm leading-6">
      Upload Image
    </h3>
    <div className="mt-md">
      <Form />
      {/* <Form closeModal={props.closeModal} /> */}
    </div>
  </div>
);

const Form = () => {
  // const Form = ({ closeModal }: { closeModal: () => void }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    naturalHeight: number;
    naturalWidth: number;
  } | null>(null);

  const { onUpload } = ComponentAPI.use();

  const {
    uploadModal: { close: closeThisModal },
  } = ModalsVisibility.use();

  const toast = useToast();

  const uploadMutation = useMutation(
    (
      input: Parameters<
        (typeof myFirebaseTransactions)["uploadImageToStorageAndCreateFirestoreImage"]
      >[0],
    ) =>
      myFirebaseTransactions.uploadImageToStorageAndCreateFirestoreImage(input),
  );

  const upload = () => {
    if (!imageFile || !imageDimensions) {
      return;
    }

    const firestoreId = generateUid();

    toast.promise(
      () =>
        uploadMutation.mutateAsync(
          {
            firestoreId,
            naturalDimensions: {
              height: imageDimensions.naturalHeight,
              width: imageDimensions.naturalWidth,
            },
            file: imageFile,
          },
          {
            onSuccess() {
              onUpload({ firestoreImageId: firestoreId });
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
        {imageFile ? (
          <ImageFileDisplay file={imageFile} onLoad={setImageDimensions} />
        ) : null}
        <ImageFileInput isFile={Boolean(imageFile)} setFile={setImageFile} />
      </div>
      <div className="mt-lg flex items-center justify-between pt-sm">
        <button
          className="my-btn my-btn-neutral"
          type="button"
          onClick={closeThisModal}
        >
          {!imageFile ? "close" : "cancel"}
        </button>
        {!imageFile ? null : (
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

const ImageFileDisplay = ({
  file,
  onLoad,
}: {
  file: File;
  onLoad: (arg0: { naturalHeight: number; naturalWidth: number }) => void;
}) => {
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
          onLoadingComplete={(e) =>
            onLoad({
              naturalHeight: e.naturalHeight,
              naturalWidth: e.naturalWidth,
            })
          }
        />
      </div>
      <p className="text-sm text-gray-400">{file.name}</p>
    </div>
  );
};

const uploadInputId = "image-upload-input-id";

const ImageFileInput = ({
  isFile,
  setFile,
}: {
  isFile: boolean;
  setFile: (file: File) => void;
}) => {
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

    setFile(file);
  };

  return (
    <div>
      <label
        className="my-hover-bg border-base-300 group inline-flex cursor-pointer items-center gap-2 rounded-sm border px-sm py-1"
        htmlFor={uploadInputId}
      >
        <span className="text-base-300 group-hover:text-base-content">
          <Icon.FileImage />
        </span>
        <span className="text-neutral text-sm">
          {!isFile ? "Choose file" : "Change file"}
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

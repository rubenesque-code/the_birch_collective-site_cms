import React from "react";
import imageCompression from "browser-image-compression";
import { useMutation, useQueryClient } from "react-query";

import { AsyncOverlay } from "~/components/AsyncOverlay";
import { Icon } from "~/components/icons";
import { Modal } from "~/components/styled-bases";

import { NewImageCx } from "./_state";
import Keywords from "./keywords/+Entry";

import { useToast } from "~/hooks";
import { generateUid, NextImage } from "~/lib";
import { myFirebaseTransactions } from "~/my-firebase/transactions";

const Upload = () => {
  return (
    <Modal.WithVisibilityProvider
      button={({ openModal }) => (
        <div
          className={`group inline-flex cursor-pointer items-center gap-4 rounded-md border px-2 py-2 pr-md text-sm text-gray-500 hover:bg-gray-100`}
          onClick={openModal}
        >
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              <Icon.Upload />
            </span>
            <span className="whitespace-nowrap">Upload new</span>
          </div>
        </div>
      )}
      panelContent={({ closeModal }) => (
        <div className="relative w-[600px] max-w-[90vw] rounded-2xl bg-white p-6 text-left shadow-xl">
          <h3 className="border-b-base-300 text-base-content border-b pb-sm leading-6">
            Upload Image
          </h3>
          <div className="mt-md">
            <NewImageCx.Provider>
              <Form closeModal={closeModal} />
            </NewImageCx.Provider>
          </div>
        </div>
      )}
    />
  );
};

export default Upload;

const Form = ({ closeModal }: { closeModal: () => void }) => {
  const { data: newImageData } = NewImageCx.use();

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
      keywords: newImageData.keywords,
    });
  });

  const queryClient = useQueryClient();

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
            async onSuccess() {
              console.log("--------------------------");
              await queryClient.invalidateQueries("images");
              await queryClient.fetchQuery("images");
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
          onClick={closeModal}
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
        closeButton={{ onClick: closeModal }}
        status={uploadMutation.status}
      />
    </div>
  );
};

const ImageFileDisplay = () => {
  const { data, actions } = NewImageCx.use();

  const file = data.file as File;

  const imgSrc = React.useMemo(() => URL.createObjectURL(file), [file]);

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

  const handleImageInputFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

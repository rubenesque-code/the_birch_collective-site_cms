import { type ReactElement } from "react";
import { useQuery } from "react-query";

import { Icon } from "./icons";
import { Spinner } from "./Spinner";

import { UedCx } from "~/context/user-editable-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";
import type { MyPick } from "~/types/utilities";

type Props = {
  children: (
    arg0: MyPick<MyDb["image"], "naturalDimensions" | "urls">,
  ) => ReactElement;
  connectedImageId: string;
};

export const ConnectImage = ({ children, connectedImageId }: Props) => {
  const {
    store: { data },
  } = UedCx.Images.use();

  const existingConnectedImage = data.find(
    (image) => image.id === connectedImageId,
  );

  const imageQuery = useQuery(
    ["image", connectedImageId],
    async () => await myDb.image.fetchOne(connectedImageId),
    { enabled: !existingConnectedImage },
  );

  if (imageQuery.isLoading) {
    return (
      <div className="absolute left-0 top-0 z-10 grid h-full w-full place-items-center rounded-2xl bg-white bg-opacity-70">
        <Spinner />
        <p className="">Fetching image...</p>
      </div>
    );
  }

  if (!existingConnectedImage && !imageQuery.data) {
    return <UnfoundFirestoreImage />;
  }

  return children({
    urls: existingConnectedImage
      ? existingConnectedImage.urls
      : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        imageQuery.data!.urls,
    naturalDimensions: existingConnectedImage
      ? existingConnectedImage.naturalDimensions
      : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        imageQuery.data!.naturalDimensions,
  });
};

const UnfoundFirestoreImage = () => (
  <div className="relative grid h-full place-items-center rounded-md border-2 border-my-alert-content bg-gray-50">
    <div className="grid place-items-center">
      <div className="text-5xl text-gray-500">
        <Icon.Image weight="light" />
      </div>
      <div className="mt-4 text-center text-my-alert-content">
        <p className="mt-1">Error - could not find image.</p>
      </div>
      <div className="mt-4 max-w-[400px] text-center text-gray-500">
        It may have been deleted. Try uploading the image again.
      </div>
    </div>
  </div>
);

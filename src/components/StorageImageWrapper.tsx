import { type ReactElement } from "react";

import { Icon } from "./icons";
import { myDb } from "~/my-firebase/firestore";
import { useQuery } from "react-query";
import { Spinner } from "./Spinner";
import type { MyDb } from "~/types/database";

type Props = {
  children: (arg0: { urls: MyDb["image"]["urls"] }) => ReactElement;
  firestoreId: string;
};

export const StorageImageWrapper = ({ children, firestoreId }: Props) => {
  const query = useQuery(
    ["banner-image", firestoreId],
    async () => await myDb.image.fetchOne(firestoreId),
    {},
  );

  if (query.isLoading) {
    return (
      <div className="absolute left-0 top-0 z-10 grid h-full w-full place-items-center rounded-2xl bg-white bg-opacity-70">
        <Spinner />
        <p className="">Fetching image...</p>
      </div>
    );
  }

  if (!query.data) {
    return <UnfoundFirestoreImage />;
  }

  return children({ urls: query.data.urls });
};

const UnfoundFirestoreImage = () => (
  <div className="relative grid h-full place-items-center rounded-md bg-my-alert">
    <div className="grid place-items-center">
      <div className="text-5xl text-gray-500">
        <Icon.Image weight="light" />
      </div>
      <div className="mt-4 text-center text-my-alert-content">
        <p className="mt-1">Could not find image.</p>
      </div>
      <div className="mt-4 max-w-[400px] text-center text-gray-600">
        Coul not find image. The image may have been deleted. You can try
        uploading again.
      </div>
    </div>
  </div>
);

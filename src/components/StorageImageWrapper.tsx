import { type ReactElement } from "react";

import { Icon } from "./icons";
import { isDevMode } from "~/helpers/process";
import { dummyData } from "~/static-data";

type Props = {
  children: (arg0: { imgUrl: string }) => ReactElement;
  storageId: string;
};

export const StorageImageWrapper = ({ children, storageId }: Props) => {
  console.log("storageId:", storageId);
  const storageImage = undefined;

  if (!storageImage) {
    return <UnfoundStorageImage />;
  }

  const src = isDevMode ? dummyData.imageSrc : "";

  return children({ imgUrl: src });
};

const UnfoundStorageImage = () => (
  <div className="relative grid h-full place-items-center rounded-md bg-my-alert">
    <div className="grid place-items-center">
      <div className="text-5xl text-my-alert-content">
        <Icon.Image />
      </div>
      <div className="mt-4 text-center text-my-alert-content">
        <h3 className="font-medium">Image error</h3>
        <p className="mt-1">Could not find image.</p>
      </div>
      <div className="mt-4 max-w-[400px] text-gray-600">
        Something went wrong. Try searching existing images. The image may have
        been deleted. You can try uploading again.
      </div>
    </div>
  </div>
);

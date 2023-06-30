import { type ReactElement } from "react";

import { ImagePlaceholder } from "./ImagePlaceholder";

type Props = {
  children: (arg0: { storageId: string }) => ReactElement;
  firestoreImageId: string | null;
  placeholderText?: string;
};

export const UserSelectedImageWrapper = ({
  children,
  firestoreImageId,
  placeholderText,
}: Props) => {
  if (!firestoreImageId) {
    return <ImagePlaceholder placeholderText={placeholderText} />;
  }

  return children({ storageId: firestoreImageId });
};

import { type ReactElement } from "react";

import { ImagePlaceholder } from "./ImagePlaceholder";

type Props = {
  children: (arg0: { storageId: string }) => ReactElement;
  storageId?: string;
  placeholderText?: string;
};

export const UserSelectedImageWrapper = ({
  children,
  storageId,
  placeholderText,
}: Props) => {
  if (!storageId) {
    return <ImagePlaceholder placeholderText={placeholderText} />;
  }

  return children({ storageId });
};

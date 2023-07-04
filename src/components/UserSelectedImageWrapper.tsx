import { type ReactElement } from "react";

import { ImagePlaceholder } from "./ImagePlaceholder";

type Props = {
  children: (arg0: { dbImageId: string }) => ReactElement;
  dbImageId: string | null;
  placeholderText?: string;
};

export const UserSelectedImageWrapper = ({
  children,
  dbImageId,
  placeholderText,
}: Props) => {
  if (!dbImageId) {
    return <ImagePlaceholder placeholderText={placeholderText} />;
  }

  return children({ dbImageId: dbImageId });
};

import { type ReactNode } from "react";

import { ImagePlaceholder } from "./ImagePlaceholder";

type Props = {
  children: (arg0: { dbImageId: string }) => ReactNode;
  dbImageId: string | null;
  placeholderText?: string;
  isCircle?: boolean;
};

export const UserSelectedImageWrapper = ({
  children,
  dbImageId,
  placeholderText,
  isCircle,
}: Props) => {
  if (!dbImageId) {
    return (
      <ImagePlaceholder placeholderText={placeholderText} isCircle={isCircle} />
    );
  }

  return children({ dbImageId: dbImageId });
};

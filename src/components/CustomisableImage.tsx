// move up-down, left-right. takes img url/id.
import { NextImage } from "./next-image";

type Props = {
  src: string;
};

export const CustomisableImage = ({ src }: Props) => {
  return (
    <div>
      <NextImage alt="" fill src={src} style={{ objectFit: "cover" }} />
    </div>
  );
};

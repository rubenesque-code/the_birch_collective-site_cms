// move up-down, left-right. takes img url/id.
import type { MyDb } from "~/types/database";
import { NextImage } from "./next-image";

type Props = { urls: MyDb["image"]["urls"] } & {
  position?: {
    x: number;
    y: number;
  };
};

export const CustomisableImage = ({
  urls,
  position = { x: 50, y: 50 },
}: Props) => (
  <NextImage
    alt=""
    fill
    src={urls.large}
    blurDataURL={urls.blur}
    placeholder="blur"
    style={{
      objectFit: "cover",
      objectPosition: `${position.x}% ${position.y}%`,
    }}
  />
);

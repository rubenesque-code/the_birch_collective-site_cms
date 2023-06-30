// move up-down, left-right. takes img url/id.
import type { MyDb } from "~/types/database";
import { NextImage } from "./next-image";

type Props = MyDb["image"]["urls"];

export const CustomisableImage = (urls: Props) => (
  <NextImage
    alt=""
    fill
    src={urls.large}
    blurDataURL={urls.blur}
    placeholder="blur"
    style={{ objectFit: "cover" }}
  />
);

import { NextImage } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

type Props = { urls: MyDb["image"]["urls"] } & {
  position?: {
    x: number;
    y: number;
  };
  objectFit?: "cover" | "contain";
  isCircle?: boolean;
};

export const CustomisableImage = ({
  urls,
  position = { x: 50, y: 50 },
  objectFit = "cover",
  isCircle = false,
}: Props) => (
  <NextImage
    alt=""
    fill
    src={urls.large}
    blurDataURL={urls.blur}
    placeholder="blur"
    className={`bg-gray-100 ${isCircle ? "rounded-full" : ""}`}
    style={{
      objectFit,
      objectPosition: `${position.x}% ${position.y}%`,
    }}
  />
);

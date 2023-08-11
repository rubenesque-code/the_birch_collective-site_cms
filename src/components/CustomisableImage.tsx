// move up-down, left-right. takes img url/id.
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
    className={`${isCircle ? "rounded-full" : ""}`}
    style={{
      objectFit,
      objectPosition: `${position.x}% ${position.y}%`,
    }}
  />
);

/* type Props = { urls: MyDb["image"]["urls"] } & {
  position?: {
    x: number;
    y: number;
  };
  objectFit?: "cover" | "contain";
  isCircle?: boolean;
  fill?: boolean;
  dimensions?: { width: number; height: number };
};

export const CustomisableImage = ({
  urls,
  position = { x: 50, y: 50 },
  objectFit = "cover",
  isCircle = false,
  fill = true,
  dimensions,
}: Props) => (
  <NextImage
    alt=""
    fill={fill}
    src={urls.large}
    blurDataURL={urls.blur}
    placeholder="blur"
    className={`${isCircle ? "rounded-full" : ""}`}
    {...dimensions}
    style={{
      position: "absolute",
      objectFit,
      objectPosition: `${position.x}% ${position.y}%`,
      top: "50%",
      transform: "translateY(-50%)",
      right: 0,
      inset: "auto",
    }}
  />
);
 */

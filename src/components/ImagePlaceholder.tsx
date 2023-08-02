import { Icon } from "./icons";

const ImagePlaceholder = ({
  placeholderText = "image here",
  isCircle = false,
}: {
  placeholderText?: string;
  isCircle?: boolean;
}) => (
  <div
    className={`relative grid h-full place-items-center bg-gray-300 ${
      isCircle ? "rounded-full" : "rounded-md"
    }`}
  >
    <p
      className={`absolute text-sm uppercase text-white ${
        isCircle
          ? "left-1/2 top-8 -translate-x-1/2 whitespace-nowrap text-center"
          : "left-2 top-2"
      }`}
    >
      {placeholderText}
    </p>
    <div className="text-5xl text-gray-100">
      <Icon.Image />
    </div>
  </div>
);

export { ImagePlaceholder };

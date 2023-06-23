import { Icon } from "./icons";

const ImagePlaceholder = ({
  placeholderText = "image here",
}: {
  placeholderText?: string;
}) => (
  <div className="relative grid h-full place-items-center rounded-md bg-gray-300">
    <p className="absolute left-2 top-2 text-sm uppercase text-white">
      {placeholderText}
    </p>
    <div className="text-5xl text-gray-100">
      <Icon.Image />
    </div>
  </div>
);

export { ImagePlaceholder };

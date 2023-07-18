import {
  ImageUploadAndLibrary,
  type ComponentProps,
} from "~/components/parts/upload-image-and-library";
import { type MyPick } from "~/types/utilities";
import { Button } from "./Button";

export const ImageSelectModal = (
  props: MyPick<ComponentProps, "onUploadOrSelect" | "styles">,
) => {
  return (
    <ImageUploadAndLibrary.Complete menuButton={<Button.Image />} {...props} />
  );
};

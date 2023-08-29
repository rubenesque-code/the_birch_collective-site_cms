import {
  ImageUploadAndLibrary,
  type ComponentProps,
} from "~/components/parts/upload-image-and-library";

import { Button } from "./Button";

import { type MyPick } from "~/types/utilities";

export const ImageSelectModal = (
  props: MyPick<ComponentProps, "onUploadOrSelect" | "styles">,
) => (
  <ImageUploadAndLibrary.Complete menuButton={<Button.Image />} {...props} />
);

import type { EditableLabels } from "./editable-labels";
import type { Image } from "./image";
import type { OrgDetails } from "./org-details";
import type { Pages } from "./pages";

export type MyDb = {
  editableLabels: EditableLabels;
  orgDetails: OrgDetails;
  pages: Pages;
  image: Image;
};

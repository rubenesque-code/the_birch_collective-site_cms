import { generateUid } from "~/lib/external-packages-rename";
import { type Section } from "../store";

export const createInitData = (input: { index: number }): Section => ({
  bullets: {
    entries: [],
    icon: "flame",
    type: "text",
  },
  colour: "brown",
  id: generateUid(),
  index: input.index,
  title: "",
  description: null,
});

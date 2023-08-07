export const bgColourSwith = (colour: "brown" | "green" | "orange") => {
  if (colour === "brown") {
    return "bg-brandBrown";
  }
  if (colour === "green") {
    return "bg-brandGreen";
  }
  return "bg-brandOrange";
};

export const textColourSwith = (colour: "brown" | "green" | "orange") => {
  if (colour === "brown") {
    return "text-brandBrown";
  }
  if (colour === "green") {
    return "text-brandGreen";
  }
  return "text-brandOrange";
};

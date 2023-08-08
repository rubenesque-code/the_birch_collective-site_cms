const collections = {
  pages: "pages",
  images: "images",
  testimonials: "testimonials",
  programmes: "programmes",
  supporters: "supporters",
  ["volunteer-positions"]: "volunteerPositions",
  singles: "singles",
} as const;

const pages = {
  landing: "landing",
  aboutUs: "aboutUs",
  programmes: "programmes",
  donate: "donate",
  ["volunteer-positions"]: "volunteerPositions",
} as const;

const singles = {
  orgDetails: "orgDetails",
  linkLabels: "linkLabels",
  header: "header",
  footer: "footer",
} as const;

export const firestore_file_system_names = {
  collections,
  docs: {
    pages,
    singles,
  },
};

export const storage_file_system_names = {
  folders: {
    resized: "resized",
  },
};

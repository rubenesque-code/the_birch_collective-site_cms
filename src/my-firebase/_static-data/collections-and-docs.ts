const collections = {
  pages: "pages",
  images: "images",
  "participant-testimonials": "testimonials",
  "professional-testimonials": "professionalTestimonials",
  programmes: "programmes",
  supporters: "supporters",
  partners: "partners",
  "volunteer-positions": "volunteerPositions",
  careers: "careers",
  workshops: "workshops",
  singles: "singles",
} as const;

const pages = {
  landing: "landing",
  aboutUs: "aboutUs",
  programmes: "programmes",
  donate: "donate",
  ["volunteer-positions"]: "volunteerPositions",
  careers: "careers",
  workshops: "workshops",
  testimonials: "testimonials",
  "theory-of-change": "theoryOfChange",
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

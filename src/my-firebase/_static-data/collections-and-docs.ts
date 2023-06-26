const collections = {
  careers: "careers",
  editable_elements: "editableElements",
  image_swiper: "imageSwiper",
  programmes: "programmes",
  supporters: "supporters",
  team: "team",
  testimonials: "testimonials",
  volunteer_roles: "volunteerRoles",
  workshops: "workshops",
};

const editable_element_docs = {
  about_page: "about",
  careers_page: "careersPage",
  contact_us: "contactUs",
  contacts: "contacts",
  donate_page: "donatePage",
  donation_success_page: "donationSuccessPage",
  footer: "footer",
  images: "images",
  landing_page: "landingPage",
  names: "names",
  navbar: "navbar",
  programme_page: "programmePage",
  programmes_page: "programmesPage",
  volunteer_page: "volunteerPage",
  workshop_page: "workshopPage",
  workshops_page: "workshopsPage",
};

export const firestore_file_system_names = {
  collections,
  docs: {
    editable_elements: editable_element_docs,
  },
};

export const storage_file_system_names = {
  folders: {
    resized: "resized",
  },
};

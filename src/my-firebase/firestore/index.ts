import { createImage } from "./mutate/image";
import {
  batchUpdateAboutUsPage,
  batchUpdateLandingPage,
  batchUpdateProgrammesPage,
} from "./mutate/pages";
import {
  batchCreateProgramme,
  batchDeleteProgramme,
  batchUpdateProgramme,
  createProgramme,
  deleteProgramme,
  updateProgramme,
} from "./mutate/programme";
import {
  batchCreateSupporter,
  batchDeleteSupporter,
  batchUpdateSupporter,
  createSupporter,
  deleteSupporter,
  updateSupporter,
} from "./mutate/supporter";
import {
  batchCreateTestimonial,
  batchDeleteTestimonial,
  batchUpdateTestimonial,
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "./mutate/testimonial";

import { batchUpdateFooter, updateFooter } from "./mutate/footer";
import { batchUpdateHeader, updateHeader } from "./mutate/header";
import { batchUpdateLinkLabels, updateLinkLabels } from "./mutate/linkLabels";
import { batchUpdateOrgDetails, updateOrgDetails } from "./mutate/orgDetails";
import { aboutUsPageTransaction } from "./mutate/transactions/aboutUsPage";
import { landingPageTransaction } from "./mutate/transactions/landingPage";
import {
  fetchAboutUsPage,
  fetchFooter,
  fetchHeader,
  fetchImages,
  fetchLandingPage,
  fetchLinkLabels,
  fetchOneImage,
  fetchOneProgramme,
  fetchOneSupporter,
  fetchOneTestimonial,
  fetchOrgDetails,
  fetchProgrammes,
  fetchProgrammesPage,
  fetchSupporters,
  fetchTestimonials,
} from "./query";
import { programmesPageTransaction } from "./mutate/transactions/programmesPage";

export const myDb = {
  pages: {
    landing: {
      fetch: fetchLandingPage,
      batch: {
        update: batchUpdateLandingPage,
      },
    },
    aboutUs: {
      fetch: fetchAboutUsPage,
      batch: {
        update: batchUpdateAboutUsPage,
      },
    },
    programmes: {
      fetch: fetchProgrammesPage,

      batch: {
        update: batchUpdateProgrammesPage,
      },
    },
  },
  orgDetails: {
    fetch: fetchOrgDetails,
    update: updateOrgDetails,
    batch: {
      update: batchUpdateOrgDetails,
    },
  },
  linkLabels: {
    fetch: fetchLinkLabels,
    update: updateLinkLabels,
    batch: {
      update: batchUpdateLinkLabels,
    },
  },
  header: {
    fetch: fetchHeader,
    update: updateHeader,
    batch: {
      update: batchUpdateHeader,
    },
  },
  footer: {
    fetch: fetchFooter,
    update: updateFooter,
    batch: {
      update: batchUpdateFooter,
    },
  },
  image: {
    create: createImage,
    fetchOne: fetchOneImage,
    fetchAll: fetchImages,
  },
  testimonial: {
    fetchOne: fetchOneTestimonial,
    fetchAll: fetchTestimonials,
    create: createTestimonial,
    update: updateTestimonial,
    delete: deleteTestimonial,
    batch: {
      create: batchCreateTestimonial,
      update: batchUpdateTestimonial,
      delete: batchDeleteTestimonial,
    },
  },
  programme: {
    fetchOne: fetchOneProgramme,
    fetchAll: fetchProgrammes,
    create: createProgramme,
    update: updateProgramme,
    delete: deleteProgramme,
    batch: {
      create: batchCreateProgramme,
      update: batchUpdateProgramme,
      delete: batchDeleteProgramme,
    },
  },
  supporter: {
    fetchOne: fetchOneSupporter,
    fetchAll: fetchSupporters,
    create: createSupporter,
    update: updateSupporter,
    delete: deleteSupporter,
    batch: {
      create: batchCreateSupporter,
      update: batchUpdateSupporter,
      delete: batchDeleteSupporter,
    },
  },
  transactions: {
    pages: {
      landing: landingPageTransaction,
      aboutUs: aboutUsPageTransaction,
      programmes: programmesPageTransaction,
    },
  },
};

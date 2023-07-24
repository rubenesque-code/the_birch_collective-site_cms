import { createImage } from "./mutate/image";
import { batchUpdateLandingPage, updateLandingPage } from "./mutate/pages";
import {
  batchCreateTestimonial,
  batchDeleteTestimonial,
  batchUpdateTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "./mutate/testimonial";
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

import { landingPageTransaction } from "./mutate/transactions/landingPage";
import {
  fetchImages,
  fetchLanding,
  fetchOneImage,
  fetchOneTestimonial,
  fetchTestimonials,
  fetchOneProgramme,
  fetchProgrammes,
  fetchOneSupporter,
  fetchSupporters,
  fetchOrgDetails,
  fetchLinkLabels,
  fetchHeader,
  fetchFooter,
} from "./query";
import { batchUpdateOrgDetails, updateOrgDetails } from "./mutate/orgDetails";
import { batchUpdateLinkLabels, updateLinkLabels } from "./mutate/linkLabels";
import { batchUpdateHeader, updateHeader } from "./mutate/header";
import { batchUpdateFooter, updateFooter } from "./mutate/footer";

export const myDb = {
  pages: {
    landing: {
      fetch: fetchLanding,
      update: updateLandingPage,
      batch: {
        update: batchUpdateLandingPage,
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
    },
  },
};

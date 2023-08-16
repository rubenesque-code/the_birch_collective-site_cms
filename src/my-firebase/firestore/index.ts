import { createImage } from "./mutate/image";
import {
  batchUpdateAboutUsPage,
  batchUpdateCareersPage,
  batchUpdateDonatePage,
  batchUpdateLandingPage,
  batchUpdateProgrammesPage,
  batchUpdateVolunteerPositionsPage,
  batchUpdateWorkshopsPage,
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
  batchCreatePartner,
  batchDeletePartner,
  batchUpdatePartner,
  createPartner,
  deletePartner,
  updatePartner,
} from "./mutate/partner";

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
  fetchCareers,
  fetchCareersPage,
  fetchDonatePage,
  fetchFooter,
  fetchHeader,
  fetchImages,
  fetchLandingPage,
  fetchLinkLabels,
  fetchOneCareer,
  fetchOneImage,
  fetchOneProgramme,
  fetchOneSupporter,
  fetchOneTestimonial,
  fetchOneVolunteerPosition,
  fetchOneWorkshop,
  fetchOrgDetails,
  fetchProgrammes,
  fetchProgrammesPage,
  fetchSupporters,
  fetchOnePartner,
  fetchPartners,
  fetchTestimonials,
  fetchVolunteerPositions,
  fetchVolunteerPositionsPage,
  fetchWorkshops,
  fetchWorkshopsPage,
} from "./query";
import { programmesPageTransaction } from "./mutate/transactions/programmesPage";
import { programmePageTransaction } from "./mutate/transactions/programmePage";
import { donatePageTransaction } from "./mutate/transactions/donatePage";
import { volunteerPositionsPageTransaction } from "./mutate/transactions/volunteerPositionsPage";
import {
  batchCreateVolunteerPosition,
  batchDeleteVolunteerPosition,
  batchUpdateVolunteerPosition,
  createVolunteerPosition,
  deleteVolunteerPosition,
  updateVolunteerPosition,
} from "./mutate/volunteer-positions";
import {
  batchCreateCareer,
  batchDeleteCareer,
  batchUpdateCareer,
} from "./mutate/careers";
import { careersPageTransaction } from "./mutate/transactions/careersPage";
import {
  batchCreateWorkshop,
  batchDeleteWorkshop,
  batchUpdateWorkshop,
} from "./mutate/workshops";
import { workshopsPageTransaction } from "./mutate/transactions/workshopsPage";
import { workshopPageTransaction } from "./mutate/transactions/workshopPage";

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
    donate: {
      fetch: fetchDonatePage,
      batch: {
        update: batchUpdateDonatePage,
      },
    },
    ["volunteer-positions"]: {
      fetch: fetchVolunteerPositionsPage,
      batch: {
        update: batchUpdateVolunteerPositionsPage,
      },
    },
    career: {
      fetch: fetchCareersPage,
      batch: {
        update: batchUpdateCareersPage,
      },
    },
    workshops: {
      fetch: fetchWorkshopsPage,
      batch: {
        update: batchUpdateWorkshopsPage,
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
  partner: {
    fetchOne: fetchOnePartner,
    fetchAll: fetchPartners,
    create: createPartner,
    update: updatePartner,
    delete: deletePartner,
    batch: {
      create: batchCreatePartner,
      update: batchUpdatePartner,
      delete: batchDeletePartner,
    },
  },
  ["volunteer-positions"]: {
    fetchOne: fetchOneVolunteerPosition,
    fetchAll: fetchVolunteerPositions,
    create: createVolunteerPosition,
    update: updateVolunteerPosition,
    delete: deleteVolunteerPosition,
    batch: {
      create: batchCreateVolunteerPosition,
      update: batchUpdateVolunteerPosition,
      delete: batchDeleteVolunteerPosition,
    },
  },
  career: {
    fetchOne: fetchOneCareer,
    fetchAll: fetchCareers,
    batch: {
      create: batchCreateCareer,
      update: batchUpdateCareer,
      delete: batchDeleteCareer,
    },
  },

  workshop: {
    fetchOne: fetchOneWorkshop,
    fetchAll: fetchWorkshops,
    batch: {
      create: batchCreateWorkshop,
      update: batchUpdateWorkshop,
      delete: batchDeleteWorkshop,
    },
  },

  transactions: {
    pages: {
      landing: landingPageTransaction,
      aboutUs: aboutUsPageTransaction,
      programmes: programmesPageTransaction,
      programme: programmePageTransaction,
      donate: donatePageTransaction,
      ["volunteer-positions"]: volunteerPositionsPageTransaction,
      careers: careersPageTransaction,
      workshop: workshopPageTransaction,
      workshops: workshopsPageTransaction,
    },
  },
};

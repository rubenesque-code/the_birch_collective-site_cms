import {
  batchCreateCareer,
  batchDeleteCareer,
  batchUpdateCareer,
} from "./mutate/careers";
import { batchUpdateFooter, updateFooter } from "./mutate/footer";
import { batchUpdateHeader, updateHeader } from "./mutate/header";
import { batchUpdateImage, createImage } from "./mutate/image";
import {
  batchCreateKeyword,
  batchDeleteKeyword,
  batchUpdateKeyword,
} from "./mutate/keywords";
import { batchUpdateLinkLabels, updateLinkLabels } from "./mutate/linkLabels";
import { batchUpdateOrgDetails, updateOrgDetails } from "./mutate/orgDetails";
import {
  batchUpdateAboutUsPage,
  batchUpdateCareersPage,
  batchUpdateDonatePage,
  batchUpdateLandingPage,
  batchUpdateProgrammesPage,
  batchUpdateTestimonialsPage,
  batchUpdateTheoryOfChangePage,
  batchUpdateVolunteerPositionsPage,
  batchUpdateWorkshopsPage,
} from "./mutate/pages";
import {
  batchCreateParticipantTestimonial,
  batchDeleteParticipantTestimonial,
  batchUpdateParticipantTestimonial,
} from "./mutate/participant-testimonial";
import {
  batchCreatePartner,
  batchDeletePartner,
  batchUpdatePartner,
  createPartner,
  deletePartner,
  updatePartner,
} from "./mutate/partner";
import {
  batchCreateProfessionalTestimonial,
  batchDeleteProfessionalTestimonial,
  batchUpdateProfessionalTestimonial,
} from "./mutate/professional-testimonial";
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
import { aboutUsPageTransaction } from "./mutate/transactions/aboutUsPage";
import { careersPageTransaction } from "./mutate/transactions/careersPage";
import { donatePageTransaction } from "./mutate/transactions/donatePage";
import { landingPageTransaction } from "./mutate/transactions/landingPage";
import { programmePageTransaction } from "./mutate/transactions/programmePage";
import { programmesPageTransaction } from "./mutate/transactions/programmesPage";
import { testimonialsPageTransaction } from "./mutate/transactions/testimonialsPage";
import { theoryOfChangePageTransaction } from "./mutate/transactions/theory-of-change-page";
import { volunteerPositionsPageTransaction } from "./mutate/transactions/volunteerPositionsPage";
import { workshopPageTransaction } from "./mutate/transactions/workshopPage";
import { workshopsPageTransaction } from "./mutate/transactions/workshopsPage";
import {
  batchCreateVolunteerPosition,
  batchDeleteVolunteerPosition,
  batchUpdateVolunteerPosition,
  createVolunteerPosition,
  deleteVolunteerPosition,
  updateVolunteerPosition,
} from "./mutate/volunteer-positions";
import {
  batchCreateWorkshop,
  batchDeleteWorkshop,
  batchUpdateWorkshop,
} from "./mutate/workshops";
import {
  fetchAboutUsPage,
  fetchCareers,
  fetchCareersPage,
  fetchDonatePage,
  fetchFooter,
  fetchHeader,
  fetchImages,
  fetchKeywords,
  fetchLandingPage,
  fetchLinkLabels,
  fetchOneCareer,
  fetchOneImage,
  fetchOnePartner,
  fetchOneProgramme,
  fetchOneSupporter,
  fetchOneVolunteerPosition,
  fetchOneWorkshop,
  fetchOrgDetails,
  fetchParticipantTestimonials,
  fetchPartners,
  fetchProfessionalTestimonials,
  fetchProgrammes,
  fetchProgrammesPage,
  fetchSupporters,
  fetchTestimonialsPage,
  fetchTheoryOfChangePage,
  fetchVolunteerPositions,
  fetchVolunteerPositionsPage,
  fetchWorkshops,
  fetchWorkshopsPage,
} from "./query";

export const myDb = {
  pages: {
    landing: {
      fetch: fetchLandingPage,
      batch: {
        update: batchUpdateLandingPage,
      },
    },
    testimonials: {
      fetch: fetchTestimonialsPage,
      batch: {
        update: batchUpdateTestimonialsPage,
      },
    },
    aboutUs: {
      fetch: fetchAboutUsPage,
      batch: {
        update: batchUpdateAboutUsPage,
      },
    },
    "theory-of-change": {
      fetch: fetchTheoryOfChangePage,
      batch: {
        update: batchUpdateTheoryOfChangePage,
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
    batch: {
      update: batchUpdateImage,
    },
  },
  "participant-testimonial": {
    fetchAll: fetchParticipantTestimonials,
    batch: {
      create: batchCreateParticipantTestimonial,
      update: batchUpdateParticipantTestimonial,
      delete: batchDeleteParticipantTestimonial,
    },
  },
  "professional-testimonial": {
    fetchAll: fetchProfessionalTestimonials,
    batch: {
      create: batchCreateProfessionalTestimonial,
      update: batchUpdateProfessionalTestimonial,
      delete: batchDeleteProfessionalTestimonial,
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
  keyword: {
    fetchAll: fetchKeywords,
    batch: {
      create: batchCreateKeyword,
      update: batchUpdateKeyword,
      delete: batchDeleteKeyword,
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
      testimonials: testimonialsPageTransaction,
      aboutUs: aboutUsPageTransaction,
      programmes: programmesPageTransaction,
      programme: programmePageTransaction,
      donate: donatePageTransaction,
      ["volunteer-positions"]: volunteerPositionsPageTransaction,
      careers: careersPageTransaction,
      workshop: workshopPageTransaction,
      workshops: workshopsPageTransaction,
      "theory-of-change": theoryOfChangePageTransaction,
    },
  },
};

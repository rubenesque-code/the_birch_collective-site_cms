import { updateDoc } from "firebase/firestore/lite";

import { getDocRef } from "~/my-firebase/firestore/_helpers";
import type { MyDb } from "~/types/database";

const addData = () => {
  // const docRef = getDocRef("singles", "orgDetails");
  // void updateDoc(docRef, orgDetails);
};

const Populate = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div>
        <button className="rounded-lg border px-md py-sm" onClick={addData}>
          Click to populate database
        </button>
      </div>
    </div>
  );
};

export default Populate;

const landingPageData: MyDb["pages"]["landing"] = {
  id: "landing-page",

  aboutUs: {
    buttonText: "",
    entries: [],
    heading: "",
  },

  bannerImage: {
    dbConnections: {
      imageId: null,
    },

    infoPopover: {
      text: "",
    },

    position: {
      x: 50,
      y: 50,
    },
  },

  orgHeadings: {
    byline: "",
    name: "",
  },

  partners: {
    entries: [],
    heading: "",
    subheading: "",
  },

  photoAlbum: {
    entries: [],
    heading: "",
  },

  programmes: {
    buttonText: "",
    entries: [],
    heading: "",
    subheading: "",
  },

  supporters: {
    entries: [],
    heading: "",
    subheading: "",
  },

  supportUs: {
    donate: {
      buttonText: "",
      description: "",
      image: {
        dbConnections: {
          imageId: null,
        },
        position: {
          x: 50,
          y: 50,
        },
      },
    },
    volunteer: {
      buttonText: "",
      description: "",
      image: {
        dbConnections: {
          imageId: null,
        },
        position: {
          x: 50,
          y: 50,
        },
      },
    },
    heading: "",
  },

  workshops: {
    image: {
      dbConnections: {
        imageId: null,
      },
      position: {
        x: 50,
        y: 50,
      },
    },
    textOverlay: {
      body: "",
      heading: "",
    },
  },
};

/* const footer: MyDb["singles"]["footer"] = {
  livingWageEmployer: {
    text: "",
  },

  message: "",

  orgDescription: "",
};

const header: MyDb["singles"]["header"] = {
  aboutUs: {
    popover: {
      heading: "",
      subheading: "",
    },
  },

  getInvolved: {
    popover: {
      heading: "",
      subheading: "",
    },
  },
};

const linkLabels: MyDb["singles"]["linkLabels"] = {
  aboutUs: "",
  careers: "",
  donate: "",
  getInTouch: "",
  getInvolved: "",
  meetTheTeam: "",
  programmes: "",
  testimonials: "",
  theoryOfChange: "",
  volunteer: "",
  workshops: "",
};

const orgDetails: MyDb["singles"]["orgDetails"] = {
  contact: {
    address: "",
    email: "",
    phoneNumber: "",
  },

  logoImage: {
    dbConnections: {
      imageId: null,
    },
  },

  name: "",

  socialMediaLinks: {
    facebook: "",
    instagram: "",
    linkedIn: "",
  },
}; */

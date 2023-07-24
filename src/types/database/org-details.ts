export type OrgDetails = {
  name: string;
  logoImage: {
    dbConnections: {
      imageId: string | null;
    };
  };
  contact: Contact;
  socialMediaLinks: SocialMediaLinks;
};

type Contact = {
  address: string;
  phoneNumber: string;
  email: string;
};

type SocialMediaLinks = {
  facebook: string;
  instagram: string;
  linkedIn: string;
};

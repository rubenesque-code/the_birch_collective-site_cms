export type OrgDetails = {
  contact: Contact;
  socialMediaLinks: SocialMedia;
};

type Contact = {
  address: string;
  phoneNumber: string;
  email: string;
};

type SocialMedia = {
  facebook: string;
  instagram: string;
  linkedIn: string;
};

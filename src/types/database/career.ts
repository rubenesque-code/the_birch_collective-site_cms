export type Career = {
  id: string;
  index: number;
  title: string;
  closingDate: string;
  description: string;
  docLinksText: string | null;
  docLinkButtons: {
    id: string;
    index: number;
    text: string;
    link: string;
  }[];
};

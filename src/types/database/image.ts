export type Image = {
  id: string;
  aspectRatio: number;
  urls: {
    large: string;
    blur: string;
  };
  storageIds: {
    large: string;
    blur: string;
  };
};

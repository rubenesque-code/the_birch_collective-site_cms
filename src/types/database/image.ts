export type Image = {
  id: string;
  naturalDimensions: {
    width: number;
    height: number;
  };
  urls: {
    large: string;
    blur: string;
  };
  storageIds: {
    large: string;
    blur: string;
  };
};

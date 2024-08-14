type Item = {
  id: string;
  volumeInfo: VolumeInfo;
};

type ImageLinks = {
  smallThumbnail: string;
  thumbnail: string;
};

type IndustriyIdentifier = {
  type: string;
  identifier: string;
};

type VolumeInfo = {
  title: string;
  authors: string[];
  imageLinks: ImageLinks;
  description: string;
  categories: string[];
  pageCount: number;
  industryIdentifiers: IndustriyIdentifier[];
  publisher: string;
  publishedDate: string;
  language: string;
};

export type VolumesResponse = {
  items: [Item];
  totalItems: number;
};

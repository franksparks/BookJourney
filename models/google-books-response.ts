type Item = {
    id: string;
    volumeInfo: VolumeInfo;
  };
  
  type ImageLinks = {
    smallThumbnail: string;
  };

  type IndustriyIdentifier = {
    type: string;
    identifier: number;
  };
  
  type VolumeInfo = {
    title: string;
    authors: string[];
    imageLinks: ImageLinks;
    description: string;
    categories: string[];
    pages: number;
    industryIdentifiers: IndustriyIdentifier[];
    publiser: string;
    publishedDate: Date;
    language: string;
  };
  
  export type VolumesResponse = {
    items: [Item];
    totalItems: number;
  };
type Item = {
    volumeInfo: VolumeInfo;
  };
  
  type ImageLinks = {
    smallThumbnail: string;
  };
  
  type VolumeInfo = {
    title: string;
    authors: string[];
    imageLinks: ImageLinks;
    description: string;
    categories: string[];
    pages: number;
  
  };
  
  export type VolumesResponse = {
    items: [Item];
    totalItems: number;
  };
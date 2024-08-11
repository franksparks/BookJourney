export interface Book {
  title: string;
  authors: string[];
  smallThumbnail?: string;
}

export interface BookCardProps extends Book {
  pages: number;
  genre: string;
  updateAction?: any;
}

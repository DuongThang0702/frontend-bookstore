export interface ImageBook {
  _id: string;
  filename: string;
  path: string;
}

export interface ratings {
  _id: string;
  star: number;
  postedBy: string;
  comment: string;
}

export interface IBook {
  _id: string;
  title: string;
  slug: string;
  price: number;
  sold: number;
  image: ImageBook;
  description: string;
  available: number;
  totalRatings: number;
  ratings: Array<ratings>;
  createdAt: string;
  updatedAt: string;
}

export interface BookProps {
  book: IBook[] | null;
}

export interface ResponseBooks {
  books: IBook[] | null;
  count: number;
  error: number;
}

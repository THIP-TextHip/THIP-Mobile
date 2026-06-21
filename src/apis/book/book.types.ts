export interface BookType {
  title: string;
  imageUrl: string;
  authorName: string;
  publisher: string;
  isbn: string;
}

export interface GetSearchBookRequest {
  keyword: string;
  page: number;
  isFinalized: boolean;
}

export interface GetSearchBookResponse {
  searchResult: BookType[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

export interface GetBookDetailResponse {
  title: string;
  imageUrl: string;
  authorName: string;
  publisher: string;
  isbn: string;
  description: string;
  recruitingRoomCount: number;
  readCount: number;
  isSaved: boolean;
}

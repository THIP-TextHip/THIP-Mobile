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

export interface MostSearchedBook {
  rank: number;
  title: string;
  imageUrl: string;
  isbn: string;
}

export interface GetMostSearchedBookResponse {
  bookList: MostSearchedBook[];
}

export interface ChangeBookSaveStatusRequest {
  isbn: string;
  status: boolean;
}

export interface ChangeBookSaveStatusResponse {
  isbn: string;
  isSaved: boolean;
}

export interface SavedBookType {
  bookId: number;
  bookTitle: string;
  authorName: string;
  publisher: string;
  bookImageUrl: string;
  isbn: string;
  isSaved: boolean;
}

export interface GetSavedBookResponse {
  bookList: SavedBookType[];
  nextCursor: string;
  isLast: boolean;
}

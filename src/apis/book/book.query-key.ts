export const BOOK_QUERY_KEY = {
  SEARCH: (keyword: string, page: number, isFinalized: boolean) => [
    "books",
    "search",
    keyword,
    page,
    isFinalized,
  ],
  DETAIL: (isbn: string) => ["books", isbn],
} as const;

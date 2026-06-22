export const BOOK_QUERY_KEY = {
  ALL: ["books"],
  SEARCH: (keyword: string, page: number, isFinalized: boolean) => [
    "books",
    "search",
    keyword,
    page,
    isFinalized,
  ],
  DETAIL: (isbn: string) => ["books", isbn],
  MOST: ["books", "most-searched"],
  SAVED: ["books", "saved"],
} as const;

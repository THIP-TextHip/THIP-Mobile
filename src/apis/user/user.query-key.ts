export const USER_QUERY_KEY = {
  ALIAS_LIST: ["users", "alias-list"],
  MY_INFO: ["users", "user-info"],
  SEARCH: (keyword: string, isFinalized: boolean, size: number) => [
    "users",
    "search",
    keyword,
    isFinalized,
    size,
  ],
} as const;

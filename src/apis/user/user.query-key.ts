export const USER_QUERY_KEY = {
  ALIAS_LIST: ["users", "alias-list"],
  MY_INFO: ["users", "user-info"],
  MY_ID: ["users", "my-id"],
  SEARCH: (keyword: string, isFinalized: boolean, size: number) => [
    "users",
    "search",
    keyword,
    isFinalized,
    size,
  ],
  FOLLOWERS_ROOT: (userId: number | undefined) => [
    "users",
    "followers",
    userId,
  ],
  FOLLOWERS: (userId: number | undefined, size: number) => [
    "users",
    "followers",
    userId,
    size,
  ],
  MY_FOLLOWINGS_ROOT: ["users", "my-followings"],
  MY_FOLLOWINGS: (size: number) => ["users", "my-followings", size],
  MY_FOLLOWINGS_PREVIEW: ["/users", "my-followings", "preview"],
} as const;

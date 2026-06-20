export const AUTH_URL = {
  LOGIN: "/auth/users",
} as const;

export const USER_URL = {
  DEFAULT: "/users",
  NICKNAME: "/users/nickname",
  ALIAS_LIST: "/users/alias",
  SIGNUP: "/users/signup",
  USER_INFO: "/users/my-page",
} as const;

export const FEED_URL = {
  DEFAULT: "/feeds",
  DETAIL: (feedId: number | string) =>
    `/feeds/${encodeURIComponent(String(feedId))}`,
  TAG_LIST: "/feeds/write-info",
} as const;

export const COMMENT_URL = {
  DEFAULT: (postId: number | string) =>
    `/comments/${encodeURIComponent(String(postId))}`,
} as const;

export const RECENT_SEARCH_URL = {
  DEFAULT: "/recent-searches",
  DELETE: (recentSearchId: number | string) =>
    `/recent-searches/${encodeURIComponent(String(recentSearchId))}`,
};

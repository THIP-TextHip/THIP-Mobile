export const AUTH_URL = {
  LOGIN: "/auth/users",
} as const;

export const USER_URL = {
  DEFAULT: "/users",
  NICKNAME: "/users/nickname",
  ALIAS_LIST: "/users/alias",
  SIGNUP: "/users/signup",
  MY_INFO: "/users/my-page",
  MY_ID: "/users/my-id",
  FOLLOWERS: (userId: number | string) =>
    `/users/${encodeURIComponent(String(userId))}/followers`,
  MY_FOLLOWINGS: "/users/my-followings",
  MY_FOLLOWINGS_PREVIEW: "/users/my-followings/recent-feeds",
  CHANGE_FOLLOWING_STATE: (followingUserId: number | string) =>
    `/users/following/${encodeURIComponent(String(followingUserId))}`,
} as const;

export const FEED_URL = {
  DEFAULT: "/feeds",
  DETAIL: (feedId: number | string) =>
    `/feeds/${encodeURIComponent(String(feedId))}`,
  TAG_LIST: "/feeds/write-info",
  RELATED_BOOK: (isbn: string) =>
    `/feeds/related-books/${encodeURIComponent(isbn)}`,
  USER_PROFILE: (userId: number) =>
    `/feeds/users/${encodeURIComponent(userId)}`,
  USER_PROFILE_TOP_INFO: (userId: number) =>
    `/feeds/users/${encodeURIComponent(userId)}/info`,
  MY_PROFILE: "/feeds/mine",
  MY_PROFILE_TOP_INFO: "/feeds/mine/info",
  SAVED: "/feeds/saved",
  SAVE_STATUS: (feedId: number) => `/feeds/${encodeURIComponent(feedId)}/saved`,
} as const;

export const COMMENT_URL = {
  DEFAULT: (postId: number | string) =>
    `/comments/${encodeURIComponent(String(postId))}`,
} as const;

export const RECENT_SEARCH_URL = {
  DEFAULT: "/recent-searches",
  DELETE: (recentSearchId: number | string) =>
    `/recent-searches/${encodeURIComponent(String(recentSearchId))}`,
} as const;

export const BOOK_URL = {
  DEFAULT: "/books",
  DETAIL: (isbn: string) => `/books/${encodeURIComponent(isbn)}`,
  MOST: "/books/most-searched",
  SAVED: "/books/saved",
  SAVE_STATUS: (isbn: string) => `/books/${encodeURIComponent(isbn)}/saved`,
  RECRUITING: (isbn: string) =>
    `/books/${encodeURIComponent(isbn)}/recruiting-rooms`,
} as const;

export const ROOM_URL = {
  DEFAULT: "/rooms",
  SEARCH: "/rooms/search",
} as const;

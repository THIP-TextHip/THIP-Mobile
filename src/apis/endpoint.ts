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
  DETAIL: (feedId: number | string) => `/feeds/${feedId}`,
} as const;

export const COMMENT_URL = {
  DEFAULT: (postId: number | string) => `/comments/${postId}`,
} as const;

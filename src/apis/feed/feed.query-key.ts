import type { FeedRelatedBookSort } from "./feed.types";

export const FEED_QUERY_KEY = {
  ALL: ["feeds", "all"],
  DETAIL: (feedId?: number | string) => ["feeds", "detail", feedId],
  TAG_LIST: ["feeds", "tag-list"],
  RELATED_BOOK: (isbn?: string, sort: FeedRelatedBookSort = "like") => [
    "feeds",
    "related-book",
    isbn,
    sort,
  ],
  USER_PROFILE: (userId: number) => ["feeds", "user-profile", userId],
  USER_PROFILE_TOP_INFO: (userId: number) => [
    "feeds",
    "user-profile",
    "top-info",
    userId,
  ],
  MY_PROFILE: ["feeds", "user-profile", "mine"],
  MY_PROFILE_TOP_INFO: ["feeds", "user-profile", "mine", "top-info"],
} as const;

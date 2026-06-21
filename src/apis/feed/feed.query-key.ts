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
} as const;

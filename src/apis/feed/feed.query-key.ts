export const FEED_QUERY_KEY = {
  ALL: ["feeds", "all"],
  DETAIL: (feedId?: number | string) => ["feeds", "detail", feedId],
  TAG_LIST: ["feeds", "tag-list"],
} as const;

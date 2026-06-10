export const FEED_QUERY_KEY = {
  ALL: ["feeds", "all"],
  DETAIL: (feedId?: number | string) => ["feeds", "detail", feedId],
} as const;

import { RecentSearchType } from "./recent-search.types";

export const RECENT_SEARCH_QUERY_KEY = {
  LIST: (type: RecentSearchType) => ["recent-search", "list", type],
} as const;

export type RecentSearchType = "USER" | "ROOM" | "BOOK";

export interface RecentSearchContentType {
  recentSearchId: number;
  searchTerm: string;
}

export interface GetRecentSearchResponse {
  recentSearchList: RecentSearchContentType[];
}

import { apiClient } from "../api-client";
import { RECENT_SEARCH_URL } from "../endpoint";
import {
  GetRecentSearchResponse,
  RecentSearchType,
} from "./recent-search.types";

export const getRecentSearchApi = async (type: RecentSearchType) => {
  const response = await apiClient.get<GetRecentSearchResponse>(
    RECENT_SEARCH_URL.DEFAULT,
    { params: { type } },
  );

  return response.data;
};

export const deleteRecentSearchApi = async (recentSearchId: number) => {
  await apiClient.delete<string>(RECENT_SEARCH_URL.DELETE(recentSearchId));
};

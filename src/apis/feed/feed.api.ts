import { apiClient } from "../api-client";
import { FEED_URL } from "../endpoint";
import type {
  GetAllFeedListResponse,
  GetFeedDetailResponse,
} from "./feed.types";

export const getAllFeedListApi = async (cursor?: string | null) => {
  const response = await apiClient.get<GetAllFeedListResponse>(
    FEED_URL.DEFAULT,
    { params: cursor == null ? undefined : { cursor } },
  );

  return response.data;
};

export const getFeedDetailApi = async (feedId: number | string) => {
  const response = await apiClient.get<GetFeedDetailResponse>(
    FEED_URL.DETAIL(feedId),
  );

  return response.data;
};

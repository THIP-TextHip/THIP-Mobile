import { apiClient } from "../api-client";
import { FEED_URL } from "../endpoint";
import { GetAllFeedListResponse } from "./feed.types";

export const getAllFeedListApi = async (cursor?: string | null) => {
  const response = await apiClient.get<GetAllFeedListResponse>(
    FEED_URL.DEFAULT,
    { params: cursor == null ? undefined : { cursor } },
  );

  return response.data;
};

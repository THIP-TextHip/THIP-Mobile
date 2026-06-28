import { apiClient } from "../api-client";
import { FEED_URL } from "../endpoint";
import {
  GetUserProfileTopInfoResponse,
  type GetFeedDetailResponse,
  type GetFeedListResponse,
  type GetFeedRelatedBookRequest,
  type GetFeedRelatedBookResponse,
  type GetFeedTagListResponse,
  type GetFeedUserProfileRequest,
  type GetFeedUserProfileResponse,
} from "./feed.types";

export const getAllFeedListApi = async (cursor?: string | null) => {
  const response = await apiClient.get<GetFeedListResponse>(FEED_URL.DEFAULT, {
    params: cursor == null ? undefined : { cursor },
  });

  return response.data;
};

export const getFeedDetailApi = async (feedId: number | string) => {
  const response = await apiClient.get<GetFeedDetailResponse>(
    FEED_URL.DETAIL(feedId),
  );

  return response.data;
};

export const getFeedTagListApi = async () => {
  const response = await apiClient.get<GetFeedTagListResponse>(
    FEED_URL.TAG_LIST,
  );

  return response.data;
};

export const getFeedRelatedBookApi = async ({
  isbn,
  sort = "like",
  cursor,
}: GetFeedRelatedBookRequest) => {
  const response = await apiClient.get<GetFeedRelatedBookResponse>(
    FEED_URL.RELATED_BOOK(isbn),
    {
      params: cursor == null ? { sort } : { sort, cursor },
    },
  );

  return response.data;
};

export const getFeedUserProfileApi = async ({
  userId,
  cursor,
}: GetFeedUserProfileRequest) => {
  const response = await apiClient.get<GetFeedUserProfileResponse>(
    FEED_URL.USER_PROFILE(userId),
    {
      params: cursor == null ? undefined : { cursor },
    },
  );

  return response.data;
};

export const getUserProfileTopInfoApi = async (userId: number) => {
  const response = await apiClient.get<GetUserProfileTopInfoResponse>(
    FEED_URL.USER_PROFILE_TOP_INFO(userId),
  );

  return response.data;
};

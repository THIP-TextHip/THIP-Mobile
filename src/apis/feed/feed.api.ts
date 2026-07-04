import { apiClient } from "../api-client";
import { FEED_URL } from "../endpoint";
import type {
  ChangeFeedSaveStatusRequest,
  ChangeFeedSaveStatusResponse,
  GetFeedDetailResponse,
  GetFeedListResponse,
  GetFeedRelatedBookRequest,
  GetFeedRelatedBookResponse,
  GetFeedTagListResponse,
  GetFeedUserProfileRequest,
  GetFeedUserProfileResponse,
  GetUserProfileTopInfoResponse,
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

export const getFeedMyProfileApi = async (cursor?: string | null) => {
  const response = await apiClient.get<GetFeedUserProfileResponse>(
    FEED_URL.MY_PROFILE,
    {
      params: cursor == null ? undefined : { cursor },
    },
  );

  return response.data;
};

export const getMyProfileTopInfoApi = async () => {
  const response = await apiClient.get<GetUserProfileTopInfoResponse>(
    FEED_URL.MY_PROFILE_TOP_INFO,
  );

  return response.data;
};

export const getSavedFeedApi = async (cursor?: string | null) => {
  const response = await apiClient.get<GetFeedListResponse>(FEED_URL.SAVED, {
    params: cursor == null ? undefined : { cursor },
  });

  return response.data;
};

export const changeFeedSaveStatusApi = async ({
  feedId,
  type,
}: ChangeFeedSaveStatusRequest) => {
  const response = await apiClient.post<ChangeFeedSaveStatusResponse>(
    FEED_URL.SAVE_STATUS(feedId),
    {
      type,
    },
  );

  return response.data;
};

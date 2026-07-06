import { apiClient } from "../api-client";
import { FEED_URL } from "../endpoint";
import type {
  ChangeFeedLikeStatusResponse,
  ChangeFeedSaveStatusResponse,
  ChangeFeedStatusRequest,
  EditFeedRequest,
  EditFeedResponse,
  GetFeedDetailResponse,
  GetFeedListResponse,
  GetFeedRelatedBookRequest,
  GetFeedRelatedBookResponse,
  GetFeedTagListResponse,
  GetFeedUserProfileRequest,
  GetFeedUserProfileResponse,
  GetUserProfileTopInfoResponse,
  IssuePresignedUrlRequest,
  IssuePresignedUrlResponse,
  WriteFeedRequest,
  WriteFeedResponse,
} from "./feed.types";
import {
  createPresignedImageRequests,
  uploadImageToPresignedUrl,
} from "./feed.utils";

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
    FEED_URL.RELATED_BOOKS(isbn),
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
}: ChangeFeedStatusRequest) => {
  const response = await apiClient.post<ChangeFeedSaveStatusResponse>(
    FEED_URL.SAVE_STATUS(feedId),
    {
      type,
    },
  );

  return response.data;
};

export const changeFeedLikeStatusApi = async ({
  feedId,
  type,
}: ChangeFeedStatusRequest) => {
  const response = await apiClient.post<ChangeFeedLikeStatusResponse>(
    FEED_URL.LIKE_STATUS(feedId),
    {
      type,
    },
  );

  return response.data;
};

export const issuePresignedUrlApi = async (
  images: IssuePresignedUrlRequest,
) => {
  const response = await apiClient.post<IssuePresignedUrlResponse>(
    FEED_URL.PRESIGNED_URL,
    images,
  );

  return response.data;
};

const getFeedImageBlob = async (uri: string) => {
  const response = await fetch(uri);

  if (!response.ok) {
    throw new Error(`Feed image load failed. status: ${response.status}`);
  }

  return response.blob();
};

export const uploadFeedImagesApi = async (imageUris: string[]) => {
  if (imageUris.length === 0) {
    return [];
  }

  const images = await Promise.all(
    imageUris.map(async (uri) => ({
      uri,
      blob: await getFeedImageBlob(uri),
    })),
  );
  const { presignedUrls } = await issuePresignedUrlApi(
    createPresignedImageRequests(images),
  );

  if (presignedUrls.length !== images.length) {
    throw new Error("Issued presigned URL count does not match image count.");
  }

  await Promise.all(
    presignedUrls.map(({ presignedUrl }, index) =>
      uploadImageToPresignedUrl({
        presignedUrl,
        blob: images[index].blob,
      }),
    ),
  );

  return presignedUrls.map(({ fileUrl }) => fileUrl);
};

export const writeFeedApi = async (body: WriteFeedRequest) => {
  const response = await apiClient.post<WriteFeedResponse>(
    FEED_URL.DEFAULT,
    body,
  );

  return response.data;
};

export const deleteFeedApi = async (feedId: number) => {
  const response = await apiClient.delete<string>(FEED_URL.DETAIL(feedId));

  return response.data;
};

export const editFeedApi = async ({ feedId, ...body }: EditFeedRequest) => {
  const response = await apiClient.patch<
    EditFeedResponse,
    Omit<EditFeedRequest, "feedId">
  >(FEED_URL.DETAIL(feedId), body);

  return response.data;
};

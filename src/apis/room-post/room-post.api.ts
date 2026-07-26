import { apiClient } from "../api-client";
import { ROOM_POST_URL } from "../endpoint";
import type {
  ChangeRoomPostLikeStatusRequest,
  ChangeRoomPostLikeStatusResponse,
  CreateRoomRecordRequest,
  CreateRoomRecordResponse,
  CreateRoomVoteRequest,
  CreateRoomVoteResponse,
  EditRoomRecordRequest,
  EditRoomRecordResponse,
  EditRoomVoteRequest,
  EditRoomVoteResponse,
  GetBookInfoForPinRequest,
  GetBookInfoForPinResponse,
  GetRoomBookPageInfoResponse,
  GetRoomPostListResponse,
  GetRoomPostListResquest,
} from "./room-post.types";

export const changeRoomPostLikeStatusApi = async ({
  postId,
  type,
  roomPostType,
}: ChangeRoomPostLikeStatusRequest) => {
  const response = await apiClient.post<ChangeRoomPostLikeStatusResponse>(
    ROOM_POST_URL.LIKE_STATUS(postId),
    {
      type,
      roomPostType,
    },
  );

  return response.data;
};

export const getRoomBookPageInfoApi = async (roomId: number | string) => {
  const response = await apiClient.get<GetRoomBookPageInfoResponse>(
    ROOM_POST_URL.BOOK_PAGE(roomId),
  );

  return response.data;
};

export const getRoomPostListApi = async ({
  roomId,
  type,
  sort,
  pageStart = 0,
  pageEnd,
  isOverview,
  isPageFilter,
  cursor,
}: GetRoomPostListResquest) => {
  const response = await apiClient.get<GetRoomPostListResponse>(
    ROOM_POST_URL.LIST(roomId),
    {
      params:
        cursor == null
          ? { type, sort, pageStart, pageEnd, isOverview, isPageFilter }
          : {
              type,
              sort,
              pageStart,
              pageEnd,
              isOverview,
              isPageFilter,
              cursor,
            },
    },
  );

  return response.data;
};

export const createRoomRecordApi = async ({
  roomId,
  page,
  isOverview,
  content,
}: CreateRoomRecordRequest) => {
  const response = await apiClient.post<CreateRoomRecordResponse>(
    ROOM_POST_URL.CREATE_RECORD(roomId),
    {
      page,
      isOverview,
      content,
    },
  );

  return response.data;
};

export const createRoomVoteApi = async ({
  roomId,
  page,
  isOverview,
  content,
  voteItemList,
}: CreateRoomVoteRequest) => {
  const response = await apiClient.post<CreateRoomVoteResponse>(
    ROOM_POST_URL.CREATE_VOTE(roomId),
    {
      page,
      isOverview,
      content,
      voteItemList,
    },
  );

  return response.data;
};

export const getBookInfoForPinApi = async ({
  roomId,
  recordId,
}: GetBookInfoForPinRequest) => {
  const response = await apiClient.get<GetBookInfoForPinResponse>(
    ROOM_POST_URL.BOOK_INFO_FOR_PIN(roomId, recordId),
  );

  return response.data;
};

export const editRoomRecordApi = async ({
  roomId,
  recordId,
  content,
}: EditRoomRecordRequest) => {
  const response = await apiClient.patch<EditRoomRecordResponse>(
    ROOM_POST_URL.EDIT_RECORD(roomId, recordId),
    {
      content,
    },
  );

  return response.data;
};

export const editRoomVoteApi = async ({
  roomId,
  voteId,
  content,
}: EditRoomVoteRequest) => {
  const response = await apiClient.patch<EditRoomVoteResponse>(
    ROOM_POST_URL.EDIT_VOTE(roomId, voteId),
    {
      content,
    },
  );

  return response.data;
};

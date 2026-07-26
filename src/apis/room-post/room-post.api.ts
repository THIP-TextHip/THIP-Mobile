import { apiClient } from "../api-client";
import { ROOM_POST_URL } from "../endpoint";
import type {
  ChangeRoomPostLikeStatusRequest,
  ChangeRoomPostLikeStatusResponse,
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

import { apiClient } from "../api-client";
import { ROOM_URL } from "../endpoint";
import type {
  ChangeRoomPostLikeStatusRequest,
  ChangeRoomPostLikeStatusResponse,
} from "./room-post.types";

export const changeRoomPostLikeStatusApi = async ({
  postId,
  type,
  roomPostType,
}: ChangeRoomPostLikeStatusRequest) => {
  const response = await apiClient.post<ChangeRoomPostLikeStatusResponse>(
    ROOM_URL.ROOM_POST_LIKE_STATUS(postId),
    {
      type,
      roomPostType,
    },
  );

  return response.data;
};

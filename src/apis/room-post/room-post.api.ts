import { apiClient } from "../api-client";
import { ROOM_POST_URL } from "../endpoint";
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
    ROOM_POST_URL.LIKE_STATUS(postId),
    {
      type,
      roomPostType,
    },
  );

  return response.data;
};

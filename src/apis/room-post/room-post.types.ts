import { type RoomPostType } from "../room";

export interface ChangeRoomPostLikeStatusRequest {
  postId: number;
  type: boolean;
  roomPostType: RoomPostType;
}

export interface ChangeRoomPostLikeStatusResponse {
  postId: number;
  isLiked: boolean;
}

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

export interface GetRoomBookPageInfoResponse {
  totalBookPage: number;
  recentBookPage: number;
  isOverviewPossible: boolean;
  roomId: number;
}

export type RoomPostSortType = "latest" | "like" | "comment";

export interface GetRoomPostListResquest {
  roomId: number | string;
  type: "group" | "mine";
  sort?: RoomPostSortType | null;
  pageStart?: number | null;
  pageEnd?: number | null;
  isOverview?: boolean | null;
  isPageFilter?: boolean | null;
  cursor?: string | null;
}

export interface RoomPostVote {
  voteItemId: number;
  itemName: string;
  count: number;
  isVoted: boolean;
}

export interface RoomPostContent {
  postId: number;
  postDate: string;
  postType: RoomPostType;
  page: number;
  userId: number;
  nickName: string;
  profileImageUrl: string;
  content: string;
  likeCount: number;
  commentCount: number;
  isOverview: boolean;
  isLiked: boolean;
  isWriter: boolean;
  isLocked: boolean;
  voteItems: RoomPostVote[];
}

export interface GetRoomPostListResponse {
  postList: RoomPostContent[];
  roomId: number;
  isbn: string;
  isOverviewEnabled: boolean;
  nextCursor: string;
  isLast: boolean;
}

export interface CreateRoomRecordRequest {
  roomId: number | string;
  page: number;
  isOverview: boolean;
  content: string;
}

export interface CreateRoomRecordResponse {
  recordId: number;
  roomId: number;
}

export interface CreateRoomVoteRequest {
  roomId: number | string;
  page: number;
  isOverview: boolean;
  content: string;
  voteItemList: { itemName: string }[];
}

export interface CreateRoomVoteResponse {
  voteId: number;
  roomId: number;
}

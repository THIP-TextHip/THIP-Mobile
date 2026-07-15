export interface RoomType {
  roomId: number;
  bookImageUrl: string;
  roomName: string;
  recruitCount: number;
  memberCount: number;
  deadlineDate: string;
}

export interface RoomTypeWithIsPublic extends RoomType {
  isPublic: boolean;
}

export interface JoinedRoomType {
  roomId: number;
  bookImageUrl: string;
  roomTitle: string;
  memberCount: number;
  userPercentage: number;
  deadlineDate: string;
}

export type SearchRoomSort = "deadline" | "memberCount";

export type RoomPostType = "VOTE" | "RECORD";

export type RoomCategory = "문학" | "과학·IT" | "사회과학" | "인문학" | "예술";

export type SearchRoomCategory =
  | "전체"
  | "문학"
  | "과학·IT"
  | "사회과학"
  | "인문학"
  | "예술";

export interface GetHomeRecruitingRoomRequest {
  category: RoomCategory;
}

export interface GetHomeRecruitingRoomResponse {
  deadlineRoomList: RoomType[];
  popularRoomList: RoomType[];
  recentRoomList: RoomType[];
}

export interface GetSearchRoomRequest {
  keyword?: string;
  category?: SearchRoomCategory;
  isAllCategory?: boolean;
  sort: SearchRoomSort;
  isFinalized: boolean;
  cursor?: string | null;
}

export interface GetSearchRoomResponse {
  roomList: RoomTypeWithIsPublic[];
  nextCursor: string;
  isLast: boolean;
}

export type SearchRoomQueryParams = Omit<GetSearchRoomRequest, "cursor">;

export type MyRoomType =
  | "playingAndRecruiting"
  | "recruiting"
  | "playing"
  | "expired";

export interface MyRoomListType {
  roomId: number;
  bookImageUrl: string;
  roomName: string;
  recruitCount: number;
  memberCount: number;
  endDate: string;
  type: MyRoomType;
  isPublic: boolean;
}

export interface GetMyRoomListRequest {
  type: MyRoomType;
  cursor?: string | null;
}

export interface GetMyRoomListResponse {
  roomList: MyRoomListType[];
  nextCursor: string;
  isLast: boolean;
}

export interface GetHomeMyRoomResponse {
  roomList: JoinedRoomType[];
  nickname: string;
  nextCursor: string;
  isLast: boolean;
}

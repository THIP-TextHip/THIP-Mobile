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

export interface GetRoomListRequest {
  category: RoomCategory;
}

export interface GetRoomListResponse {
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

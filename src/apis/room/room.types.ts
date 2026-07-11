export interface RoomType {
  roomId: number;
  bookImageUrl: string;
  roomName: string;
  memberCount: number;
  recruitCount: number;
  deadlineDate: string;
  isPublic: boolean;
}

export type SearchRoomSort = "deadline" | "memberCount";

export interface GetSearchRoomRequest {
  keyword?: string;
  category?: string;
  isAllCategory?: boolean;
  sort: SearchRoomSort;
  isFinalized: boolean;
  cursor?: string | null;
}

export interface GetSearchRoomResponse {
  roomList: RoomType[];
  nextCursor: string;
  isLast: boolean;
}

export type SearchRoomQueryParams = Omit<GetSearchRoomRequest, "cursor">;

export type RoomPostType = "VOTE" | "RECORD";

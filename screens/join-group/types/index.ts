export interface JoinGroupResponseType {
  isHost: boolean;
  isJoining: boolean;
  roomId: number;
  roomName: string;
  roomImageUrl: string;
  isPublic: boolean;
  progressStartDate: string;
  progressEndDate: string;
  recruitEndDate: string;
  category: string;
  categoryColor: string;
  roomDescription: string;
  memberCount: number;
  recruitCount: number;
  isbn: string;
  bookImageUrl: string;
  bookTitle: string;
  authorName: string;
  bookDescription: string;
  publisher: string;
  recommendRooms: RecommendRoomType[];
}

export interface RecommendRoomType {
  roomId: number;
  bookImageUrl: string;
  roomName: string;
  memberCount: number;
  recruitCount: number;
  recruitEndDate: string;
}

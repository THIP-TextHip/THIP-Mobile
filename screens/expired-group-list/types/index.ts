// TODO: 서버 제공 api 타입으로 수정. 아마 내 모임방 관련 api로 통합 후 삭제 예정.

export interface ExpiredRoomListType {
  roomId: number;
  bookImageUrl: string;
  roomName: string;
  recruitCount?: number;
  memberCount: number;
  endDate?: string;
  type: "playingAndRecruiting" | "recruiting" | "playing" | "expired";
  isPublic?: boolean;
}

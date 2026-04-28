// TODO: 추후 서버에서 제공하는 타입으로 수정

export interface GroupCarouselItemType {
  roomId: number;
  bookImageUrl: string;
  roomTitle: string;
  memberCount: number;
  userPercentage: number;
  deadlineDate: string;
}

export type RecruitingGroupCarouselType =
  | "deadlineRoomList"
  | "popularRoomList"
  | "recentRoomList";

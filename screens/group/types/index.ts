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

export type RecruitingGroupCategoryType =
  | "문학"
  | "과학·IT"
  | "사회과학"
  | "인문학"
  | "예술";

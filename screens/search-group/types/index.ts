export type SearchGroupCategoryType =
  | "전체"
  | "문학"
  | "과학·IT"
  | "사회과학"
  | "인문학"
  | "예술";

export interface SearchGroupType {
  roomId: number;
  bookImageUrl: string;
  roomName: string;
  memberCount: number;
  recruitCount: number;
  deadlineDate: string;
  isPublic: boolean;
}

import { SearchGroupCategoryType, SearchGroupType } from "../types";

export const RECENT_SEARCH_GROUP = [
  "group1",
  "모임방",
  "예시입니다",
  "어쩌구",
  "ㅁㄴㅇㄹ",
];

export const SEARCH_GROUP_CATEGORY: SearchGroupCategoryType[] = [
  "전체",
  "문학",
  "과학·IT",
  "사회과학",
  "인문학",
  "예술",
];

export const DUMMY_SEARCH_GROUP_LIST: SearchGroupType[] = [
  {
    roomId: 1,
    bookImageUrl: "https://placehold.co/80x107/png",
    roomName: "데미안 천천히 읽는 모임",
    memberCount: 18,
    recruitCount: 30,
    deadlineDate: "3일 뒤",
    isPublic: true,
  },
  {
    roomId: 2,
    bookImageUrl: "https://placehold.co/80x107/png",
    roomName: "불편한 편의점 같이 읽어요. 엄청 긴 제목은 어떻게 될까요?",
    memberCount: 24,
    recruitCount: 30,
    deadlineDate: "2026-04-12",
    isPublic: true,
  },
  {
    roomId: 3,
    bookImageUrl: "https://placehold.co/80x107/png",
    roomName: "아몬드 감상 나누는 북클럽",
    memberCount: 14,
    recruitCount: 20,
    deadlineDate: "5일 뒤",
    isPublic: false,
  },
  {
    roomId: 4,
    bookImageUrl: "https://placehold.co/80x107/png",
    roomName: "호르몬 체인지 완독 도전방",
    memberCount: 22,
    recruitCount: 30,
    deadlineDate: "2026-04-10",
    isPublic: true,
  },
  {
    roomId: 5,
    bookImageUrl: "https://placehold.co/80x107/png",
    roomName: "채식주의자 깊게 읽는 모임",
    memberCount: 9,
    recruitCount: 15,
    deadlineDate: "2026-04-20",
    isPublic: false,
  },
  {
    roomId: 6,
    bookImageUrl: "https://placehold.co/80x107/png",
    roomName: "소년이 온다 함께 읽기",
    memberCount: 27,
    recruitCount: 30,
    deadlineDate: "2026-04-09",
    isPublic: true,
  },
  {
    roomId: 7,
    bookImageUrl: "https://placehold.co/80x107/png",
    roomName: "모순 토론 중심 독서모임",
    memberCount: 11,
    recruitCount: 20,
    deadlineDate: "2026-04-22",
    isPublic: true,
  },
  {
    roomId: 8,
    bookImageUrl: "https://placehold.co/80x107/png",
    roomName: "이방인 한 챕터씩 읽는 방",
    memberCount: 16,
    recruitCount: 25,
    deadlineDate: "2026-04-17",
    isPublic: false,
  },
];

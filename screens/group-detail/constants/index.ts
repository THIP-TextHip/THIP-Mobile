import { Asset } from "expo-asset";

import { GroupBgExample } from "@images/thip";
import { colors } from "@theme/token";

import { GroupDetailResponseType } from "../types";

export const DUMMY_GROUP_DETAIL: GroupDetailResponseType = {
  isHost: false,
  roomId: 3,
  roomName: "시집만 읽는 사람들 3월",
  roomImageUrl: Asset.fromModule(GroupBgExample).uri,
  isPublic: false,
  progressStartDate: "2026.06.16",
  progressEndDate: "2026.06.30",
  category: "문학",
  categoryColor: colors.character.orange,
  roomDescription:
    "‘시집만 읽는 사람들’ 3월 모임입니다. 이번 달 모임방은 심장보다 단단한 토마토 한 알 완독합니다.",
  memberCount: 15,
  recruitCount: 30,
  isbn: "9788936434120",
  bookTitle: "호르몬 체인지",
  authorName: "최정화",
  currentPage: 126,
  userPercentage: 45,
  currentVotes: [
    {
      content: "이번 주차에서 가장 인상 깊었던 장면을 골라주세요.",
      page: 86,
      isOverview: false,
      voteItems: [
        { itemName: "토마토를 바라보는 장면" },
        { itemName: "몸의 변화를 처음 감지하는 장면" },
        { itemName: "인물들이 대화를 나누는 장면" },
        { itemName: "인물들이 대화를 나누는 장면22" },
        { itemName: "인물들이 대화를 나누는 장면333" },
      ],
    },
    {
      content: "다음 모임에서 먼저 이야기하고 싶은 주제는 무엇인가요?",
      page: 126,
      isOverview: true,
      voteItems: [
        { itemName: "인물 관계" },
        { itemName: "작품 속 상징" },
        { itemName: "결말 예상" },
      ],
    },
  ],
};

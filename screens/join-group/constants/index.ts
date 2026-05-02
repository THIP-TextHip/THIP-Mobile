import { Asset } from "expo-asset";

import { GroupBgExample } from "@images/thip";
import { colors } from "@theme/token";

import { JoinGroupResponseType, RecommendRoomType } from "../types";

const recommendRooms: RecommendRoomType[] = [
  {
    roomId: 13,
    bookImageUrl: "https://placehold.co/60x80/png",
    roomName: "일본 소설 조아하는 사람들",
    memberCount: 22,
    recruitCount: 30,
    recruitEndDate: "5일",
  },
  {
    roomId: 15,
    bookImageUrl: "https://placehold.co/60x80/png",
    roomName: "방제목입니다 방 제목입니다.",
    memberCount: 9,
    recruitCount: 15,
    recruitEndDate: "7일",
  },
  {
    roomId: 19,
    bookImageUrl: "https://placehold.co/60x80/png",
    roomName: "짧은 방제목",
    memberCount: 9,
    recruitCount: 15,
    recruitEndDate: "10일",
  },
  {
    roomId: 25,
    bookImageUrl: "https://placehold.co/60x80/png",
    roomName: "방제목입니다 방 제목입니다.",
    memberCount: 3,
    recruitCount: 15,
    recruitEndDate: "13일",
  },
  {
    roomId: 30,
    bookImageUrl: "https://placehold.co/60x80/png",
    roomName: "방제목입니다 방 제목입니다.",
    memberCount: 12,
    recruitCount: 30,
    recruitEndDate: "20일",
  },
];

export const DUMMY_JOIN_GROUP_INFO: JoinGroupResponseType = {
  isHost: false,
  isJoining: false,
  roomId: 3,
  roomName: "시집만 읽는 사람들 3월",
  roomImageUrl: Asset.fromModule(GroupBgExample).uri,
  isPublic: true,
  progressStartDate: "2026.06.16",
  progressEndDate: "2026.06.30",
  recruitEndDate: "3일",
  category: "문학",
  categoryColor: colors.character.orange,
  roomDescription:
    "‘시집만 읽는 사람들’ 3월 모임입니다. 이번 달 모임방은 심장보다 단단한 토마토 한 알 완독합니다.",
  memberCount: 15,
  recruitCount: 30,
  isbn: "9788936434120",
  bookImageUrl: "https://placehold.co/80x107/png",
  bookTitle: "호르몬 체인지",
  authorName: "최정화",
  bookDescription:
    "‘젊고 건강한 몸’을 향한 욕망. 그것을 비대하게 부풀리는 기형적인 시스템. 어리나어리ㅏ넝리ㅏ넝라ㅣ너이라ㅓㄴㅇ라ㅓㄴ이ㅏ런이ㅏ러alsdkfjlasdhflkbasf",
  publisher: "은행나무",
  recommendRooms: recommendRooms,
};

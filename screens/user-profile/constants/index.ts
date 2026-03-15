import { FeedPostBase } from "@shared/ui";
import { colors } from "@theme/token";

export const DUMMY_USER_PROFILE_TOP_VIEW = {
  creatorId: 45,
  profileImageUrl: "https://placehold.co/50/png",
  nickname: "ThipUser01",
  aliasName: "문학가",
  aliasColor: colors.character.orange,
  followerCount: 327,
  totalFeedCount: 3,
  isFollowing: true,
  latestFollowerProfileImageUrls: [
    "https://placehold.co/36/png",
    "https://placehold.co/36/png",
    "https://placehold.co/36/png",
    "https://placehold.co/36/png",
    "https://placehold.co/36/png",
  ],
};

export const DUMMY_USER_PROFILE_FEEDS: FeedPostBase[] = [
  {
    feedId: 1,
    postDate: "30분 전",
    isbn: "1234a",
    bookTitle: "소년이 온다",
    bookAuthor: "한강",
    contentBody: "책이름을 입력해주세요책... 한강한강한강한강...",
    contentUrls: [
      "https://placehold.co/100/png",
      "https://placehold.co/100/png",
      "https://placehold.co/100/png",
    ],
    likeCount: 132,
    commentCount: 4,
    isSaved: false,
    isLiked: true,
    isWriter: false,
  },
  {
    feedId: 2,
    postDate: "2시간 전",
    isbn: "9788936434120",
    bookTitle: "채식주의자",
    bookAuthor: "한강",
    contentBody:
      "짧게 적는 감상. 문장이 너무 날카롭고 아름다워서 몇 번이고 다시 읽게 된다. 짧게 적는 감상. 문장이 너무 날카롭고 아름다워서 몇 번이고 다시 읽게 된다. 짧게 적는 감상. 문장이 너무 날카롭고 아름다워서 몇 번이고 다시 읽게 된다. 짧게 적는 감상. 문장이 너무 날카롭고 아름다워서 몇 번이고 다시 읽게 된다. 짧게 적는 감상. 문장이 너무 날카롭고 아름다워서 몇 번이고 다시 읽게 된다. 짧게 적는 감상. 문장이 너무 날카롭고 아름다워서 몇 번이고 다시 읽게 된다.",
    contentUrls: ["https://placehold.co/100/png"],
    likeCount: 54,
    commentCount: 12,
    isSaved: true,
    isLiked: false,
    isWriter: false,
  },
  {
    feedId: 3,
    postDate: "어제",
    isbn: "9788956609959",
    bookTitle: "이기적 유전자. 대충 되게 긴 제목입니다.",
    bookAuthor: "리처드 도킨스, 리처드 도킨스, 리처드 도킨스",
    contentBody:
      "밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다.",
    contentUrls: [],
    likeCount: 201,
    commentCount: 33,
    isSaved: false,
    isLiked: true,
    isWriter: false,
  },
];

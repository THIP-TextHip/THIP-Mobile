import { FeedPostDetailType } from "@shared/ui";
import { colors } from "@theme/token";

export const DUMMY_FEED_DETAIL: FeedPostDetailType = {
  feedId: 3,
  creatorId: 3,
  creatorNickname: "moon.reader",
  creatorProfileImageUrl: "https://placehold.co/36/png?text=M",
  aliasName: "과학자",
  aliasColor: colors.character.mint,
  postDate: "어제",
  isbn: "9788956609959",
  bookTitle: "이기적 유전자. 대충 되게 긴 제목입니다.",
  bookAuthor: "리처드 도킨스, 리처드 도킨스, 리처드 도킨스",
  contentBody:
    "밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. \n밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다. 밑줄 친 문장 정리 중. '생존'이라는 단어를 다시 생각하게 만드는 챕터였다.",
  contentUrls: [
    "https://placehold.co/200/png",
    "https://placehold.co/200/png",
    "https://placehold.co/200/png",
    "https://placehold.co/200/png",
    "https://placehold.co/200/png",
  ],
  likeCount: 201,
  commentCount: 33,
  isSaved: true,
  isLiked: true,
  isWriter: false,
  tagList: [
    "#태그1",
    "#태그2",
    "#태그3",
    "#기나긴 태그1",
    "#기나긴 태그2",
    "#기나긴 태그3",
  ],
  isPublic: true,
};

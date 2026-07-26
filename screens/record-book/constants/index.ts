import type { CommentReplyType, CommentType } from "@apis/comment";
import { colors } from "@theme/token";

import type { RoomPostSortTypeWithLabel } from "../types";

export const GROUP_RECORD_SORT: RoomPostSortTypeWithLabel[] = [
  {
    label: "최신순",
    type: "latest",
  },
  {
    label: "인기순",
    type: "like",
  },
  {
    label: "댓글 많은순",
    type: "comment",
  },
];

export const DUMMY_RECORD_COMMENT_REPLY_LIST: CommentReplyType[] = [
  {
    commentId: 8,
    parentCommentCreatorNickname: "user1",
    creatorId: 12,
    creatorProfileImageUrl: "https://placehold.co/30/png",
    creatorNickname: "user12",
    aliasName: "칭호칭호",
    aliasColor: colors.character.mint,
    postDate: "12시간 전",
    content: "답글입니다.",
    likeCount: 5,
    isLike: false,
    isWriter: true,
  },
  {
    commentId: 456,
    parentCommentCreatorNickname: "user12",
    creatorId: 123,
    creatorProfileImageUrl: "https://placehold.co/30/png",
    creatorNickname: "user123",
    aliasName: "칭호칭호",
    aliasColor: colors.character.lavender,
    postDate: "8시간 전",
    content:
      "답글입니다. ~~~~~ 긴 댓글? 댓글 내용을 입력하세요. 긴 댓글? 댓글 내용을 입력하세요. 긴 댓글? 댓글 내용을 입력하세요. 긴 댓글? 댓글 내용을 입력하세요. 긴 댓글? 댓글 내용을 입력하세요. 긴 댓글? 댓글 내용을 입력하세요. 긴 댓글? 댓글 내용을 입력하세요.",
    likeCount: 9,
    isLike: false,
    isWriter: false,
  },
];

export const DUMMY_RECORD_COMMENT_LIST: CommentType[] = [
  {
    commentId: 3,
    creatorId: 5,
    creatorProfileImageUrl: "https://placehold.co/30/png",
    creatorNickname: "user1",
    aliasName: "칭호",
    aliasColor: colors.character.pink,
    postDate: "2026.02.12",
    content: `입력하세요. 댓글 내용을 입력하세요오.\n줄바꿈 할게요.\n댓글 내용을 입력하세요. 댓글 내용을 입력하세요. `,
    likeCount: 12,
    isLike: true,
    isDeleted: false,
    isWriter: false,
    replyList: DUMMY_RECORD_COMMENT_REPLY_LIST,
  },
  {
    commentId: 123,
    creatorId: 16,
    creatorProfileImageUrl: "https://placehold.co/30/png",
    creatorNickname: "테스트유저16",
    aliasName: "칭호2",
    aliasColor: colors.character.orange,
    postDate: "5시간 전",
    content: `입력하세요. 댓글 내용을 입력하세요오.\n줄바꿈 할게요.\n댓글 내용을 입력하세요. 댓글 내용을 입력하세요. `,
    likeCount: 135,
    isLike: true,
    isDeleted: false,
    isWriter: false,
    replyList: [],
  },
];

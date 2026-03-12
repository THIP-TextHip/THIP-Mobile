export interface CommentListType {
  commentId: number;
  creatorId: number;
  creatorProfileImageUrl: string;
  creatorNickname: string;
  aliasName: string;
  aliasColor: string;
  postDate: string;
  content: string;
  likeCount: number;
  isLike: boolean;
  isDeleted: boolean;
  isWriter: boolean;
  replyList: CommentReplyListType[];
}

export interface CommentReplyListType {
  commentId: number;
  parentCommentCreatorNickname: string;
  creatorId: number;
  creatorProfileImageUrl: string;
  creatorNickname: string;
  aliasName: string;
  aliasColor: string;
  postDate: string;
  content: string;
  likeCount: number;
  isLike: boolean;
  isWriter: boolean;
}

export type CommentPostType = "FEED" | "RECORD" | "VOTE";

export interface CommentReplyType {
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

export interface CommentType {
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
  replyList: CommentReplyType[];
}

export interface GetCommentListRequest {
  postId: number | string;
  postType: CommentPostType;
  cursor?: string | null;
}

export interface GetCommentListResponse {
  commentList: CommentType[];
  nextCursor: string;
  isLast: boolean;
}

export interface WriteCommentRequest {
  postId: number | string;
  content: string;
  isReplyRequest: boolean;
  parentId: number | null;
  postType: CommentPostType;
}

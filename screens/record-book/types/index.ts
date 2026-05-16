export interface RecordBookResponse {
  postList: RecordBookPostType[];
  roomId: number;
  isbn: string;
  isOverviewEnabled: boolean;
  nextCursor: string;
  isLast: boolean;
}

export interface RecordBookPostType {
  postId: number;
  postDate: string;
  postType: string;
  page: number;
  userId: number;
  nickName: string;
  profileImageUrl: string;
  content: string;
  likeCount: number;
  commentCount: number;
  isOverview: boolean;
  isLiked: boolean;
  isWriter: boolean;
  isLocked: boolean;
  voteItems: RecordBookVoteItemType[];
}

export interface RecordBookVoteItemType {
  voteItemId: number;
  itemName: string;
  count: number;
  isVoted: boolean;
}

export interface FeedType {
  feedId: number;
  creatorId: number;
  creatorNickname: string;
  creatorProfileImageUrl: string;
  aliasName: string;
  aliasColor: string;
  postDate: string;
  isbn: string;
  bookTitle: string;
  bookAuthor: string;
  contentBody: string;
  contentUrls: string[];
  likeCount: number;
  commentCount: number;
  isSaved: boolean;
  isLiked: boolean;
  isWriter: boolean;
}

export interface FeedUserProfileType {
  feedId: number;
  postDate: string;
  isbn: string;
  bookTitle: string;
  bookAuthor: string;
  contentBody: string;
  contentUrls: string[];
  likeCount: number;
  commentCount: number;
  isPublic: boolean;
  isSaved: boolean;
  isLiked: boolean;
  isWriter: boolean;
}

export interface GetFeedListResponse {
  feedList: FeedType[];
  nextCursor: string;
  isLast: boolean;
}

export type GetFeedDetailResponse = FeedType & {
  bookImageUrl: string;
  tagList: string[];
  isPublic: boolean;
};

export interface CategoryListType {
  category: string;
  tagList: string[];
}

export interface GetFeedTagListResponse {
  categoryList: CategoryListType[];
}

export type FeedRelatedBookSort = "like" | "latest";

export interface GetFeedRelatedBookRequest {
  isbn: string;
  sort?: FeedRelatedBookSort;
  cursor?: string | null;
}

export interface GetFeedRelatedBookResponse {
  feeds: FeedType[];
  nextCursor: string;
  isLast: boolean;
}

export interface GetFeedUserProfileRequest {
  userId: number;
  cursor?: string | null;
}

export interface GetFeedUserProfileResponse {
  feedList: FeedUserProfileType[];
  nextCursor: string;
  isLast: boolean;
}

export interface GetUserProfileTopInfoResponse {
  creatorId: number;
  profileImageUrl: string;
  nickname: string;
  aliasName: string;
  aliasColor: string;
  followerCount: number;
  totalFeedCount: number;
  isFollowing: boolean;
  latestFollowerProfileImageUrls: string[];
}

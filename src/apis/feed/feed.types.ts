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

export interface ChangeFeedStatusRequest {
  feedId: number;
  type: boolean;
}

export interface ChangeFeedSaveStatusResponse {
  feedId: number;
  isSaved: boolean;
}

export interface ChangeFeedLikeStatusResponse {
  feedId: number;
  isLiked: boolean;
}

export type IssuePresignedUrlRequest = {
  extension: string;
  size: number;
}[];

export interface IssuePresignedUrlResponse {
  presignedUrls: {
    presignedUrl: string;
    fileUrl: string;
  }[];
}

export interface WriteFeedRequest {
  isbn: string;
  contentBody: string;
  isPublic: boolean;
  tagList: string[];
  imageUrls: string[];
}

export interface WriteFeedMutationRequest extends Omit<
  WriteFeedRequest,
  "imageUrls"
> {
  imageUris: string[];
}

export interface WriteFeedResponse {
  feedId: number;
}

export interface EditFeedRequest {
  feedId: number;
  contentBody: string;
  isPublic: boolean;
  tagList: string[];
  remainImageUrls: string[];
}

export interface EditFeedResponse {
  feedId: number;
}

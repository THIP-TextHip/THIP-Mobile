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

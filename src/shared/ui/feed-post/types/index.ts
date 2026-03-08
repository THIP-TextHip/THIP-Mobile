// TODO: 추후 타입들은 서버 api 연동 시 다른 곳에 위치 예정
export interface FeedPostBase {
  feedId: number;
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

export interface FeedPostPreviewType extends FeedPostBase {
  creatorId: number;
  creatorNickname: string;
  creatorProfileImageUrl: string;
  aliasName: string;
  aliasColor: string;
}

export interface FeedMyPostPreviewType extends FeedPostBase {
  isPublic: boolean;
}

export interface FeedPostDetailType extends FeedPostBase {
  creatorId: number;
  creatorNickname: string;
  creatorProfileImageUrl: string;
  aliasName: string;
  aliasColor: string;
  tagList: string[];
  isPublic: boolean;
}

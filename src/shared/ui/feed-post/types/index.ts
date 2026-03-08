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
  isWriter: true;
}

export interface FeedPostPreviewType {
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

export interface FeedMyPostPreviewType {
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
  isWriter: true;
}

export interface CheckNicknameRequest {
  nickname: string;
}

export interface CheckNicknameResponse {
  isVerified: boolean;
}

export interface AliasChoiceType {
  aliasName: string;
  categoryName: string;
  imageUrl: string;
  aliasColor: string;
}

export interface GetAliasListResponse {
  aliasChoices: AliasChoiceType[];
}

export interface SignupRequest {
  aliasName: string;
  nickname: string;
}

export interface SignupResponse {
  userId: number;
  accessToken: string;
}

export interface GetUserInfoResponse {
  profileImageUrl: string;
  nickname: string;
  aliasName: string;
  aliasColor: string;
}

export interface EditUserProfileRequest {
  aliasName?: string;
  nickname?: string;
}

export interface UserType {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  aliasName: string;
  aliasColor: string;
  followerCount: number;
}

export interface GetSearchUserRequest {
  keyword: string;
  isFinalized: boolean;
  size?: number;
}

export interface GetSearchUserResponse {
  userList: UserType[];
}

export interface GetUserFollowersRequest {
  userId: number;
  cursor?: string | null;
  size?: number;
}

export interface FollowerType {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  aliasName: string;
  aliasColor: string;
  followerCount: number;
  isMyself: boolean;
}

export interface GetUserFollowersResponse {
  followers: FollowerType[];
  totalFollowerCount: number;
  nextCursor: string;
  isLast: boolean;
}

export interface FollowingType {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  aliasName: string;
  aliasColor: string;
  isFollowing: boolean;
}

export interface GetMyFollowingsResquest {
  cursor?: string | null;
  size?: number;
}

export interface GetMyFollowingsResponse {
  followings: FollowingType[];
  totalFollowingCount: number;
  nextCursor: string;
  isLast: boolean;
}

export interface GetMyFollowingsPreviewResponse {
  myFollowingUsers: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
  }[];
}

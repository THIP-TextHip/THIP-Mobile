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

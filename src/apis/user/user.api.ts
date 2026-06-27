import { apiClient } from "@apis/api-client";
import { USER_URL } from "@apis/endpoint";

import type {
  CheckNicknameRequest,
  CheckNicknameResponse,
  EditUserProfileRequest,
  GetAliasListResponse,
  GetMyFollowingsResponse,
  GetMyFollowingsResquest,
  GetSearchUserRequest,
  GetSearchUserResponse,
  GetUserFollowersRequest,
  GetUserFollowersResponse,
  GetUserInfoResponse,
  SignupRequest,
  SignupResponse,
} from "./user.types";

export const checkNicknameApi = async (body: CheckNicknameRequest) => {
  const response = await apiClient.post<
    CheckNicknameResponse,
    CheckNicknameRequest
  >(USER_URL.NICKNAME, body);

  return response.data;
};

export const getAliasListApi = async () => {
  const response = await apiClient.get<GetAliasListResponse>(
    USER_URL.ALIAS_LIST,
  );

  return response.data;
};

export const signupApi = async (body: SignupRequest) => {
  const response = await apiClient.post<SignupResponse, SignupRequest>(
    USER_URL.SIGNUP,
    body,
  );

  return response.data;
};

export const getMyInfoApi = async () => {
  const response = await apiClient.get<GetUserInfoResponse>(USER_URL.MY_INFO);

  return response.data;
};

export const getMyIdApi = async () => {
  const response = await apiClient.get<number>(USER_URL.MY_ID);

  return response.data;
};

export const deleteUserAccountApi = async () => {
  await apiClient.delete<string>(USER_URL.DEFAULT);
};

export const editUserProfileApi = async (body: EditUserProfileRequest) => {
  await apiClient.patch<string, EditUserProfileRequest>(USER_URL.DEFAULT, body);
};

export const getSearchUserApi = async (params: GetSearchUserRequest) => {
  const response = await apiClient.get<GetSearchUserResponse>(
    USER_URL.DEFAULT,
    {
      params,
    },
  );

  return response.data;
};

export const getUserFollowersApi = async ({
  userId,
  cursor,
  size,
}: GetUserFollowersRequest) => {
  const response = await apiClient.get<GetUserFollowersResponse>(
    USER_URL.FOLLOWERS(userId),
    {
      params: {
        ...(cursor == null ? {} : { cursor }),
        ...(size == null ? {} : { size }),
      },
    },
  );

  return response.data;
};

export const getMyFollowingsApi = async ({
  cursor,
  size,
}: GetMyFollowingsResquest) => {
  const response = await apiClient.get<GetMyFollowingsResponse>(
    USER_URL.MY_FOLLOWINGS,
    {
      params: {
        ...(cursor == null ? {} : { cursor }),
        ...(size == null ? {} : { size }),
      },
    },
  );

  return response.data;
};

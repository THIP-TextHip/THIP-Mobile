import { apiClient } from "@apis/api-client";
import { USER_URL } from "@apis/endpoint";

import type {
  CheckNicknameRequest,
  CheckNicknameResponse,
  EditUserProfileRequest,
  GetAliasListResponse,
  GetSearchUserRequest,
  GetSearchUserResponse,
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
  const response = await apiClient.get<GetUserInfoResponse>(USER_URL.USER_INFO);

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

export const getUserFollowerApi = async () => {};

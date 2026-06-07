import { apiClient } from "@apis/api-client";
import { USER_URL } from "@apis/endpoint";

import type {
  CheckNicknameRequest,
  CheckNicknameResponse,
  GetAliasListResponse,
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

export const getUserInfoApi = async () => {
  const response = await apiClient.get<GetUserInfoResponse>(USER_URL.USER_INFO);

  return response.data;
};

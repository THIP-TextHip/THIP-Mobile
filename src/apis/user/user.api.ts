import { apiClient } from "@apis/api-client";
import { USER_URL } from "@apis/endpoint";

import type { CheckNicknameRequest, CheckNicknameResponse } from "./user.types";

export const checkNicknameApi = async (body: CheckNicknameRequest) => {
  const response = await apiClient.post<
    CheckNicknameResponse,
    CheckNicknameRequest
  >(USER_URL.NICKNAME, body);

  return response.data;
};

export const getAliasListApi = async () => {};

export const signupApi = async () => {};

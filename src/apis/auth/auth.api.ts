import { apiClient } from "@apis/api-client";
import { AUTH_URL } from "@apis/endpoint";

import type { LoginRequest, LoginResponse } from "./auth.types";

export const loginApi = async (body: LoginRequest) => {
  const response = await apiClient.post<LoginResponse, LoginRequest>(
    AUTH_URL.LOGIN,
    body,
    { skipAuth: true },
  );

  return response.data;
};

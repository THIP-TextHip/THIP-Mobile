import { router } from "expo-router";

import { deleteAuthToken } from "./token-storage";

type AuthErrorCandidate = {
  code?: number;
  status?: number;
};

export class AuthRequiredError extends Error {
  constructor() {
    super("Authentication token is required.");
    this.name = "AuthRequiredError";
  }
}

export const AUTH_ERROR_CODES = [40100, 40101];
export const AUTH_ERROR_HTTP_STATUSES = [401];

let isRedirectingToLogin = false;

export const isAuthError = ({ code, status }: AuthErrorCandidate) => {
  const hasAuthErrorCode =
    typeof code === "number" && AUTH_ERROR_CODES.includes(code);
  const hasAuthErrorStatus =
    typeof status === "number" && AUTH_ERROR_HTTP_STATUSES.includes(status);

  return hasAuthErrorCode || hasAuthErrorStatus;
};

export const clearAuthAndRedirectToLogin = async () => {
  try {
    await deleteAuthToken();
  } catch (error) {
    console.error("[auth] token delete failed", error);
  }

  if (isRedirectingToLogin) {
    return;
  }

  isRedirectingToLogin = true;
  router.replace("/login");

  setTimeout(() => {
    isRedirectingToLogin = false;
  }, 1000);
};

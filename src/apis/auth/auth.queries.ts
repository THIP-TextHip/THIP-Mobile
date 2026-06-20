import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import { clearAuthAndRedirectToLogin } from "../auth-guard";
import { setAuthToken } from "../token-storage";
import { loginApi } from "./auth.api";
import type { LoginRequest, LoginResponse } from "./auth.types";

export const useLoginMutation = () => {
  const { mutate: login, isPending: isPendingLogin } = useMutation<
    LoginResponse,
    Error,
    LoginRequest
  >({
    mutationFn: loginApi,
    onSuccess: async (data: LoginResponse) => {
      await setAuthToken(data.token);

      if (data.isNewUser) {
        router.replace("/sign-up");
        return;
      }
      router.replace({
        pathname: "/",
      });
    },
    onError: (error) => {
      console.error("[useLoginMutation] login failed", error);
      Toast.show({
        type: "error",
        text1: "로그인에 실패했어요. 잠시 후 다시 시도해주세요.",
      });
    },
  });

  return {
    login,
    isPendingLogin, // TODO: 추후 로딩 애니메이션 보여주기
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = async () => {
    await clearAuthAndRedirectToLogin();
    queryClient.clear();
  };

  return { logout };
};

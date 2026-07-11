import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import { clearAuthAndRedirectToLogin } from "../auth-guard";
import {
  useDeleteNotificationToken,
  useRegisterNotificationToken,
} from "../notification";
import {
  getSavedNotificationDeviceId,
  tryRegisterCurrentDeviceNotificationToken,
} from "../notification-token";
import { setAuthToken } from "../token-storage";
import { loginApi } from "./auth.api";
import type { LoginRequest, LoginResponse } from "./auth.types";

export const useLoginMutation = () => {
  const { registerNotificationTokenAsync } = useRegisterNotificationToken();

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

      // fire-and-forget: 등록 실패해도 로그인 플로우에 영향 없음
      tryRegisterCurrentDeviceNotificationToken(registerNotificationTokenAsync);

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
  const { deleteNotificationTokenAsync } = useDeleteNotificationToken();

  const logout = async () => {
    const deviceId = await getSavedNotificationDeviceId();

    if (deviceId) {
      try {
        await deleteNotificationTokenAsync();
      } catch (error) {
        console.error("[useLogout] notification token delete failed", error);
      }
    }

    queryClient.clear();
    await clearAuthAndRedirectToLogin();
  };

  return { logout };
};

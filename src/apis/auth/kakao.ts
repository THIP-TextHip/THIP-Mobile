import { initializeKakaoSDK } from "@react-native-kakao/core";

const kakaoNativeAppKey = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY;

let initializePromise: Promise<void> | null = null;

export const initializeKakao = () => {
  if (!kakaoNativeAppKey) {
    throw new Error("EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY is not defined.");
  }

  initializePromise ??= initializeKakaoSDK(kakaoNativeAppKey).catch((error) => {
    initializePromise = null;
    throw error;
  });

  return initializePromise;
};

import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { Pressable, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { useLoginMutation } from "@apis/auth";
import { IcGoogle } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import LoginLoading from "../login-loading";

export default function GoogleLoginButton() {
  const { login, isPendingLogin } = useLoginMutation();

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      });

      const response = await GoogleSignin.signIn();

      if (!isSuccessResponse(response)) {
        return;
      }

      login({ oauth2Id: `google_${response.data.user.id}` });
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ERR_REQUEST_CANCELED"
      )
        return;
      Toast.show({
        type: "error",
        text1: "구글 로그인에 실패했어요.",
      });
    }
  };

  if (isPendingLogin) {
    return <LoginLoading />;
  }

  return (
    <Pressable
      style={styles.loginButtonContainer}
      onPress={handleLogin}
      disabled={isPendingLogin}
    >
      <IcGoogle />
      <AppText weight="semibold" size="base" color={colors.black.main}>
        구글계정 로그인
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loginButtonContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 10,
    width: "100%",
    borderRadius: 12,
  },
});

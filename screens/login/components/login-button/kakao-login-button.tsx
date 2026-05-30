import {
  me as getKakaoUser,
  login as kakaoLogin,
} from "@react-native-kakao/user";
import { Pressable, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { initializeKakao, useLoginMutation } from "@apis/auth";
import { IcKakaotalk } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function KakaoLoginButton() {
  const { login, isPendingLogin } = useLoginMutation();

  const handleLogin = async () => {
    try {
      await initializeKakao();
      await kakaoLogin();
      const kakaoUser = await getKakaoUser();

      login({ oauth2Id: `kakao_${kakaoUser.id}` });
    } catch (error) {
      console.error("[KakaoLoginButton] Kakao login failed", error);

      Toast.show({
        type: "error",
        text1: "카카오 로그인에 실패했어요.",
      });
    }
  };

  return (
    <Pressable
      style={styles.loginButtonContainer}
      onPress={handleLogin}
      disabled={isPendingLogin}
    >
      <IcKakaotalk />
      <AppText weight="semibold" size="base" color={colors.black.main}>
        카카오계정 로그인
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loginButtonContainer: {
    backgroundColor: colors.kakaoyellow,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 10,
    width: "100%",
    borderRadius: 12,
  },
});

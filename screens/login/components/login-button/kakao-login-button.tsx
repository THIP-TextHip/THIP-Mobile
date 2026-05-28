import { Pressable, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { useLoginMutation } from "@apis/auth";
import { IcKakaotalk } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function KakaoLoginButton() {
  const { login, isPendingLogin } = useLoginMutation();

  const handleLogin = () => {
    const oauth2Id = process.env.EXPO_PUBLIC_DEV_KAKAO_OAUTH2_ID;

    if (!oauth2Id) {
      Toast.show({
        type: "error",
        text1: "카카오 로그인 SDK 연동 후 다시 시도해주세요.",
      });
      return;
    }

    login({ oauth2Id });
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

import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { IcGoogle } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function GoogleLoginButton() {
  const handleLogin = () => {
    // TODO: 구글 소셜 로그인
    router.push("/sign-up");
  };
  return (
    <Pressable style={styles.loginButtonContainer} onPress={handleLogin}>
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

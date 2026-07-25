import * as AppleAuthentication from "expo-apple-authentication";
import { StyleSheet } from "react-native";

import { useAppleLoginMutation } from "@apis/auth";

export default function AppleLoginButton() {
  const { appleLogin, isPendingAppleLogin } = useAppleLoginMutation();
  const handleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken || !credential.authorizationCode) {
        throw new Error("Apple 인증 정보를 받지 못했습니다.");
      }

      appleLogin({
        identityToken: credential.identityToken,
        authorizationCode: credential.authorizationCode,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ERR_REQUEST_CANCELED"
      ) {
        return;
      }

      console.error("[AppleLoginButton] Apple login failed", error);
    }
  };

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
      cornerRadius={12}
      style={styles.loginButtonContainer}
      onPress={handleLogin}
      aria-disabled={isPendingAppleLogin}
    />
  );
}

const styles = StyleSheet.create({
  loginButtonContainer: {
    width: "100%",
    height: 44,
  },
});

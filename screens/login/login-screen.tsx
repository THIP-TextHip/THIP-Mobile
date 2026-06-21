import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";

import { ThipSplash } from "@images/thip";

import { GoogleLoginButton, KakaoLoginButton } from "./components";

export default function LoginScreen() {
  const hasClearedRef = useRef(false);
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();

  const splashWidth = width * 0.64;
  const splashHeight = splashWidth * 0.43;

  useEffect(() => {
    if (!hasClearedRef.current) {
      queryClient.clear();
      hasClearedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.pageContainer}>
      <Image
        source={ThipSplash}
        style={{ width: splashWidth, height: splashHeight }}
      />
      <View style={styles.loginButtonWrapper}>
        <KakaoLoginButton />
        <GoogleLoginButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 140,
    width: "100%",
    paddingTop: 100,
  },
  loginButtonWrapper: {
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 20,
    width: "100%",
    maxWidth: 600,
  },
});

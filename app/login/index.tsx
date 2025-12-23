import { Dimensions, Image, StyleSheet, View } from "react-native";

import { ThipSplash } from "@images/thip";
import {
  GoogleLoginButton,
  KakaoLoginButton,
} from "./_components/login-button";

// 디바이스 너비에 따라 스플래쉬 이미지 크기 계산
const deviceWidth = Dimensions.get("window").width;
const splashWidth = deviceWidth * 0.64;
const splashHeight = splashWidth * 0.43;

export default function Login() {
  return (
    <View style={styles.pageContainer}>
      <Image source={ThipSplash} style={styles.splash} />
      <View style={styles.loginButtonWrapper}>
        <KakaoLoginButton />
        <GoogleLoginButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    position: "relative",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 140,
    width: "100%",
    paddingTop: 100,
  },
  splash: {
    width: splashWidth,
    height: splashHeight,
  },
  loginButtonWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 20,
    width: "100%",
    maxWidth: 600,
  },
});

import type { ConfigContext, ExpoConfig } from "expo/config";

const appJson = require("./app.json");

const kakaoNativeAppKey = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY;

const plugins: ExpoConfig["plugins"] = [
  "expo-router",
  [
    "expo-splash-screen",
    {
      image: "./assets/images/splash-icon.png",
      imageWidth: 200,
      resizeMode: "contain",
      backgroundColor: "#ffffff",
      dark: {
        backgroundColor: "#000000",
      },
    },
  ],
  "expo-font",
  "expo-secure-store",
  [
    "expo-build-properties",
    {
      android: {
        extraMavenRepos: [
          "https://devrepo.kakao.com/nexus/content/groups/public/",
        ],
      },
    },
  ],
  "@react-native-google-signin/google-signin",
];

if (kakaoNativeAppKey) {
  plugins.push([
    "@react-native-kakao/core",
    {
      nativeAppKey: kakaoNativeAppKey,
      android: {
        authCodeHandlerActivity: true,
      },
    },
  ]);
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...appJson.expo,
  ...config,
  // ios는 추후 애플 개발자 계정 생성 이후 구현
  ios: {
    ...appJson.expo.ios,
    ...config.ios,
    bundleIdentifier: "com.texthip.thip",
  },
  android: {
    ...appJson.expo.android,
    ...config.android,
    package: "com.texthip.thip",
  },
  plugins,
});

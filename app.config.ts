import type { ConfigContext, ExpoConfig } from "expo/config";

const appJson = require("./app.json");

const kakaoNativeAppKey = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY;
const googleServicesFile =
  process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json";

const googleServiceInfoPlist =
  process.env.GOOGLE_SERVICES_INFO_PLIST ?? "./GoogleService-Info.plist";

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
    "expo-image-picker",
    {
      photosPermission: "첨부할 사진을 선택하기 위해 사진 보관함에 접근합니다.",
      cameraPermission: false,
      microphonePermission: false,
    },
  ],
  [
    "expo-notifications",
    {
      defaultChannel: "default",
    },
  ],
  [
    "expo-build-properties",
    {
      android: {
        extraMavenRepos: [
          "https://devrepo.kakao.com/nexus/content/groups/public/",
        ],
      },
      ios: {
        extraPods: [
          {
            name: "GoogleUtilities",
            modular_headers: true,
          },
          {
            name: "RecaptchaInterop",
            modular_headers: true,
          },
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
      ios: {
        handleKakaoOpenUrl: true,
        naviApplicationQuerySchemes: false,
      },
    },
  ]);
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...appJson.expo,
  ...config,
  ios: {
    ...appJson.expo.ios,
    ...config.ios,
    bundleIdentifier: "com.texthip.thip",
    googleServicesFile: googleServiceInfoPlist,
  },
  android: {
    ...appJson.expo.android,
    ...config.android,
    package: "com.texthip.thip",
    googleServicesFile,
  },
  plugins,
});

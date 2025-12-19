import { colors } from "@theme/token";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Pretendard_400: require("../assets/fonts/Pretendard-Regular.otf"),
    Pretendard_500: require("../assets/fonts/Pretendard-Medium.otf"),
    Pretendard_600: require("../assets/fonts/Pretendard-SemiBold.otf"),
    Pretendard_700: require("../assets/fonts/Pretendard-Bold.otf"),
    Pretendard_800: require("../assets/fonts/Pretendard-ExtraBold.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black.main }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}

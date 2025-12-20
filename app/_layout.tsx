import { useLoadFonts } from "@/src/shared/hooks/use-load-fonts";
import { colors } from "@theme/token";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useLoadFonts();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black.main }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="alarm" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}

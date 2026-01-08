import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLoadFonts } from "@shared/hooks/use-load-fonts";
import { colors } from "@theme/token";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useLoadFonts();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black.main }}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="alarm" options={{ headerShown: false }} />
        <Stack.Screen name="book-request" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}

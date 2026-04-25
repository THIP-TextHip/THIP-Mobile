import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { toastConfig } from "@config/toast.config";
import { useLoadFonts } from "@shared/hooks";
import { colors } from "@theme/token";

SplashScreen.preventAutoHideAsync();

// TODO: 추후 tabs 밖의 페이지들도 카테고리별로 묶기 / screens 폴더 내부도 카테고리별 묶기 필요

export default function RootLayout() {
  useLoadFonts();
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: colors.black.main }}
          edges={["top", "left", "right"]}
        >
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
            <Stack.Screen
              name="book-request"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="my-thip-list"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="feed-detail" options={{ headerShown: false }} />
            <Stack.Screen
              name="search-group"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="expired-group-list"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="user-profile"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="thip-list" options={{ headerShown: false }} />
            <Stack.Screen name="book-detail" options={{ headerShown: false }} />
            <Stack.Screen name="search-user" options={{ headerShown: false }} />
            <Stack.Screen name="feed-write" options={{ headerShown: false }} />
            <Stack.Screen name="saved" options={{ headerShown: false }} />
            <Stack.Screen
              name="delete-account"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="delete-account-complete"
              options={{ headerShown: false, gestureEnabled: false }}
            />
          </Stack>
          <Toast
            config={toastConfig}
            position="top"
            topOffset={insets.top + 16}
          />
          {/* <Toast position="top" topOffset={60} /> */}
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

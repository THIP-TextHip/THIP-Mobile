import { Stack } from "expo-router";

import { colors } from "@theme/token";

export default function SignUpLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen name="nickname" options={{ headerShown: false }} />
      <Stack.Screen name="genre" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
    </Stack>
  );
}

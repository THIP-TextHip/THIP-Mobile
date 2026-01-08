import { Stack } from "expo-router";

import { colors } from "@theme/token";

export default function UserLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
      <Stack.Screen name="alarm-settings" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Stack } from "expo-router";

import { colors } from "@theme/token";

export default function UserProfileLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
        headerShown: false,
      }}
    >
      <Stack.Screen name="[userId]" />
    </Stack>
  );
}

import { Stack } from "expo-router";

import { colors } from "@theme/token";

export default function JoinGroupLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
        headerShown: false,
      }}
    >
      <Stack.Screen name="[roomId]" />
    </Stack>
  );
}
